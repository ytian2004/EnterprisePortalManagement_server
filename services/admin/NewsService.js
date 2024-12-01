// const { updateList } = require("../../controllers/admin/NewsController")
const NewsModel = require("../../models/NewsModel")


const NewsService = {
    add: async ({title,content,category,isPublish,cover,editTime}) => {
        return NewsModel.create({
            title,content,category,isPublish,cover,editTime
        })
    },
    updateList: async({_id,title,content,category,isPublish,cover,editTime})=>{
        if(cover){
            return NewsModel.updateOne({
                _id // 查询条件对象，表示要更新的文档_id属性
            },{
                title,content,category,isPublish,cover,editTime // 要更新的字段和值
            })
        }else{
            return NewsModel.updateOne({
                _id // 查询条件对象，表示要更新的文档_id属性
            },{
                title,content,category,isPublish,editTime // 要更新的字段和值
            })
        }
    },
    getList: async ({_id})=>{
        return _id ? NewsModel.find({_id}):NewsModel.find({})
    },
    publish: async ({_id,isPublish,editTime})=>{
        return NewsModel.updateOne({
            _id // 查询条件对象，表示要更新的文档_id属性
        },{
            isPublish,editTime // 要更新的字段和值
        })
    },
    delList: async ({_id})=>{
        return NewsModel.deleteOne({
            _id
        })
    }
}

module.exports = NewsService