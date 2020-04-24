import { request, summary, query, path, body, tags, security, prefix, middlewaresAll } from 'koa-swagger-decorator'
import { controllerVersion } from '../config/config'
//登陆 
// swagger 接口分组
const Tag = tags(['登陆']);
//路由前缀
@prefix(`/${controllerVersion}/orization/login`)
export default class LoginController{

    @request('post', '/login') //路由和请求方式
    @summary('登陆入口') //swagger 链接后面的注释
    @Tag
    @body({userName:{required:true, type:String},password:{required:true, type:String}})//请求体格式
    static async loginEnter(ctx){
        ctx.rest("登陆成功")
    }
}