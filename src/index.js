const Koa = require('koa');
import router from "./swagger";
import { restify } from "./middleware/reponseHandle"
// 请求体解析
import bodyParser  from 'koa-bodyparser';
const path = require('path')
const staticFiles = require('koa-static'); //静态资源中间件
//解决跨域
const cors = require('@koa/cors');
async function start() {

    const app = new Koa();
    //设置静态资源目录
    let staticFilePath =  process.env.NODE_ENV === "prod"?'./public':'../public'
    app.use(staticFiles(path.resolve(__dirname , staticFilePath)))
    app.use(cors());
    app.use(restify());
    app.use(bodyParser());
    app.use(router.routes());
    app.listen(3000,()=>{console.log('端口号：3000')});
}

start()
.catch(err => console.error(err))