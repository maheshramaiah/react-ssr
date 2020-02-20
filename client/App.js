import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { routes } from '../routes';

function App() {
  let data = null;

  return (
    <div>
      <Switch>
        {
          routes.map(({ exact, path, component: Component, redirect, routes, ...rest }) => {
            return (
              <Route
                key={path}
                exact={exact}
                path={path}
                render={(props) => {
                  if (redirect) {
                    return <Redirect to={{ path: redirect }} />
                  }

                  if (isBrowser) {
                    data = window.INITIAL_DATA;
                    delete window.INITIAL_DATA;
                  }
                  else {
                    data = props.staticContext.data;
                  }

                  return <Component {...props} {...rest} data={data} routes={routes} />
                }}
              >
              </Route>
            )
          })
        }
      </Switch>
    </div>
  );
}

export default App;