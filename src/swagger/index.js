import swaggerRouter from './router';
import Router from 'koa-router';
const router = new Router();
// 服务中间件及路由
router
// swagger-router
.use(swaggerRouter.routes())
export default router;