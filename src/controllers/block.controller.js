import { request, summary, query, path, body, tags, security, prefix, middlewaresAll } from 'koa-swagger-decorator'
import Login from '../service/login.service'
import Block from '../service/block.service'
import { controllerVersion } from '../config/config'
const Tag = tags(['区块']);


@prefix(`/${controllerVersion}/block`)
export default class BlockBus{

    // 我的钱包
    @request('post', '/myWallet') //路由和请求方式
    @summary('我的钱包')
    @Tag
    @body({userName:{required:true, type:String},password:{required:true, type:String}})//请求体格式
    static async myWallet(ctx){
        let {
            //账号
            userName,
            //密码
            password
         } = ctx.request.body
        await Login.userSignin({userName, password})
        ctx.rest('注册成功')
    }

    // 获取区块链列表
    @request('post', '/getTransaction') //路由和请求方式
    @summary('获取区块链列表')
    @Tag
    @body({userName:{required:true, type:String},password:{required:true, type:String}})//请求体格式
    static async getTransaction(ctx){
        let {
            //账号
            userName,
            //密码
            password
         } = ctx.request.body
        await Login.userSignin({userName, password})
        ctx.rest('注册成功')
    }

    // 交易
    @request('post', '/transaction') //路由和请求方式
    @summary('交易')
    @Tag
    @body({userName:{required:true, type:String},password:{required:true, type:String}})//请求体格式
    static async transaction(ctx){
        let {
            //账号
            userName,
            //密码
            password
         } = ctx.request.body
        await Login.userSignin({userName, password})
        ctx.rest('注册成功')
    }

    // 区块列表
    @request('post', '/blockList') //路由和请求方式
    @summary('区块列表')
    @Tag
    @body({userName:{required:true, type:String},password:{required:true, type:String}})//请求体格式
    static async blockList(ctx){
        let {
            //账号
            userName,
            //密码
            password
         } = ctx.request.body
        await Login.userSignin({userName, password})
        ctx.rest('注册成功')
    }

    // 查看单独的节点
    @request('post', '/findBlock') //路由和请求方式
    @summary('查看单独的节点')
    @Tag
    @body({userName:{required:true, type:String},password:{required:true, type:String}})//请求体格式
    static async findBlock(ctx){
        let {
            //账号
            userName,
            //密码
            password
         } = ctx.request.body
        await Login.userSignin({userName, password})
        ctx.rest('注册成功')
    }

    // 挖矿
    @request('post', '/mining') //路由和请求方式
    @summary('挖矿')
    @Tag
    @body({userName:{required:true, type:String},password:{required:true, type:String}})//请求体格式
    static async mining(ctx){
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