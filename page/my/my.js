const loginUrl = require('../../config').loginUrl
const sendUserInfoUrl = require('../../config').sendUserInfoUrl
var util = require('../../util/util')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasLogin: false,
    code: null
  },
  onLoad: function (option) {
    util.hasKey('openid')
      .then(res => {
        console.log("openid 是"+res)
        if (res) {
          this.setData({
            hasLogin: true
          })
          app.globalData.hasLogin = true
          return util.wxAuthorize('scope.userInfo')
        } else {
          throw 0
        }
      })
      .then(res => {
        if(res) return util.wxGetUserInfo()
        else{
          throw 0
        }
      })
      .then(res => {
        this.setData({
          userInfo: res.userInfo
        })
        console.log(res.userInfo)
      })
      .catch(res => {
        console.log("errrrr")
        console.log(res)
      })
  },

  /**
   * 自定义登陆函数
   */
  startLogin: function () {
    util.wxLogin()
      .then(code => {
        console.log('code:' + code)
        return util.wxRequest(loginUrl, code, 'POST')
      })
      .then(map => {
        console.log('openid: ' + map.data.msg)
        return util.wxSetStorage('openid', map.data.msg)
      })
      .then(()=>{
        this.setData({
          hasLogin: true
        })
        app.globalData.hasLogin = true
        return util.wxAuthorize('scope.userInfo')
      })
      .then(res => {
        if(res){
          return util.wxGetUserInfo()
        }else{
          throw 0
        }
      })
      .then(res => {
        this.setData({
          userInfo: res.userInfo
        })
        console.log(res.userInfo)
      })
      .catch(res => console.log(res))
  }
})