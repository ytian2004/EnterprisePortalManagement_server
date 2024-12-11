const UserService = require('../../services/admin/UserService')
const JWT = require("../../util/JWT") // 用于生成和验证json web token

// 定义控制器
const UserController = {
    login: async (req, res) => {
        // req.body

        // console.log(req.body) // 打印请求体数据

        var result = await UserService.login(req.body) // 调用用户服务的login方法，传入请求体数据进行用户验证
        if (result.length === 0) {
            res.send({
                code: -1,
                error: "用户名密码不匹配"
            })
        } else {
            // 登录成功
            // 生成token
            const token = JWT.generate({
                _id: result[0].id,
                username: result[0].username

            }, "1d")
            // 生成token并设置在header里面，方便后续的请求中使用
            res.header("Authorization", token)
            // 返回登录成功的结果
            res.send({
                ActionType: "OK",
                data: {
                    username: result[0].username,
                    gender: result[0].gender ? result[0].gender : 0, // 性别 0 男 1 女
                    introduction: result[0].introduction, // 简介
                    avatar: result[0].avatar, // 头像
                    role: result[0].role, // 管理员1，编辑2
                }
            })

        }
    },
    upload: async (req, res) => {
        // req.body
        // console.log(req.body,req.file) // 打印请求体数据
        const { username, introduction, gender } = req.body
        // 从token中取出用户id，方便对应用户信息更新
        const token = req.headers["authorization"].split(" ")[1];
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""
        var payload = JWT.verify(token)

        await UserService.upload({ _id: payload._id, username, introduction, gender: Number(gender), avatar })
        if (avatar) {
            res.send({
                ActionType: "OK",
                data: {
                    username,
                    gender: Number(gender),
                    introduction,
                    avatar
                }
            })
        } else {
            res.send({
                ActionType: "OK",
                data: {
                    username,
                    gender: Number(gender),
                    introduction,
                }
            })

        }
    },
    add: async (req, res) => {
        // req.body
        // console.log(req.body,req.file) // 打印请求体数据
        const { username, introduction, gender, role, password } = req.body
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""
        await UserService.add({ username, introduction, gender: Number(gender), avatar, role: Number(role), password })
        res.send({
            ActionType: "OK"
        })
    },
    getList: async (req,res)=>{
        const result = await UserService.getList(req.params)
        res.send({
            ActionType: "OK",
            data: result
        })
    },
    delList: async (req,res)=>{
        const {id} = req.params
        const result = await UserService.delList({_id:id})
        res.send({
            ActionType: "OK"
        })
    },
    putList: async (req,res)=>{
        const data = await UserService.putList(req.body)
        res.send({
            ActionType: "OK",
        })
    }
}

module.exports = UserController