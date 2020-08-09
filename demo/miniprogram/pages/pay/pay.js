// pages/pay/pay.js
const util=require('../../utils/util.js')
const db=wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:[],
    money:0,
    name:"",
    phone_number:"",
    address:"",
    beizhu:"",
    time:""
  },

  /* 备注 */
  beizhu(e){
    console.log(e)
    if(this.data.time!==""){
      clearTimeout(this.data.time)
    }
    this.setData({
      time:setTimeout(()=>{
        /* console.log("123") */
        this.setData({
          beizhu:e.detail.value
        })
      },500)
    })
  },
  /* 结算 */
  pay(){
    let that=this
    var DATE=util.formatDate(new Date())
    if(that.data.name!==""&&that.data.address!==""&&that.data.phone!==""){
      db.collection('order').add({
        data:{
          name:that.data.name,
          phone_number:that.data.phone_number,
          address:that.data.address,
          beizhu:that.data.beizhu,
          money:that.data.money,
          product:that.data.product,
          time:DATE,
          product_state:"送货中"
        },success:function(res){
          console.log('下单成功',res)
          wx.cloud.callFunction({
            name:"delete",
            data:{},
            success:res=>{
              console.log('购物车删除成功',res)
              for (let index = 0; index < that.data.product.length; index++) {
                wx.cloud.callFunction({
                  name:"inc_num",
                  data:{
                    product_id:that.data.product[index].product_id,
                    product_num:that.data.product[index].product_num
                  },success:res=>{
                    console.log('商品销量自加成功',res)
                  }
                })
              }
              wx.switchTab({
                url: '../shopping_cart/shopping_cart',
              })
            },fail:res=>{
              console.log('购物车删除失败',res)
            }
          })
        },fail:res=>{
          console.log('下单失败',res)
        }
      })
    }else{
      wx.showToast({
        title: '地址信息有误',
        icon:"none"
      })
    }
  },

  /* 选择地址 */
  address(){
    let that=this;
    wx.getSetting({
      success(res){
        console.log(res)
          wx.authorize({
            scope: 'scope.address',
            success(){
              wx.chooseAddress({
                success(result){
                  console.log(result);
                  that.setData({
                    name:result.userName,
                    phone_number:result.telNumber,
                    address:result.provinceName+result.cityName+result.countyName+result.detailInfo
                  })
                }
              })
            }
          })
      }
    })
  },
  //计算金额
  get_money_sum(){
    let money_sum=0;
    for(var x=0;x<this.data.product.length;x++){
        money_sum=money_sum+(this.data.product[x].product_num*this.data.product[x].product_price)
    }
    this.setData({
      money:money_sum
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('shopping_cart').where({
      product_checked:"true"
    }).get({
      success:res=>{
        console.log('获取商品成功',res);
        this.setData({
          product:res.data
        })
        this.get_money_sum()
      },fail:res=>{
        console.log('获取商品失败',res);
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