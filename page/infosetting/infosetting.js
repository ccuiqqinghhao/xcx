// page/infosetting/infosetting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dept:['信息工程系','机电工程系','旅游与酒店管理系','交通工程系','生物与化学工程系','国际商务系','经济管理系','技工教育教学部'],
    grade:['2015','2016','2017','2018','2019'],
    sex:[{value:'男',checked:'true'},{value:'女',checked:''}],
    indexdept:0,
    indexgrade:0,
    curDept:'',
    curGrade:'',
    curSex:''
  },
  bindPickerChangeDept: function(e){
    this.setData({
      curDept: this.data.dept[e.detail.value],
      indexdept: e.detail.value
    })
    //todo 
    
  },
  bindPickerChangeGrade: function(e){
    this.setData({
      curGrade: this.data.grade[e.detail.value],
      indexgrade:e.detail.value
     
    })
    //todo:更新用户信息
  },
  bindPickerChangeSex: function(e){
    this.setData({
      curSex: e.detail.value
    })
    console.log(this.data.curSex)
    //todo 更新服务器端数据
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})