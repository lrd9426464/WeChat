// pages/store_login/store_login.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  formsubmit(e){
    console.log(e)
    if(e.detail.value.username!==""&&e.detail.value.upwd!==""){
      db.collection('user').where({
        username:e.detail.value.username,
        upwd:e.detail.value.upwd
      }).get({
        success:res=>{
          console.log(res)
          if(res.data.length==0){
            wx.showToast({
              title: '账户或密码错误',
              icon:"none"
            })
          }else{
            wx.redirectTo({
              url: '../store_operation/store_operation',
            })
          }
        },fail:res=>{
          console.log(res)
        }
      })
    }else{
      wx.showToast({
        title: '您还有信息未填',
        icon:"none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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