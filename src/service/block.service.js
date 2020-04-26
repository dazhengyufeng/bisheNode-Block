
import { getBlockChain, addBlock, blockDetail } from '../dao/block.dao'
import { findNotPackTransaction , newTransaction,findUserTransaction  } from '../dao/transaction.dao'
import { findUserWallet , updateUserWallet  } from '../dao/wallet.dao'
import { getLoginUser, newUserSignin, queryUserNameIs } from '../dao/userInfo.dao'

const crypto = require('crypto');

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
  let nonce = 0
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
  };

  //计算哈希
  function computeHash(index, prevHash, timestamp, data, nonce){
    return crypto
            .createHash('sha256')
            .update( index + prevHash + timestamp + data + nonce)
            .digest('hex');
  };

  
export default class BlockService{

    // 挖矿 POW
    // 通过挖矿生成区块
    // 说明：通过POW即工作证明，将这段时间内的交易打包到这个区块中,如果这段时间没有交易，那这个区块就是所谓的空块。
    //       将区块添加到区块链节点上，并生成BTC奖励，发送给通过了工作证明的人
    static async mining({ userId }){
      // 清空挖矿次数
      nonce = 0
      // 上一个区块
      let lastBlock = {}
      // 没有被打包的数据
      let noPackData = null

      // 1：获取区块链节点的上一个区块
      // 获取区块链
      // 如果是第一次挖矿，先添加初始区块
      let list = await getBlockChain();  // 获取区块链
      console.log(list.length,'长度')
      // 如果一个区块都没有
      if(!list.length){ 
        // 添加初始区块
        await addBlock(genesisBlock);
        // 赋值上一个区块
        lastBlock = {...genesisBlock}
      }else{
        // 赋值上一个区块
        lastBlock = {...list[list.length -1].dataValues}
      }
      console.log(lastBlock,'上一个区块')

      // 2：获取所有没有被打包的
      // 获取所有没被打包到交易的区块(作为内容打包到下一个区块中)
      try{
        noPackData = await findNotPackTransaction()
      }catch(err){
        console.log(err)
      }

      // 3：挖矿
      // 挖矿的本质：随意生成hash串，知道获取到的hash串能够符合制定的难度的条件
      // 这里的规则是，随机生成的hash串的前两位是00
      // 判断得到的hash的前 几位 是否为 0~
      let index = lastBlock.index + 1 // 索引
      let previousHash = lastBlock.hash // 上一个区块的hash
      let timestamp = new Date().getTime() //  获取时间戳
      let hash = computeHash(index, previousHash, timestamp, noPackData,nonce) // 计算hash

      // 循环工作机制POW
      while(hash.slice(0, difficulty) !== "0".repeat( difficulty ))
      {
          nonce++;
          hash = computeHash(index, previousHash, timestamp, noPackData,nonce);
          console.log(`正在进行第${nonce}次挖矿：${hash}`);
      }
      // 当前区块
      const currentBlock = {
        // 索引
        index: index, 
        // 上个区块的hash
        previousHash: previousHash,
        // 时间戳
        timestamp: timestamp,
        // 数据
        data: noPackData.toString(),
        // 这个区块的hash
        hash: hash
      }
      // 添加初始区块
      try{
        await addBlock(currentBlock)
      }catch(err){
        console.log(err)
      }

      // 4:发送BTC奖励
      // 获取钱包余额
      let walletCount = await findUserWallet({ userId:userId })
      // 定义余额
      let count = walletCount.account + btcCount
      // 发送BTC奖励
      let aRst = await updateUserWallet({account:count,userId:userId})
      // 返回数据
      let data = {
        nonce:nonce,
        count:50
      }
      return data
    }

    // 获取区块链
    static async getBlockChain(){
      // 获取区块链
      let blockInfo = await getBlockChain()
      return blockInfo;
    }   

    // 交易
    // 1：先判断人是否存在
    // 2：根据人员id查询余额
    // 3：修改人员余额
    // 4：添加一条交易记录
    static async transaction({senderId, sender,recipient,amount}){
      // 发送人id
      let idSender = null
      // 接收人id
      let idRecipient = null

      // 1：先判断人是否存在
      // 查询发送人是否存在(并赋值人员id)
      let senderRes = await queryUserNameIs({ userName:sender })
      idSender = senderRes.dataValues.id
      if(!senderRes) throw new Error('发送人不存在')
      // 接收人是否存在(并赋值人员id)
      let recipientRes = await queryUserNameIs({ userName:recipient })
      idRecipient = recipientRes.dataValues.id
      if(!recipientRes) throw new Error('接收人不存在')

      // 2：根据人员id查询余额
      // 查询发送人钱包余额
      let senderWallet = await findUserWallet({ userId:idSender })
      // 查询接收人钱包余额
      let recipientWallet = await findUserWallet({ userId:idRecipient })

      // 3：修改人员余额
      // 定义余额
      let senderCount = senderWallet.account - amount
      let recipientCount = recipientWallet.account + amount
      // 修改发送人钱包
      let aRst = await updateUserWallet({account:senderCount,userId:idSender})
      let bRst = await updateUserWallet({account:recipientCount,userId:idRecipient})
      
      // 4：添加一条交易记录
      try{
        // 添加一条交易（交易状态是未被打包）
        var blockInfo = await newTransaction({senderId, sender,recipient,amount})
      }catch(err){
        console.log(err)
      }
      return blockInfo;
    }

    // 获取我的钱包详情
    static async getMyWallet({ senderId }){

      // 查询钱包余额
      let res = await findUserWallet({ userId:senderId })
      // 查询用户交易记录
      let list = await findUserTransaction({ senderId })
      // 定义返回数据格式
      let data = {
        count:res.account, // 钱包余额
        list:list
      }
      return data;
    }  
}