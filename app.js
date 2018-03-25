const loginUrl = require('config').loginUrl
const tokenValidUrl = require('config').tokenValidUrl
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
    var token = that.globalData.token;
    //验证token
    if(this.tokenValid()){
      return;
    }
    wx.login({
      success:data =>{
        console.log("code为："+data.code);
        wx.request({
          url: loginUrl,
          data:
            data.code
          ,
          method:'POST',
          success:mydata =>{
            if(mydata.data.msg == '登陆'){
              console.log(mydata.data.token)
              that.globalData.token = mydata.data.token;
            }
          }
        })
      }
    })
  },
  tokenValid:function(){
    var that = this;
    if (that.globalData.token == null) return false;
    wx.request({
      url: tokenValidUrl,
      data: that.globalData.token,
      method:'POST',
      success:data =>{
        if(data.data.msg=='有效'){
          return true;
        }else{
          return false;
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    token:null
  }
})