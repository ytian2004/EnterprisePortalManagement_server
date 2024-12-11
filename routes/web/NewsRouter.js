const express = require('express');
const NewsController = require('../../controllers/web/NewsController')

// 创建一个路由对象
var NewsRouter = express.Router();

// 涉及文件上传，普通post不行，需要加上 multer 中间件

NewsRouter.get("/webapi/news/list",NewsController.getList)
NewsRouter.get("/webapi/news/list/:id",NewsController.getList)
NewsRouter.get("/webapi/news/toplist",NewsController.getTopList)

module.exports = NewsRouter; 