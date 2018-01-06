/**
 * 配置文件
 */

var host = '127.0.0.1:8080'

var config = {
  host,
  //登陆地址
  loginUrl: `http://${host}/login`,
  //上传用户信息地址
  sendUserInfoUrl: `http://${host}/sendUserInfo`
};
module.exports = config