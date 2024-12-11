const ProductService = require("../../services/admin/ProductService")
const ProductController={
    add: async (req,res)=>{
        const cover = req.file ? `/productsuploads/${req.file.filename}`:""
        const {title,introduction,detail} = req.body

        await ProductService.add({
            title,
            introduction,
            detail,
            cover,
            editTime: new Date()
        })
        res.send({
            AcitonType: "OK"
        })
    },
    getList: async (req, res)=>{
        const list = await ProductService.getList({_id:req.params.id})
        res.send({
            ActionType: "OK",
            data: list
        })
    },
    delList: async (req, res)=>{
        await ProductService.delList({_id:req.params.id})
        res.send({
            ActionType: "OK"
        })
    },
    updateList: async (req, res)=>{
        const cover = req.file ? `/productsuploads/${req.file.filename}`:""
        const {title,introduction,detail,_id} = req.body
        await ProductService.updateList({
            _id,
            title,
            introduction,
            detail,
            cover,
            editTime: new Date()
        }),
        res.send({
            AcitonType: "OK"
        })
    }
}

module.exports = ProductController