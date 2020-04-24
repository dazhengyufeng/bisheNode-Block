import mysql from "../config/application.conf"
const sequelize = require('sequelize')

// 交易表
export default mysql.defineModel('user',{
    // 主键id
    id: {
        primaryKey: true,
        type:sequelize.INTEGER
    },
    // 发送人Id
    senderId: {
        type:sequelize.INTEGER
    },
    // 发送人
    sender: {
        type:sequelize.STRING
    },
    // 接收者
    recipient: {
        type:sequelize.STRING
    },
    // 交易金额
    amount: {
        type:sequelize.INTEGER
    },
    // 交易状态
    // 0代表是没有被打包到区块里面的交易
    // 1代表是已经被打包到区块里面的交易
    state:{
        type:sequelize.INTEGER
    }
})