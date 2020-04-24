//商品信息
import product_info from '../model/product_info'
//下划线和驼峰转换
import { uppercaseSwtich_, _SwtichUpperCase } from '../util/UppercaseSwtich_'
//商品图片地址
import product_pic_info from '../model/product_pic_info'
//商品分类
import product_category from '../model/product_category'
import sequelize from "../config/application.conf"
//添加商品
export function addProductDao(data, transaction){
    return product_info.create( uppercaseSwtich_( data ) ,transaction )
}
//获取商品列表  （列表查询）
export async function productListDao( id, page, size ){
    let list = await product_info.findAll({ 
        order:[['product_id', 'DESC']],
        raw: true, //只展示原始JSON数据
        attributes:[ 
            'product_id', 'product_core', 'product_name', 'one_category_id',
            'two_category_id', 'three_category_id', 'price', 'color', 'descript', 'after_sale'
        ],
        where:{
            supplier_id:id
        },
        offset: (page-1)*size, 
        limit: size 
    })
    //下划线转成小驼峰
    return list.map(el => {
        el.categoryName = el.one_category_id+','+el.two_category_id+','+el.three_category_id
        delete el.one_category_id;
        delete el.two_category_id;
        delete el.three_category_id;
        return _SwtichUpperCase(el)
    })
}
//获取商品图片
export async function productImgsDao( productId ){
   let list = await product_pic_info.findAll({
        raw:true,
        where:{
            product_id:productId
        },
        attributes:['pic_url']
    })
    return list;
}

//添加商品图片(新增)
export function addProductImgDao(data, transaction){
    return product_pic_info.create( uppercaseSwtich_( data ) ,transaction )
}

//删除商品图片（删除）
export function delProductImgDao(product_id,transaction) {
    return product_pic_info.destroy({
        where: {
            product_id
        }
    },transaction)
}
//商品分类获取（查询）
export function geCategoryDao(category_level){
    return product_category.findAll({
        attributes: [[ 'category_id', 'value' ],[ 'category_name', 'label' ],[ 'parent_id' , 'parentId' ]],
        where: {
            category_level
        } 
    })
}
//用户商品的总条数  （原生语句查询）
export function productTotal(userName) {
    return sequelize.query(
        'select count(*) as total from product_info where supplier_id ='+userName, { 
            type: sequelize.QueryTypes.SELECT
        })
}
//修改商品信息（改）
export async function setProductInfoDao( updataInfo, product_id ,transaction){
    updataInfo = uppercaseSwtich_(updataInfo)
    return product_info.update( updataInfo, {
        where: {
            product_id
        }
    },transaction)
}
