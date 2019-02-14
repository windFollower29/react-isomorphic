
const path = require('path')

const Koa = require('koa')
const serve = require('koa-static')
import views from 'koa-views'
import favicon from 'koa-favicon'

import apiController from './controllers/api-controller'
import ejsController from './controllers/ejs-controller'
import reactController from './controllers/react-controller'

const app = new Koa()

app.use(serve('./public'))

app.use(favicon(__dirname + '../favicon.ico'))

app.use(async (ctx, next) => {
  await next()
  // console.log('koa')
})

// 模板引擎
app.use(views(path.resolve('./src/views'), {
  extension: 'ejs'
}))

// API路由
app.use(apiController.routes())

// ejs页面路由
app.use(ejsController.routes())

// react页面路由
app.use(reactController.routes())

app.listen(5000, () => {
  console.log('app now is servered in port 5000 ...')
})