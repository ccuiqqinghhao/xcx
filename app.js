App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var that = this;
    try {
      if (!wx.getStorageSync('userInfoAuth')) {//判断用户信息权限是否初始化
        that.init('userInfoAuth')
      }
      if (!wx.getStorageSync('hasLogin')) {//判断用户有没有登陆
        that.init('hasLogin')
      }
    } catch (e) { }
  },
  /**
   * 方便进行初始化的函数
   */
  init: function (key) {
    try {
      wx.setStorageSync(key, 'nulll');//nulll是为了防止和null混淆
    } catch (e) { }
  },
  /**
   * 获取存储的键值对
   */
  getValue: function (key) {
    try {
      return wx.getStorageSync(key)
    } catch (e) {
    }
  },
  globalData:{
    hasLogin:false,
    openid:null
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
        wx.setStorage({
          key: 'hasLogin',
          data: 'false',
        })
      },
      success: function () {
        console.log("没过期")
        that.globalData.hasLogin = true
        wx.setStorage({
          key: 'hasLogin',
          data: 'true',
        })
      }
    })
    console.log(that.getValue('userInfoAuth'))
    if (that.getValue('userInfoAuth') == 'nulll') {
      console.log("没权限")
      wx.showModal({
        title: '获取权限',
        content: '我们需要获取您的用户信息，以便使用物品交易功能',
        confirmText: '好',
        cancelText: '不好',
        success: (confirm, cancel) => {
          if (confirm) {
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
  //获取权限
  auth: function () {
    var that = this;
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            fail: () => {
              that.globalData.userInfoAuth = false
            },
            success: () => {
              wx.setStorage({
                key: 'userInfoAuth',
                data: 'OK'
              })
            }
          })
        }else{
          wx.setStorage({
            key: 'userInfoAuth',
            data: 'OK'
          })
        }
      }
    })
  }
})
