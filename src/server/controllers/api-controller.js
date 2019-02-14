
import Router from 'koa-router'

const router = new Router({
  prefix: '/api'
})

router.all('*', async (ctx, next) => {
  ctx.body = 'api请求'
})

export default router