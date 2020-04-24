const Sequelize = require('sequelize');

const config = {
    database: 'block', // 使用哪个数据库
    username: 'root', // 用户名
    password: 'root', // 口令
    host: 'localhost', // 主机名
    port: 3306 // 端口号，MySQL默认3306
};

export const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    //连接池设置
    pool: {
        max: 5, //最大连接数
        min: 0, //最小连接数
        idle: 30000 //连接最大空置时间（毫秒），超时后将释放连接
    }
});

export const localPath = 'localhost:3000'