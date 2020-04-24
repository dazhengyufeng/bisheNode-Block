import { delProductImgDao, setProductInfoDao, productLengthDao, addProductDao ,addProductImgDao, productListDao, productImgsDao, productTotal, productLookDao } from '../dao/product.dao'
import { pad } from '../util/tool.util'
const moment = require('moment');
import sequelize from "../config/application.conf"

export default class Product{
    
    //添加商品
    static async addProduct({ body: data, _userInfo }){
        let [{ total }] = await productLengthDao()
        //商品唯一编码
        data.product_core = '1996-0508-'+pad(total,4);
        //商品录入时间
        data.indate = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
        //最后修改时间
        data.modified_time = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
        //审核状态：0未审核，1已审核
        data.audit_status = 1;
        //上下架状态：0下架1上架
        data.publish_status = 1;
        //商品的供应商ID
        data.supplier_id = _userInfo.userId;
        try{
            let res = await sequelize.transaction(async (t) => {
                //添加商品信息
              let productInfo = await addProductDao(data, {transaction: t})
              let len = data.picUrl.length;
              for(let i = 0; i<len; i++){
                let addProductData = {
                    picUrl: data.picUrl[i],//图片地址
                    product_id: productInfo.get({plain:true}).product_id,//商品id
                }
                //添加商品图片
                await addProductImgDao(addProductData,{transaction: t})
              }
          })
        }catch(error){
            console.error(error)
        }
    }

    //获取分页商品列表
    static async productList({ body, _userInfo }){
        let { pageInfo: { page, size } } = body;
        let list = await productListDao( _userInfo.userId, page, size ); 
        for(let i = 0,len = list.length; i<len ;i++){
            list[i].productImgs = await productImgsDao(list[i].productId);
        }
        return list;
    }
    //用户商品总数
    static async productTotal({ _userInfo }){
        let [ total ] = await productTotal(_userInfo.userId)
        return total;
    }
    //修改商品的查看
    static async getProductLook(id,{ _userInfo:{userId} }){
       let productInfo = await productLookDao( id, userId );
       //获取图片
       productInfo.productImgs = await productImgsDao( id )
       return productInfo
    }
    //修改商品
    static async setProductInfo({ body, _userInfo }){
        let id = body.productId;
        delete body.productId;
        let productImg = body.picUrl;
        delete body.picUrl
        //最后修改时间
        body.modified_time = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
       return await sequelize.transaction(async (t) => {
            //修改商品信息
            await setProductInfoDao( body, id ,t)
            //删除该商品所有图片并重新添加
            await delProductImgDao(id,t)
            for(let i = 0,len = productImg.length; i<len; i++){
                let addProductData = {
                    picUrl: productImg[i],//图片地址
                    product_id: id,//商品id
                }
                await addProductImgDao(addProductData,t)
            }
        })
    }
}