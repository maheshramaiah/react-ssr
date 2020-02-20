import express from 'express';
import React from 'react';
import ReactDom from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import serialize from 'serialize-javascript';
import App from './client/App';
import { routes } from './routes'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

function findRoute(path, routes) {
  for (const route of routes) {
    const match = matchPath(path, {
      ...route,
      exact: true
    });

    if (!match && route.routes) {
      return findRoute(path, route.routes);
    }

    if (match) {
      return route;
    }
  }
}

app.get('*', async (req, res) => {
  const route = findRoute(req.path, routes);
  let data = {};

  if (route && route.fetchData) {
    data = await route.fetchData(req);
  }

  const content = ReactDom.renderToString(
    <StaticRouter location={req.path} context={{ data }}>
      <App />
    </StaticRouter>
  );
  const html = `
    <!DOCTYPE html>  
    <html>
			<body>
        <div id='root'>${content}</div>
        <script>window.INITIAL_DATA=${serialize(data)}</script>
        <script src="/bundle.js" defer></script>
        <link rel="stylesheet" type="text/css" href="/main.css">
			</body>
		</html>
	`;

  res.send(html);
});

async function start() {
  try {
    await app.listen(PORT);
    console.log(`Server listening on port ${PORT}`);
  }
  catch (err) {
    console.log(`Error connecting to server : ${err}`);
  }
}

start();