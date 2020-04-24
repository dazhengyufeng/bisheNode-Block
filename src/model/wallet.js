import mysql from "../config/application.conf"
const sequelize = require('sequelize')

// 钱包表
export default mysql.defineModel('wallet',{
    // 主键id
    id: {
        primaryKey: true,
        type:sequelize.INTEGER
    },
    // 用户id
    userId: {
        type:sequelize.INTEGER
    },
    // 金额
    account: {
        type:sequelize.INTEGER
    }
})