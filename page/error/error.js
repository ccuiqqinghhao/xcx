// page/error.js
var util = require('../../util/util')
Page({
getAuth:function(){
  util.wxAuthorize('scope.userInfo')
  .then(r =>{
    console.log(r)
    
    return util.wxOpenSetting();
    
  }).then(res =>{
    console.log(res);
    if (res.authSetting['scope.userInfo']){
      console.log("授权成功")
    }else{
      console.log("授权失败")
    }
  });
  
}
})