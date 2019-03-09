/**
 * loadable的异步组件加载前无法获取引用，因而asyncData无法定义在组件的static方法中
 * 服务端preload的数据如果跨路由相关，请求操作应放在最下层路由
 */

import loadable from '@loadable/component'

// import Index from './pages/Index'
// import Home from './pages/Home'
// import About from './pages/About'
// import NotFound from './pages/NotFound'

const Root = loadable((props) => import('./pages/Root'))
const Index = loadable(() => import("./pages/Index"))
const Home = loadable(() => import("./pages/Home"))
const About = loadable(() => import("./pages/About"))
const WeatherPage = loadable(() => import("./pages/weather/Index"))

const NotFound = loadable(() => import("./pages/NotFound"))
const NeedAuth = loadable(() => import('./pages/NeedAuth'))
const Login = loadable(() => import('./pages/Login'))

import {
  setRefetchFlag,
  fetchCityListAndTemperature,
  fetchCityListAndQuality
} from './store/redux/actions'

import ajax from './client/services/ajax'

export default [
  {
    path: '/',
    component: Root,
    routes: [
      {
        path: '/index',
        component: Index,
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
        path: '/weather',
        component: WeatherPage,
        // asyncData: WeatherPage.asyncData   // 异步代码加载前无法拿到引用
        // asyncData (store) {
        //   return store.dispatch(fetchCityList())
        // },
        routes: [
          {
            path: '/weather/quality',
            component: loadable(() => import('./pages/weather/Quality')),
            asyncData (store, query) {
              const city = (query || '').split('=')[1]

              let promise = store.dispatch(fetchCityListAndQuality(city || undefined))

              let promise2 = store.dispatch(setRefetchFlag(false))

              return Promise.all([promise, promise2])
              return promise
            },
          },
          {
            path: '/weather/temperature',
            component: loadable(() => import('./pages/weather/Temperature')),
            asyncData (store, query) {
              const city = (query || '').split('=')[1]

              let promise = store.dispatch(fetchCityListAndTemperature(city || undefined))
              
              let promise2 = store.dispatch(setRefetchFlag(false))

              return Promise.all([promise, promise2])
              return promise
            },
          },
          // {
          //   path: '/weather/:city?',
          //   component: loadable(() => import('./pages/weather/Temperature')),
          //   asyncData (store) {
          //     let promise = store.dispatch(fetchCityListAndTemperature(city))
          //     // ajax.fetchTemperature()
          //     return promise
          //   },
          // }
        ]
      },
      {
        path: '/needAuth',
        component: NeedAuth
      },
      {
        path: '/login',
        component: Login
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
  }
]