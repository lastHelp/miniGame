const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
var serve = require('koa-static');

const {port} = require('../config');
const {session} = require('../routes');

const handlerEroor = require('../middlewares/handlerError');

const app = new Koa();


app.use(bodyParser());
app.use(handlerEroor)
app.use(session.routes());
app.use(serve("./static"));
app.use(logger());





app.listen(port,()=>console.log(`i listen to ${port}`));