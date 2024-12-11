const express = require('express');
const ProductController = require('../../controllers/web/ProductController')

// 创建一个路由对象
var ProductRouter = express.Router();

// 涉及文件上传，普通post不行，需要加上 multer 中间件

ProductRouter.get("/webapi/product/list",ProductController.getList)

module.exports = ProductRouter; 