import { request, summary, query, path, body, tags, security, prefix, middlewaresAll } from 'koa-swagger-decorator'
import Login from '../service/login.service'
import { controllerVersion } from '../config/config'
const Tag = tags(['注册']);


@prefix(`/${controllerVersion}/block`)
export default class Signin{
    @request('post', '/signin') //路由和请求方式
    @summary('注册')
    @Tag
    @body({userName:{required:true, type:String},password:{required:true, type:String}})//请求体格式
    static async userSignin(ctx){
        let {
            //账号
            userName,
            //密码
            password
         } = ctx.request.body
        await Login.userSignin({userName, password})
        ctx.rest('注册成功')
    }
}