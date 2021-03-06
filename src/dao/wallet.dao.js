import wallet from '../model/wallet'


// 添加用户钱包
export function newUserWallet(userId){
    return wallet.create({
        userId,
        account: 0
    })
}

// 查询用户钱包余额
export function findUserWallet({ userId }){
    return wallet.findOne({ 
        raw: true, //只展示原始JSON数据
        attributes:[ 'account' ],
        where:{
            userId:userId
        },
    })
}

// 修改用户钱包余额
export function updateUserWallet({ account,userId }){
    console.log(account,userId,'修改的数据')
    return wallet.update( { account }, {
        where:{
            userId
        }
    })
}