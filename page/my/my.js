var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasLogin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hasLogin: app.globalData.hasLogin
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
    
  },
  /**
   * 登陆
   */
  startLogin:function(){
    var that = this
    wx.login({
      success:res =>{
        app.globalData.hasLogin = true
        that.setData({
          hasLogin:true
        });
        that.update();//刷新视图
        this.userInfo();//获取用户信息
        //连接后台服务，开启持久化登陆
        if (app.globalData.java_debug){
          this.persisten();
        }
      },
      fail:res=>{
        wx.showModal({
          title: '登陆失败',
          content: '发生未知错误'
        });
      }
    })
  },
  /**
   * 持久化登陆
   */
  persisten: function(){
    //TODO：待做
  },

  /**
   * 获取用户信息
   */
  userInfo:function(){
    var that = this
    wx.getSetting({
      success:res=>{
        /**如果已经授权 */
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success:res=>{
              that.setData({
                userInfo: res.userInfo
              })
            }
          })
        }else{
          //如果没有授权
          wx.authorize({
            scope: 'scope.userInfo',
            success:res=>{
              wx.getUserInfo({
                success: res => {
                  that.setData({
                    userInfo: res.userInfo
                  })
                }
              })
            },
            fail:res=>{
              wx.showModal({
                title: '没有得到权限',
                content: '没有权限将不能你使用此功能',
              })
            }
          })
        }
      }
    })  
  }
  

})