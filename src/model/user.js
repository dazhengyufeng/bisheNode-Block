import mysql from "../config/application.conf"
const sequelize = require('sequelize')

// 用户表
export default mysql.defineModel('user',{
    // 主键id
    id: {
        primaryKey: true,
        type:sequelize.INTEGER
    },
    // 用户名
    userName: {
        type:sequelize.STRING
    },
    // 密码
    passWord: {
        type:sequelize.STRING
    },
    // 交易标识
    identification: {
        type:sequelize.STRING
    },
})