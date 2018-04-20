/**
 * 配置文件
 */

var host = '127.0.0.1:8080'

var config = {
  host,
  //登陆地址
  loginUrl: `http://${host}/wx/login`,
  //上传用户信息地址
  sendUserInfoUrl: `http://${host}/sendUserInfo`,
  //验证token是否有效
  tokenValidUrl: `http://${host}/wx/tokenValid`,
  //更新用户信息
  updateUserInfo: `http://${host}/wx/updateUserInfo`,
  //获取商品分类
  getCategorieUrl: `http://${host}/wx/getCategorie`
};
module.exports = config