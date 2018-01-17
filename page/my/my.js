

var util = require('../../util/util')
var util2 = require('../../util/util2')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasLogin: false,
    code: null,
  },

  /**
   * 自定义登陆函数
   */
  startLogin: function () {
    var that = this
   
    //登陆
    util2.login(that);
    
    setTimeout(function () {
      if(!that.data.hasLogin){
        wx.showModal({
          title: '登陆超时',
          content: '请重新登陆',
          success:e=>{
            that.setData({
              hasLogin:false
            })
          },
          fail:e=>{
            that.setData({
              hasLogin: false
            })
          }
        })
      }else{
        util2.sendUserInfo(that,wx.getStorageSync('openid'))
      }
      
    }, 10000) //延迟时间 这里是10秒  
    
  },

  /**
   * 重新获取权限
   */
  getAuth:()=>wx.openSetting({})
})