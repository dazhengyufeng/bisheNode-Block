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
    @body({senderId:{required:true}})//请求体格式
    static async myWallet(ctx){
        let {
            // 用户id
            senderId
         } = ctx.request.body
        let data = await Block.getMyWallet({ senderId })
        ctx.rest(data)
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
    @body({senderId:{required:true, type:String},sender:{required:true, type:String}})//请求体格式
    static async transaction(ctx){
        let {
            // 发送人id
            senderId,
            // 发送人
            sender,
            // 接收人
            recipient,
            // 总数
            amount
         } = ctx.request.body
        let data = await Block.transaction({senderId, sender,recipient,amount})
        ctx.rest(data)
    }

    // 区块列表
    @request('get', '/blockList') //路由和请求方式
    @summary('区块列表')
    @Tag
    static async blockList(ctx){
        let list = await Block.getBlockChain()
        console.log(list,'数据')
        ctx.rest(list)
    }

    // 挖矿
    @request('post', '/mining') //路由和请求方式
    @summary('挖矿')
    @Tag
    @body({userId:{required:true, type:String}})//请求体格式
    static async mining(ctx){
        let {
            userId
         } = ctx.request.body
        let data = await Block.mining({ userId })
        ctx.rest(data)
    }
}