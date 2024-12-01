// 引入mongoose
const mongoose = require('mongoose');
// 引入Schema,通过 mongoose.Schema 创建一个新的模式对象
const Schema = mongoose.Schema;

// 定义用户类型
const ProductType = {
    title: String,
    introduction: String,
    detail: String,
    cover: String,
    editTime: Date,
}

// user模型===>users集合
const ProductModel = mongoose.model("product", new Schema(ProductType))

module.exports = ProductModel