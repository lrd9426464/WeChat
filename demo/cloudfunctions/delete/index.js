// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'demo-lrd'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  /* const ap=cloud.getWXContext() */
  try {
    return await db.collection('shopping_cart').where({
     /*  _openid:ap.OPENID, */
     product_checked:"true"
    }).remove()
  } catch(e) {
    console.error(e)
  }
}