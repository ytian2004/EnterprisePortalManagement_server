// 创建一个user模型，与user表进行一一映射对应

// 引入mongoose
const mongoose = require('mongoose');
// 引入Schema,通过 mongoose.Schema 创建一个新的模式对象
const Schema = mongoose.Schema;

// 定义用户类型
const UserType = {
    username:String,
    password:String,
    gender:Number, // 性别 0 男 1 女
    introduction:String, // 简介
    avatar:String, // 头像
    role:Number, // 管理员1，编辑2
}

// user模型===>users集合
const UserModel = mongoose.model("user", new Schema(UserType))

module.exports = UserModel