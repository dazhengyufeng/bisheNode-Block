import user_info from '../model/user'


//获取用户信息
export function getLoginUser({userName, password}) {
    return user_info.findOne({
        where: {
            user_name: userName,
            password
        }
    })
}

//注册用户
export function newUserSignin({ userName, password }){
    return user_info.create({
        user_name: userName,
        password,
    })
}

//查询账户是否存在
export function queryUserNameIs({ userName }){
    return user_info.findOne({
        where: {
            user_name: userName
        }
    })
}