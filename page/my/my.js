Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    isLogin:false
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
   * 登陆
   */
  startLogin:function(){
    var that = this
    wx.login({
      success:res =>{
        that.setData({
          isLogin:true
        });
        this.userInfo();
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