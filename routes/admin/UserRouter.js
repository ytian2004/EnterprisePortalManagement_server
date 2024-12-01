// 配置与模型相关的路由，用来处理用户的登录请求

const express = require('express');
const UserController = require('../../controllers/admin/UserController')
// 图片上传
const multer = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })


// 创建一个路由对象
var UserRouter = express.Router();

// 定义一个处理post请求的路由，用来处理用户的登录请求
// 当收到该路由的post请求时，会调用UserController.login方法来处理请求
UserRouter.post("/adminapi/user/login",UserController.login)

// 定义一个post请求，来处理个人信息更新
UserRouter.post("/adminapi/user/upload", upload.single('file'), UserController.upload)

// 添加用户
UserRouter.post("/adminapi/user/add", upload.single('file'), UserController.add)

// 实现列表用户信息的增删改查
UserRouter.get("/adminapi/user/list",UserController.getList)
UserRouter.delete("/adminapi/user/list/:id",UserController.delList)
UserRouter.get("/adminapi/user/list/:id",UserController.getList)
UserRouter.put("/adminapi/user/list/:id",UserController.putList)

module.exports = UserRouter;
