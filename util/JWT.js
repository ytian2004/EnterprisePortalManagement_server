
const jsonwebtoken = require('jsonwebtoken')
// 统一设置token的密钥
const secret = 'ytian'
const JWT = {
    // 生成token
    // expires：token过期时间
    generate(value,expires){
        return jsonwebtoken.sign(value,secret,{expiresIn:expires})
    },
    // 验证token
    verify(token){
        try {
            return jsonwebtoken.verify(token,secret)
        } catch (e) {
            return false;
        }

    }
}

// 测试是否可以正确生成并验证token
// const token = JWT.generate({name:'ytian'},"10s")
// setTimeout(()=>{
//     console.log(JWT.verify(token))
// },11000)
// console.log(JWT.verify(token))
module.exports = JWT