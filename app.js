var util = require('util/util')
App({

  /**
   * 全局数据
   */
  globalData:{
    hasLogin:false
  },

  /**
   * 数据初始化
   */
  onLaunch: function (options) {
    
    //判断有没有获取用户信息的权限
    util.wxGetSetting('scope.userInfo').then(r => {
      console.log('获取用户信息的权限为：'+r)
      if(!r){
        return util.wxShowModal('说明','我们需要您的用户头像和昵称来显示界面')
      }else{
        throw 0;//中止调用链
      }
    })
    .then(res => {
      if (res){
        console.log('你点击了好')
        return util.wxAuthorize('scope.userInfo')
      }
      else{
        console.log('你点击了不好')
        throw 0;//中止调用链
      } 
    })
    .then()
    .catch(res => {
      console.log(res)
    })
    //判断有没有获取用户信息的权限END

    
  }
})