var Promise = require('../lib/es6-promise.min.js')

/**
 * 微信API异步流程处理工具
 * 对于有多种结果的api，回调OK代表成功，FAIL代表失败
 * 如wx.authorize
 * 2018/1/6
 */

/**
 * 微信登陆
 */
function wxLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        resolve(res.code)//返回code，5分钟有效期
      },
      fail: res => {
        reject(new Error("登陆出错"))
      }
    })
  })
}

/**
 * post请求
 */
function postRequest(url,data){
  return new Promise((resolve,reject) => {
    wx.request({
      url: url,
      data:data,
      method:'POST',
      success:res =>{
        resolve(res)
      }
    })
  })
}
module.exports = {
  wxLogin: wxLogin,
  postRequest: postRequest
}