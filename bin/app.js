const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
var serve = require('koa-static');

const {port} = require('../config');

const app = new Koa();

app.use(bodyParser());
app.use(serve("./static"))
app.use(logger());




app.listen(port,()=>console.log(`i listen to ${port}`));