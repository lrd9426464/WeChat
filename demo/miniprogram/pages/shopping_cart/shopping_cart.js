// pages/shopping_cart/shopping_cart.js
const db=wx.cloud.database();
const _=db.command;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:[],
    money:0,
    product_now:[],
    product_id:[],
    delet_id:[]
  },

  /* 计算金额 */
  get_money_sum(){
    let money_sum=0;
    for(var x=0;x<this.data.product.length;x++){
      if(this.data.product[x].product_checked=="true"){
        money_sum=money_sum+(this.data.product[x].product_num*this.data.product[x].product_price)
      }
    }
    this.setData({
      money:money_sum
    })
  },

  /* 选择事件 */
  chance(e){
    console.log(e)
    this.setData({
      delet_id:this.data.delet_id.concat(e.detail.value[0])
    })
    if(e.detail.value.length !== 0){
      db.collection('shopping_cart').doc(e.target.dataset.id).update({
        data:{
          product_checked:"true"
        },success:res=>{
          this.onLoad()
        }
      })
    }else{
      db.collection('shopping_cart').doc(e.target.dataset.id).update({
        data:{
          product_checked:""
        },success:res=>{
          this.onLoad()
        }
      })
    }
  },

  /* 商品删除 */
  delete(){
    wx.cloud.callFunction({
      name:"product_delete",
      success:res=>{
        console.log("删除商品成功",res)
        this.onLoad()
      }
    })
  },

  /* 商品数量加 */
  product_jia(e){
    console.log(e)
    db.collection('shopping_cart').doc(e.target.dataset.id).update({
      data:{
        product_num:_.inc(1)
      },success:res=>{
        console.log("数量加一",res)
        this.onLoad();
      }
    })
  },

  /* 商品数量减 */
  product_jian(e){
    console.log(e)
    if(e.target.dataset.product_num<2){
      wx.showToast({
        title: '不能再少了',
        icon:'none'
      })
    }else{
      db.collection('shopping_cart').doc(e.target.dataset.id).update({
        data:{
          product_num:_.inc(-1)
        },success:res=>{
          console.log("数量减一",res)
          this.onLoad();
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection("shopping_cart").get({
      success:res=>{
        console.log('获取购物车商品成功',res);
        this.setData({
          product:res.data
        })
        this.get_money_sum()
      },fail:res=>{
        console.log('获取购物车商品失败',res);
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
    this.get_money_sum();
    db.collection("shopping_cart").get({
      success:res=>{
        console.log('获取购物车商品成功',res);
        this.setData({
          product:res.data
        })

      },fail:res=>{
        console.log('获取购物车商品失败',res);
      }
    })
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