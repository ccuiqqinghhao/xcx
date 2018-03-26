const loginUrl = require('../config').loginUrl
const sendUserInfoUrl = require('../config').sendUserInfoUrl
/**
 * 登陆函数
 * 传入this
 * 如 login(this)
 */
function login(p){
  wx.getSetting({
    success: e => {
      if (!e.authSetting['scope.userInfo']) {
        wx.authorize({
          scope: 'scope.userInfo',
          success: r => {
            wx.login({
              success: e => {
                p.setData({
                  hasLogin: true,
                  code: e.code
                });
                wx.getUserInfo({
                  success: e => {
                    p.setData({
                      userInfo: e.userInfo
                    })
                  }
                });
                wx.request({
                  url: loginUrl,
                  method: 'POST',
                  data: e.code,
                  success: res => {
                    wx.setStorage({
                      key: 'openid',
                      data: res.data.msg,
                    })
                  }
                })
              }
            })
          },
          fail: e => {
            wx.showModal({
              title: '登陆失败',
              content: '无法获取权限'
            })
            p.setData({
              show_auth: true
            })
          }
        })
      } else {
        wx.login({
          success: e => {
            p.setData({
              hasLogin: true,
              code: e.code
            });
            wx.getUserInfo({
              success: e => {
                p.setData({
                  userInfo: e.userInfo
                })
              }
            });
            wx.request({
              url: loginUrl,
              method: 'POST',
              data: e.code,
              success: res => {
                wx.setStorage({
                  key: 'openid',
                  data: res.data.msg,
                })
              }
            })
          }
        })
      }
    }
  })
}

/**
 * 发送用户数据
 *  如 sendUserInfo(this)
 */
function sendUserInfo(p,id){
  wx.request({
    url: sendUserInfoUrl,
    method:"POST",
    data:{
      openid:id,
      userInfo:p.data.userInfo
    }
  })
}

module.exports = {
  login: login,
  sendUserInfo: sendUserInfo
}