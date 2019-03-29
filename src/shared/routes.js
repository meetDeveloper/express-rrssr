import Home from './Home'
import Grid from './Grid'
import NoMatch from './NoMatch'
import { fetchPopularRepos } from '../shared/api'

const routes =  [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/popular/:id',
    component: Grid,
    fetchInitialData: (path = '') => fetchPopularRepos(
      path.split('/').pop()
    )
  }
]

export default routes