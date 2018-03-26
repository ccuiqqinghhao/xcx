const loginUrl = require('config').loginUrl
const tokenValidUrl = require('config').tokenValidUrl
const updateUserInfo = require('config').updateUserInfo
var util = require('util/util.js')

App({
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登陆接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  /**
   * 登陆，如果没有信息就直接注册
   */
  login:function(){
    var that = this;
    //首先判断token是否过期
    //如果没过期，就不需要登陆
    //如果过期了，重新登陆，获取新的token
    if(!this.tokenValid()){
      util.wxLogin().then(res =>{
        console.log("第一步，获取code:"+res)
        return util.postRequest(loginUrl,res)
      }).
        then(res => {
          console.log("第二步，获取token:"+res.data.token)
          that.globalData.token = res.data.token
          console.log("第三步，更新用户信息")
          that.updateUserInfo()
        })
    }
    
   
  },
  tokenValid:function(){
    var that = this;
    if (that.globalData.token == null){
      console.log("当前token无效，需要登陆")
      return false;
    } 
    util.postRequest(tokenValidUrl, that.globalData.token).
      then(res => {
        console.log("token校验服务端返回"+res.data)
        if(res.data.msg == '有效'){
          console.log("当前token有效，无需登陆")
          return true;
        }else{
          console.log("当前token无效，需要登陆")
          return false;
        }
      })
  },
  /**
   * 向服务器更新用户信息
   */
  updateUserInfo:function(){
    var that = this;
    util.postRequest(updateUserInfo, { userInfo: that.globalData.userInfo, token: that.globalData.token})
    .then(res =>{
      console.log("更新用户信息成功")
    })

  },
  globalData: {
    userInfo: null,
    token:null
  }
})