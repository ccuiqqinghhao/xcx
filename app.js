App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发
   */
  onShow: function (options) {
    var that = this
    //检查登陆状态
    wx.checkSession({
      fail: function () {
        console.log("过期了")
        that.globalData.hasLogin = false
      },
      success: function () {
        console.log("没过期")
      }
    })
    if (!this.globalData.userInfoAuth){
      wx.showModal({
        title: '获取权限',
        content: '我们需要获取您的用户信息，以便使用物品交易功能',
        confirmText: '好',
        cancelText:'不好',
        success:(confirm,cancel) =>{
          if(confirm){
            that.auth();
          }
        }
      })
    }
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  /**
   * 全局数据
   */
  globalData:{
    hasLogin:false,//是否登陆
    sessionKey:null,//第三方sessionKey
    userInfoAuth:false//获取用户信息的权限
  },
  auth:function(){
    var that = this;
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success: () => {
              that.globalData.userInfoAuth = true
            }
          })
        }else{
          that.globalData.userInfoAuth = true
        }
      }
    })
  }
})
