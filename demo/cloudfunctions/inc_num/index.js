// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'demo-lrd'
})

const db=cloud.database()
const _=db.command

// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('product').doc(event.product_id).update({
    data:{
      num:_.inc(event.product_num)
    }
  })
}