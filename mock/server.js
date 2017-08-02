const Koa = require('koa'),
      app = new Koa(),
      KoaRouter = require('koa-router'),
      router = new KoaRouter(),
      koaBody = require('koa-body'),
      login = require('./user/login'),
      poster = require('./poster/poster'),
      product = require('./product/product');

let search = require('./search/search');

app.use(koaBody({multipart: true}));  

//用户信息
router.get('/api/login', async (ctx) => {
    ctx.body = login;
})

// 注册信息
router.post('/api/sign', async (ctx) => {
	const newUser = ctx.request.body;
	login.push(newUser);
	ctx.body = {
		errno: 0,
		msg: 'success'
	}
})

// 接收搜索框关键字

let searchResult = [];
router.post('/api/searchPost', async (ctx) => {
  const keyword = ctx.request.body.keyword;
  const findResult = await product.filter(item => {
    return keyword == item.title;
  })
  searchResult = findResult;
  ctx.body = {
    errno: 0,
    msg: 'success'
  }
})

router.get('/api/search', async (ctx) => {
  console.log(searchResult);
  ctx.body = searchResult;
})


// 海报图信息
router.get('/api/poster', async (ctx) => {
  ctx.body = poster;
})

// 产品信息
router.get('/api/product', async (ctx) => {
  ctx.body = product;
})


// 接收购物消息，并存储到用户信息中的storeList
router.post('/api/store', async (ctx) => {
  // 接收一个有name和store属性的对象
  const newStore = ctx.request.body;
  
  // 根据name找到是那个用户,返回值是筛选出来的数组，第0个是该用户的所有信息
  const userCurrent = login.filter(item => {
    return item.name == newStore.name;
  })

  // 把购物信息添加到对应的用户storeList中，使用unshift
  if (!userCurrent[0].storeList) {
    userCurrent[0].storeList = [];
  }
  userCurrent[0].storeList.unshift(newStore.store);

  // 把是否操作成功反馈给前端
  ctx.body = {
    errno: 0,
    msg: 'success'
  }

})

// 开始服务并生成路由
app.use(router.routes())
   .use(router.allowedMethods());
app.listen(3000);
