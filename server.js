'use strict';
require('dotenv').config();
const compress = require('koa-compress');
const logger = require('koa-logger');
// const serve = require('koa-static');
const koaRouter = require('koa-router')
const koa = require('koa')
const ewelink = require('./lib/handlers/ewelink');


const app = new koa()
const router = new koaRouter()
// Logger
app.use(logger());

const KEY = process.env.PATH_KEY;

// Compress
app.use(compress());

// Serve static files
// app.use(serve(path.join(__dirname, 'public')));


router.get('/set/:key', async (ctx) => {
  console.log(ctx.params)
  if (ctx.params.key !== KEY) {
    ctx.throw(404);
    return
  }
  console.log(ctx.query)
  ewelink.setDevicePowerState(ctx.query.value === 'true')
  ctx.body = 'ok';
})

app.use(router.routes())
  .use(router.allowedMethods())

const port = process.env.PORT || 3000;
app.listen(port);
console.log('listening on port ' + port);
