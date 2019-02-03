const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

const handlerEroor = require('../middlewares/handlerError');
const appRouteS = require('../routes');
const {port} = require('../config');

const app = new Koa();

app.use(bodyParser());

app.use(logger());

app.use(handlerEroor)
   
app.use(appRouteS.middleware());


app.listen(port,()=>console.log(`i listen to ${port}`));