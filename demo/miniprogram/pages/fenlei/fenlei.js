// pages/fenlei/fenlei.js

const db=wx.cloud.database();
const _=db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fenlei:[],
    product:[],
    fenlei_now:""
  },

  get_product_fenlei:function(e){
    this.setData({
      fenlei_now:e.currentTarget.dataset.name
    })
    this.get_product()
  },
  /* 获取当前分类商品 */
  get_product(){
    db.collection('product').where({
      fenlei:this.data.fenlei_now
    }).get({
      success:res=>{
        console.log("分类商品获取成功",res)
        this.setData({
          product:res.data
        })
      },fail:res=>{
        console.log("分类商品获取失败",res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('class').get({
      success:res=>{
        console.log("分类获取成功",res)
        this.setData({
          fenlei:res.data
        })
      },fail:res=>{
        console.log("分类获取失败",res)
      }
    })
    db.collection('product').where({
      fenlei:"手机"
    }).get({
      success:res=>{
        console.log("分类获取成功",res)
        this.setData({
          product:res.data
        })
      },fail:res=>{
        console.log("分类获取失败",res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})