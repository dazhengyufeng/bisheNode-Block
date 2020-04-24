import { sequelize } from './index'

function defineModel(name, attributes,options) {
    options = Object.assign({
        freezeTableName: true,      // 不改变表名
        timestamps: false,          // 不为模型添加createAt 和 updateAt字段
        // underscorder: true,         // 转换列名为下划线命名规则
        name: {                     // 建立关联时表名
            singular: name, 
            plural: name 
        }
    }, options)
    return sequelize.define(name, attributes, options);
}
sequelize.defineModel = defineModel
export default sequelize;