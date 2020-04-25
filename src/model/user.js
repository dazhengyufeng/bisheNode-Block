import mysql from "../config/application.conf"
const sequelize = require('sequelize')

// 用户表
export default mysql.defineModel('user',{
    // 主键id
    id: {
        primaryKey: true,
        type:sequelize.INTEGER,
        autoIncrement: true,
    },
    // 用户名
    userName: {
        type:sequelize.STRING
    },
    // 密码
    password: {
        type:sequelize.STRING
    }
})