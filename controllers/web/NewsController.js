const NewsService = require("../../services/web/NewsService")


const NewsController = {
    getList: async (req,res)=>{
        const list = await NewsService.getList({_id: req.params.id})
        res.send({
            AcitonType: "OK",
            data: list
        })
    },
    getTopList: async (req,res)=>{
        const list = await NewsService.getTopList({limit: req.query.limit})
        res.send({
            AcitonType: "OK",
            data: list
        })
    }
}

module.exports = NewsController