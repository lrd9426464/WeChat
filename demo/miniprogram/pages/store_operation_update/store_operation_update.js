// pages/store_operation_up/store_operation_up.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fenlei:[],
    img:[],
    name:"",
    price:"",
    detail:"",
    id:""
  },
  /* 删除数据 */
  delete_product(){
    let that=this;
    db.collection('product').doc(that.data.id).remove({
      success:res=>{
        console.log('删除成功',res)
        /* 删除数据库中的图片 */
        wx.cloud.deleteFile({
          fileList:that.data.img,
          success:res=>{
            console.log(res.fileList)
          },fail:res=>{}
        })
        wx.redirectTo({
          url: '../store_operation_gl/store_operation_gl',
        })
      }
    })
  },
  /* 上传图片 */
  upload_img(){
    let that=this
    wx.chooseImage({
      count: 1,
      sizeType:['original','compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        var timestamp=Date.parse(new Date());
        timestamp=timestamp / 1000;
        console.log("当前时间为"+timestamp)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath:'product/'+timestamp+'.png',
          filePath:tempFilePaths[0],
          success:res=>{
            /* console.log(res.fileID) */
            console.log(that.data.img)
            that.setData({
              img:that.data.img.concat(res.fileID)
            })
          },fail:res=>{}
        })
      }
    })
  },

  /* 删除图片 */
  delete(e){
    console.log(this.data.img)
    console.log(e.currentTarget.dataset.id)
    var id=e.currentTarget.dataset.id;
    var img=this.data.img;
    img.splice(id,1);
    this.setData({
      img:img
    })
    wx.cloud.deleteFile({
      fileList:[e.currentTarget.dataset.src],
      success:res=>{
        console.log(res.fileList)
      },fail:res=>{}
    })
  },
  submit(e){
    let that=this
    console.log(e)
    if(e.detail.value.name!==""&&e.detail.value.price!==""&&e.detail.value.fenlei!==""&&e.detail.value.detail!==""&&that.data.img.length!==0){
      db.collection('product').doc(that.data.id).update({
        data:{
          name:e.detail.value.name,
          price:e.detail.value.price,
          fenlei:e.detail.value.fenlei,
          detail:e.detail.value.detail,
          src:that.data.img,
          num:0,
          product_xq_src:""
        },
        success:res=>{
          wx.showToast({
            title: '提交成功',
          })
          wx.redirectTo({
            url: '../store_operation_up/store_operation_up',
          })
        }
      })
    }else{
      wx.showToast({
        title: '你还有未填信息',
        icon:"none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.setData({
      id:options.id
    })
    db.collection('class').get({
      success:res=>{
        console.log('分类获取成功',res)
        that.setData({
          fenlei:res.data
        })
      },fail:res=>{
        console.log('分类获取失败',res)
      }
    })
    db.collection('product').doc(options.id).get({
      success:res=>{
        console.log('信息获取成功',res)
        this.setData({
          name:res.data.name,
          price:res.data.price,
          detail:res.data.detail,
          img:res.data.src,
        })
      },fail:res=>{
        console.log('信息获取成功',res)
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
    wx.redirectTo({
      url: '../store_operation_up/store_operation_up',
    })
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