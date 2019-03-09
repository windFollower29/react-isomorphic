import Router from 'koa-router'

import render from '../render'

const router = new Router({
  prefix: '/'
})

router.all('*', async (ctx, next) => {

  const html = await render(ctx)

  ctx.body = html

})

export default router