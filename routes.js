import Dashboard from './client/pages/Dashboard';
import Repos from './client/pages/Repos';
import { getRepos } from './api/repo';

export const routes = [
  {
    path: '/',
    exact: true,
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    strict: true,
    component: Dashboard,
    routes: [
      {
        path: '/dashboard/:language',
        component: Repos,
        async fetchData(req) {
          const language = req.path.split('/').pop();
          const data = await getRepos(language);

          return {
            language,
            data
          };
        }
      }
    ]
  }
];