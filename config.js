/**
 * 配置文件
 */

var host = 'wx.abble.cn'

var config = {
  host,
  //登陆地址
  loginUrl: `http://${host}/login`,
  //上传用户信息地址
  sendUserInfoUrl: `http://${host}/sendUserInfo`
};
module.exports = config