// 引入mongoose
const mongoose = require('mongoose');
// 引入Schema,通过 mongoose.Schema 创建一个新的模式对象
const Schema = mongoose.Schema;

// 定义用户类型
const NewsType = {
    title:String,
    content:String,
    category:Number, // 类别 1,2,3
    cover:String, // 封面
    isPublish:Number, // 0未发布，1已发布
    editTime:Date // 编辑时间

}

// user模型===>users集合
const NewsModel = mongoose.model("news", new Schema(NewsType))

module.exports = NewsModel