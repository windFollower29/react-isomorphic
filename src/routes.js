import loadable from '@loadable/component'

// import Index from './pages/Index'
// import Home from './pages/Home'
// import About from './pages/About'
// import NotFound from './pages/NotFound'

const Index = loadable(() => import("./pages/Index"))
const Home = loadable(() => import("./pages/Home"))
const About = loadable(() => import("./pages/About"))
const NotFound = loadable(() => import("./pages/NotFound"))

export default [
  {
    path: '/index',
    // component: () => import('App'),
    component: Index,
    // loadData: Index.loadData,
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/',
    component: Index
  },
  {
    path: '*',
    component: NotFound
  }
]