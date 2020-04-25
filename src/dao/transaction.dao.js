// 交易
import transaction from '../model/transaction'


// 添加交易
export function newTransaction({ senderId,sender,recipient,amount }){
    return transaction.create({
        senderId,
        sender,
        recipient,
        amount,
        state: 0
    })
}

// 查询用户交易记录
export function findUserTransaction({ senderId }){
    return transaction.findAll({ 
        raw: true, //只展示原始JSON数据
        where:{
            senderId:senderId
        },
    })
}

// 查询所有没被打包到区块的交易
export function findNotPackTransaction(){
    return transaction.findAll({ 
        raw: true, //只展示原始JSON数据
        where:{
            state:0
        },
    })
}

// 修改所有没被打包到区块的交易,变成已经被打包到区块的交易
export function updataNotPackTransaction(state){
    return transaction.update( updataInfo, {
        where: {
            state:0
        }
    })
}



