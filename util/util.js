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
 * 将数据存储到本地
 */
function wxSetStorage(ke, dat) {
  return new Promise((r, re) => {
    console.log(ke+"  "+dat)
    wx.setStorage({
      key: ke,
      data: dat,
      success:r()
    })
  })
}

/**
 * 从本地缓存中获取数据
 */
function wxGetStorage(key) {
  return new Promise((r, re) => {
    wx.getStorage({
      key: key,
      success: res => {
        r(res.data)
      },
      fail: re(new Error("读取本地数据出错，key：" + key))
    })
  })
}

/**
 * 检查登陆状态
 */
function wxCheckSession() {
  return new Promise((r, re) => {
    wx.checkSession({
      success: r(true),
      fail: r(false)
    })
  })
}

/**
 * 获取授权，不管以前给没给权限都可以调用
 * 调用之后只要用户同意就有权限
 * 传入要获取的权限
 */

//      范围                  对应接口                                             描述
// scope.userInfo	         wx.getUserInfo	                                      用户信息
// scope.userLocation	     wx.getLocation, wx.chooseLocation	                  地理位置
// scope.address	         wx.chooseAddress	                                    通讯地址
// scope.invoiceTitle	     wx.chooseInvoiceTitle	                              发票抬头
// scope.werun	           wx.getWeRunData	                                    微信运动步数
// scope.record	           wx.startRecord	                                      录音功能
// scope.writePhotosAlbum	 wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum	保存到相册
// scope.camera		                                                              摄像头

function wxAuthorize(auth) {
  return new Promise((r, re) => {
    wx.authorize({
      scope: auth,
      success: r(true),
      fail: r(false)
    })
  })
}

/**
 * 判断本次存储中有没有这个key
 */
function hasKey(key) {
  return new Promise((r, re) => {
    wx.getStorage({
      key: key,
      success: res =>{
        //console.log("数据是"+res.data)
        if(res.data.length == 0){
          r(false)
        }else{
          r(true)
        }
      }
      //fail: r(false)
    })
  })
}

/**
 * 判断有没有需要的权限
 */
function wxGetSetting(auth) {
  return new Promise((r, re) => {
    wx.getSetting({
      success(res){
        if(!res.authSetting[auth]){
          r(false)
        }else{
          r(true)
        }
      }
    })
  })
}

/**
 * 弹出模态窗口
 */
function wxShowModal(title, content) {
  return new Promise((r, re) => {
    wx.showModal({
      title: title,
      content: content,
      cancelText: '不好',
      confirmText: '好',
      success: (con) => {
        if (con.confirm) {
          r(true)
        } else {
          r(false)
        }
      }
    })
  })
}

/**
 * 发起网络请求
 */
function wxRequest(url,data,method){
  return new Promise((r,re) => {
    wx.request({
      url: url,
      data:data,
      method:method,
      success:res => r(res)
      //fail:re(new Error('发起网络请求失败，url:'+url))
    })
  })
}

/**
 * 获取用户信息
 */
function wxGetUserInfo(){
  return new Promise((r,re) => {
    wx.getUserInfo({
      success:res => r(res),
      //fail:re(new Error('获取用户信息出错'))
    })
  })
}

/**
 * 重新获取用户授权
 */
function wxOpenSetting(){
  return new Promise((r,re) => {
    wx.openSetting({
      success:res => r(res)
    })
  })
}

/**
 * 跳转页面
 */
function wxRedirectTo(url){
  return new Promise((r,re) =>{
    wx.redirectTo({
      url: url,
      success:r(true),
      fail:r(false)
    })
  })
}


module.exports = {
  wxLogin: wxLogin,
  wxSetStorage: wxSetStorage,
  wxGetStorage: wxGetStorage,
  wxCheckSession: wxCheckSession,
  wxAuthorize: wxAuthorize,
  hasKey: hasKey,
  wxGetSetting: wxGetSetting,
  wxShowModal: wxShowModal,
  wxRequest: wxRequest,
  wxGetUserInfo: wxGetUserInfo,
  wxOpenSetting: wxOpenSetting,
  wxRedirectTo: wxRedirectTo
}