
import { getLoginUser, newUserSignin, queryUserNameIs } from '../dao/userInfo.dao'
import { newUserWallet } from '../dao/wallet.dao'


import MD5 from '../util/md5.util'
export default class Login{

    //验证登陆
    static async verifyLogin({ userName, password }){
        //获取当前登陆用户信息
        password = MD5.md5(password)
        let userInfo = await getLoginUser({ userName, password })
        if (!userInfo) throw new Error('账号或密码错误');
        return userInfo
    }

    //用户注册
    static async userSignin(data){
        if(!( /^1(3|4|5|7|8)\d{9}$/.test(data.userName) )) throw new Error('手机号格式不正确')
        //获取当前登陆用户信息
        let userInfo = await queryUserNameIs(data)
        if(userInfo) throw new Error('账号已存在')
        data.password = MD5.md5(data.password)
        // 注册用户
        let user = await newUserSignin(data)
        // 添加用户钱包
        newUserWallet(userId)
        return 
    }
}