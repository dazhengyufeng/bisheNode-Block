
import { getBlockChain, addBlock, blockDetail } from '../dao/block.dao'
import { findNotPackTransaction , updataNotPackTransaction  } from '../dao/transaction.dao'
import { findUserWallet , updateUserWallet  } from '../dao/wallet.dao'

const {
    getLength,
    generateNextBlock,
    addChain,
    getBlock,
    checkBlock,
    Block,
    blockchain // 区块链
  } = require('../business/blockBusiness')

  // 这个是挖矿的难度，数值越大难度越大（可以自己修改挖矿难度）
  const difficulty = 3;
  // 这个是挖了多少次
  const nonce = 0
  // BTC奖励金额
  const btcCount = 50
  // 创世区块
  const genesisBlock = {
    // 索引
    index:0, 
    // 上个区块的hash
    previousHash:'0',
    // 时间戳
    timestamp:(new Date()).getTime(),
    // 数据
    data:'初始区块',
    // 这个区块的hash
    hash: '810f9e854ade9bb8730d776ea02622b65c02b82ffa163ecfe4cb151a14412ed4'
  }

  // 时间戳转换成时间
  function getLocalTime(nS) { 
    var unixTimestamp = new Date( 1477386005*1000 ) ;
    commonTime = unixTimestamp.toLocaleString();  
    return commonTime
  } 

  
export default class BlockService{

    // 挖矿
    static async addBlock({ userId }){
      // 上一个区块
      let lastBlock = {}
      // 获取所有没被打包到交易的区块(座位内容打包到下一个区块中)
      let data = await findNotPackTransaction()
      // 获取区块链
      let list = await getBlockChain();
      // 如果一个区块都没有
      if(list.length == 0){ 
        // 添加初始区块
        await addBlock(genesisBlock);
        // 赋值上一个区块
        lastBlock = {...genesisBlock}
      }else{
        // 赋值上一个区块
        lastBlock = {...list[list.length]}
      }
      // 当前区块
      let currentBlock = {}

      // 挖矿的本质：随意生成hash串，知道获取到的hash串能够符合制定的难度的条件
      // 这里的规则是，随机生成的hash串的前两位是00
      // 判断得到的hash的前 几位 是否为 0~
      while(hash.slice(0, this.difficulty) !== "0".repeat( this.difficulty ))
      {
          nonce+=1;
          hash = calcuteHash(index, previousHash, timestamp, data);
          console.log(`正在进行第${nonce}次挖矿：${hash}`);
      }

      // 添加区块
      let info = await addBlock();
      // 查询用户钱包金额
      let count = await findUserWallet(userId);
      // 修改用户钱包金额
      await updateUserWallet(count + btcCount)
      return data
    }

    // 查看单独的区块
    static async getBlockDetail(data){
      // 查看单独的区块
      let blockInfo = await getBlockChain(data)
      return blockInfo;
    }

    // 获取区块链
    static async getBlockChain(data){
      // 获取区块链
      let blockInfo = await getBlockChain(data)
      return blockInfo;
    }
}