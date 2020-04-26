import block from '../model/block'

// 挖矿
export function addBlock({ index, previousHash, timestamp, data, hash }){
    return block.create({
        index, 
        previousHash, 
        timestamp, 
        data, 
        hash
    })
}

// 查看单独的区块
export function getBlockDetail({userName, password}) {
    return block.findOne({
        where: {
            user_name: userName,
            password
        }
    })
}

// 获取区块链
export function getBlockChain(){
    return block.findAll({
        attributes: ['index','previousHash','timestamp','hash'],
    })
}