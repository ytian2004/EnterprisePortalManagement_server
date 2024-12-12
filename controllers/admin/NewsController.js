const NewsService = require("../../services/admin/NewsService")


const NewsController = {
    add: async (req,res)=>{
        const cover = req.file ? `/newsuploads/${req.file.filename}`:""
        const {title,content,category,isPublish} = req.body
        await NewsService.add({
            title,
            content,
            category:Number(category),
            isPublish:Number(isPublish),
            cover:cover,
            editTime: new Date()
        })
        res.send({
            AcitonType: "OK"
        })

    },
    updateList: async (req,res)=>{
        const cover = req.file ? `/newsuploads/${req.file.filename}`:""
        const {title,content,category,isPublish,_id} = req.body

        await NewsService.updateList({
            _id,
            title,content,
            category:Number(category),
            isPublish:Number(isPublish),
            cover,
            editTime: new Date()
        })
        res.send({
            AcitonType: "OK"

        })
    },
    getList: async (req,res)=>{

        const result = await NewsService.getList({_id:req.params.id})
        res.send({
            AcitonType: "OK",
            data: result
        })
    },
    publish: async (req,res)=>{
        await NewsService.publish({
            ...req.body,
            editTime: new Date() // 在编辑时要将时间更新
        })
        res.send({
            AcitonType: "OK",
        })
    },
    delList: async (req,res)=>{
        await NewsService.delList({
            _id: req.params.id
        })
        res.send({
            AcitonType: "OK",
        })
    }
}

module.exports = NewsController