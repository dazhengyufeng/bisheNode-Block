// 挖矿

const crypto = require('crypto');
//创世区块 这是第一次挖矿生成的数据
const initBlock ={ 
    index: 0,
    nonce: 1307,
    data: '我是创世区块',
    prevHash: 0,
    timestamp: 1551248147024,
    hash:
     '00e275e4946f0fdf672be32fd4dfeaae0b7efd8d9f377c48ac510efe79d6a814' 
    };
class Blockchain{
    constructor(){
        this.blockchain = [
            initBlock //默认有一个创世区块
        ];
        this.data= [];
        this.difficulty = 2; //难度
        
    }
    //挖矿
    min(){
        const index = this.blockchain.length; //索引.也就是现在区块的长度
        let nonce = 0; //随机数
        const data = this.data;
        const prevHash= this.getLastChain();// 上一个区块的hash值
        let timestamp = new Date().getTime(); //时间戳
        let hash = this.computeHash(index,prevHash,timestamp,data, nonce);
        // 挖矿的本质：随意生成hash串，知道获取到的hash串能够符合制定的难度的条件
        // 这里的规则是，随机生成的hash串的前两位是00
        // 判断得到的hash的前 几位 是否为 0~
        while(hash.slice(0, this.difficulty) !== "0".repeat( this.difficulty ))
        {
            nonce+=1;
            hash = this.computeHash(index,prevHash,timestamp,data, nonce);
            console.log(`正在进行第${nonce}次挖矿：${hash}`);
        }
        this.blockchain.push({
            index,
            nonce,
            data,
            prevHash,
            timestamp,
            hash
        })
        console.log(this.blockchain);
            
    }   
    //获取最后一个区块的数据
    getLastChain(){
        return this.blockchain[this.blockchain.length-1].hash;
    }
    //计算哈希
    computeHash(index, prevHash, timestamp, data, nonce){
        return crypto
                .createHash('sha256')
                .update( index + prevHash + timestamp + data + nonce)
                .digest('hex');
    }
}
var chain = new Blockchain();
chain.min();