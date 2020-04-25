import user from '../model/user'


//获取用户信息
export function getLoginUser({userName, password}) {
    return user.findOne({
        where: {
            userName,
            password
        }
    })
}

//注册用户
export function newUserSignin({ userName, password }){
    console.log(userName,password)
    return user.create({
        userName,
        password,
    })
}

//查询账户是否存在
export function queryUserNameIs({ userName }){
    return user.findOne({
        where: {
            userName
        }
    })
}