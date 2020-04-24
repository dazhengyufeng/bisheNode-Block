import path from 'path';

/**
 * 自动载入相应环境的配置
 **/
let environment = {
  'dev': function () {
    return 'dev';
  }
};

// 接受请求
let fileName = function (name) {
  return environment[name]();
};

// 载入配置文件
let file = path.resolve(__dirname, `config.${fileName(process.env.NODE_ENV)}.js`);

try {
  module.exports = require(file);
} catch (error) {
  console.error('Cannot load config: [%s]', file);
  throw error;
}