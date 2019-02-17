/**
 * loadable的异步组件加载前无法获取引用，因而asyncData无法定义在组件的static方法中
 * 服务端preload的数据如果跨路由相关，请求操作应放在最下层路由
 */

import loadable from '@loadable/component'

// import Index from './pages/Index'
// import Home from './pages/Home'
// import About from './pages/About'
// import NotFound from './pages/NotFound'

const Root = loadable(() => import('./pages/Root'))
const Index = loadable(() => import("./pages/Index"))
const Home = loadable(() => import("./pages/Home"))
const About = loadable(() => import("./pages/About"))
const WeatherPage = loadable(() => import("./pages/weather/Index"))

// import WeatherPage from './pages/weather/Index'
const Weather = loadable(() => import("./pages/weather/Weather"))
const Detail = loadable(() => import("./pages/weather/Detail"))
const NotFound = loadable(() => import("./pages/NotFound"))

import { 
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

              return promise
            },
          },
          {
            path: '/weather/temperature',
            component: loadable(() => import('./pages/weather/Temperature')),
            asyncData (store, query) {
              const city = (query || '').split('=')[1]

              let promise = store.dispatch(fetchCityListAndTemperature(city || undefined))
              // ajax.fetchTemperature()
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