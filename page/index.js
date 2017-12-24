Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
    isGetData:false,
    userInfo:{}
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
    
  },
  /**
   * 用户登录
   */
  toLogin:function(){
    var that = this
    wx.login({
      success:res =>{
        that.setData({
          isLogin:true
        });
        wx.request({
          url: "http://127.0.0.1:8080/wxLogin/login",
          method:"POST",
          dataType:"json",
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          data:"code="+res.code
          
        })
      }
    })
  },
  /**
   * 获取用户信息
   */
  getUserData:function(){
    var that = this
    wx.getSetting({
      success:res =>{
        //如果已经授权：
        if (res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: res =>{
              that.setData({
                userInfo:res.userInfo,
                isGetData: true
              })
            }
          })
        }else{
          //如果没有授权
          wx.authorize({
            scope: 'scope.userInfo',
            success: res=>{
              wx.getUserInfo({
                success: res => {
                  that.setData({
                    userInfo: res.userInfo,
                    isGetData: true
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  error(e) {
    console.log(e.detail)
  }
})