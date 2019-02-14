import Router from 'koa-router'

const router = new Router({
  prefix: '/e'
})

router.get('*', async (ctx, next) => {

  console.log('ejs')
  await ctx.render('index', {
    index: 'ejs页面'
  })
})

export default router