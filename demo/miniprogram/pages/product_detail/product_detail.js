// pages/product_detail/product_detail.js
const db=wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_src:"",
    product_name:"",
    product_num:"",
    product_price:"",
    product_detail:"",
    product_xq_src:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('产品的id已经获取',options.id)
    db.collection("product").doc(options.id).get({
      success:res=>{
        console.log(res);
        this.setData({
          product_src:res.data.src,
          product_name:res.data.name,
          product_num:res.data.num,
          product_price:res.data.price,
          product_detail:res.data.detail,
          product_xq_src:res.data.product_xq_src,
        })
      },fail:res=>{
        console.log('商品详细信息获取失败',res)
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