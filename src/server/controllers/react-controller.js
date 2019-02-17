import Router from 'koa-router'

// import { matchRoutes } from 'react-router-config'

import routes from '../../routes'

import render from '../render'

const router = new Router({
  prefix: '/'
})

router.all('*', async (ctx, next) => {

  const html = await render(routes, ctx)

  ctx.body = html

})

export default router