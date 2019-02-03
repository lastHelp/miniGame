const Router = require('koa-router');
const {create} = require('../controllers/session')


const path = "/session";

sessionRoute = Router();
sessionRoute.post(path,create);
sessionRoute.get(path,(ctx)=>ctx.body=333);
module.exports = sessionRoute;