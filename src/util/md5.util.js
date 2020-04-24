var crypto = require('crypto');
export default class MD5{
    
    //加密
    static md5(content) {
        var m = crypto.createHash('md5');
        m.update(content, 'utf8');
        return m.digest('hex').toUpperCase();
    };
}