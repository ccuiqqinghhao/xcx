const loginUrl = require('../../config').loginUrl
const sendUserInfoUrl = require('../../config').sendUserInfoUrl
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasLogin: true,
    code: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hasLogin: app.globalData.hasLogin
    })
    if(this.data.hasLogin){
      this.userInfo()
    }
  },
  /**
   * 登陆
   */
  startLogin: function () {
    var that = this
    wx.login({
      success: res => {
        app.globalData.hasLogin = true
        that.setData({
          hasLogin: true,
          code: res.code
        });
        //连接后台服务，开启持久化登陆 
        this.persisten();
        //获取用户信息
        this.userInfo()
      },
      fail: res => {
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
  persisten: function () {
    var that = this
    wx.request({
      url: loginUrl,
      method: 'POST',
      data: this.data.code,
      success:res =>{
        app.globalData.openid = res.data.msg
        console.log("open id is " + app.globalData.openid)
        wx.setStorage({
          key: 'openid',
          data: res.data.msg
        })
      }
    })
  },


  /**
   * 获取用户信息
   */
  userInfo: function () {
    var that = this
    if (app.getValue('userInfoAuth') == 'OK'){
      wx.getUserInfo({
        success: res => {
          that.setData({
            userInfo: res.userInfo
          })
          //发送用户信息给后端进行处理
          this.sendUserInfo();
          console.log("发出")
        }
      })
    }else {
      console.log("没权限")
      wx.showModal({
        title: '是否获取权限',
        content: '您没有给予相应的权限，可能会出现异常'
      })
    }
  },
  /**
   * 发送用户信息至后台进行数据更新
   */
  sendUserInfo: function () {
    
    wx.request({
      url: sendUserInfoUrl,
      method: 'POST',
      data: {
        userInfo: this.data.userInfo,
        openid: app.getValue('openid')
      }
    })
  }
})