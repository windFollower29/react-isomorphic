import Router from 'koa-router'

import { matchRoutes } from 'react-router-config'

import routes from '../../routes'

import render from '../render'

const router = new Router({
  prefix: '/'
})

router.all('*', async (ctx, next) => {

  const matchedRoutes = matchRoutes(routes, ctx.req.url)

  const promises = []

  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      const promise = new Promise((resolve, reject) => {
        // item.route.loadData()
        // TODO:
        resolve()
      })

      promises.push(promise)
    }
  })

  let res = await Promise.all(promises)
  // console.log(`----${res}-----`)

  // TODO: 注入全局store
  const html = render(routes, ctx)

  ctx.body = html

})

export default router