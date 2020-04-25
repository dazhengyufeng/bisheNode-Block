import { request, summary, query, path, body, tags, security, prefix, middlewaresAll } from 'koa-swagger-decorator'
import { controllerVersion } from '../config/config'
import Login from '../service/login.service'

//登陆 
// swagger 接口分组
const Tag = tags(['登陆']);
//路由前缀
@prefix(`/${controllerVersion}/block`)
export default class LoginController{

    @request('post', '/login') //路由和请求方式
    @summary('登陆') //swagger 链接后面的注释
    @Tag
    @body({userName:{required:true, type:String},password:{required:true, type:String}})//请求体格式
    static async loginEnter(ctx){
        let {
            //账号
            userName,
            //密码
            password
         } = ctx.request.body
        let user = await Login.verifyLogin({userName, password})
        ctx.rest({id:user.dataValues.id,message:'登陆成功' })
    }
}