// pages/index/index.js
const db=wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
    class:[],
    product:[],
    search:[],
    list_display:true,
    num:20
  },

  /* 搜索框search事件 */
  search(e){
    const _ = db.command;
    /* console.log(e); */
    db.collection("product").where({
      name:e.detail.value
    }).get({
      success:res=>{
        /* console.log('搜索成功',res); */
        this.setData({
          search:res.data
        })
        if(this.data.search==""){
          wx.showToast({
            title: '未找到商品',
            icon:"none"
          })
        } 
      },
      fail:res=>{
        console.log('搜索失败',res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 轮播图 */
    db.collection("swiper").get({
      success:res=>{
        /* console.log('轮播图获取成功',res); */
        this.setData({
          banner:res.data
        })
      },
      fail:res=>{
        // console.log('轮播图获取失败',res)
      }
    });
    /* 商品分类 */
    db.collection("class").get({
      success:res=>{
        // console.log('分类获取成功',res);
        this.setData({
          class:res.data
        })
      },
      fail:res=>{
        console.log('分类获取失败',res)
      }
    });
    /* 产品列表 */
    db.collection("product").get({
      success:res=>{
        // console.log('商品获取成功',res);
        this.setData({
          product:res.data
        })
      },
      fail:res=>{
        console.log('商品获取失败',res)
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
    /* 产品列表 */
    db.collection("product").get({
      success:res=>{
        // console.log('商品获取成功',res);
        this.setData({
          product:res.data
        })
      },
      fail:res=>{
        console.log('商品获取失败',res)
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
    let that=this
    wx.showLoading({
      title: '刷新中',
      duration:1000
    })
    let old_data=this.data.product
    db.collection('product').skip(that.data.num).get().then(res=>{
      //利用concat函数连接新数据与旧数据
      //并更新email_nums
      that.setData({
        product:old_data.concat(res.data),
        num:that.data.num+20
      })
      if(res.data==""){
        wx.showToast({
          title: '已经加载完毕',
          icon:"none"
        })
      }
    }).catch(err=>{
      console.error(err)
    })
    console.log('circle 下一页')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})