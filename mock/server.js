const Koa = require('koa'),
      app = new Koa(),
      KoaRouter = require('koa-router'),
      router = new KoaRouter();

router.get('/api/home', async (ctx) => {
    ctx.body = 'hello home';
})



// 开始服务并生成路由
app.use(router.routes())
   .use(router.allowedMethods());
app.listen(3000);
