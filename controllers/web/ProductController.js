const ProductService = require("../../services/web/ProductService")


const ProductController = {
    getList: async (req,res)=>{
        const list = await ProductService.getList({_id: req.params.id})
        res.send({
            AcitonType: "OK",
            data: list
        })
    }
}

module.exports = ProductController