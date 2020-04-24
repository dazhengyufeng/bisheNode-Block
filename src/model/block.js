import mysql from "../config/application.conf"
const sequelize = require('sequelize')

// 区块表
export default mysql.defineModel('block',{
    // 主键索引
    index: {
        primaryKey: true,
        type:sequelize.INTEGER
    },
    // 上一个区块的hash
    previousHash: {
        type:sequelize.STRING
    },
    // 时间戳
    timestamp: {
        type:sequelize.STRING
    },
    // 区块内容
    data: {
        type:sequelize.STRING
    },
    // 这个区块的hash
    hash: {
        type:sequelize.STRING
    }
})