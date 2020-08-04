// pages/me/me.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse:wx.canIUse('button.open-type.getUserInfo')
  },
  cc:function(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //查看是否授权 
    wx.getSetting({
      success(res){
        if(res.authSetting['scope.userInfo']){
          //已经授权，可以直接调用getUserInfo获取头像昵称
          wx.getUserInfo({
            success:res=>{
              console.log("1")
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo(e){
    console.log(e.detail.userInfo)
  },
  address(e){
    wx.getSetting({
      success(res){
        if(res.authSetting['scope.address']){
          wx.authorize({
            scope: 'scope.address',
            success(){
              wx.chooseAddress({
                success(result){
                  console.log(result)
                }
              })
            }
          })
        }else{
          wx.openSetting({
            success(res){
              console.log(res.authSetting)
            }
          })
        }
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