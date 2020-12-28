// miniprogram/pages/member/edit/edit.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileID: '',
    cloudPath: '',
    imagePath: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const {
    //   fileID,
    //   cloudPath,
    //   imagePath,
    // } = app.globalData

    // this.setData({
    //   fileID,
    //   cloudPath,
    //   imagePath,
    // })

    // console.group('文件存储文档')
    // console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/storage.html')
    // console.groupEnd()
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

  },
  // 上传图片
  doUpload() {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: result => {
        wx.showLoading({
          title: '上传中',
        })

        const filePath = result.tempFilePaths[0]

        // 上传图片
        const cloudPath = `my-image${filePath.match(/\.[^.]+?$/)[0]}`
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)
            const { fileID } = res;
            this.setData({
              fileID,
              cloudPath,
              imagePath: filePath
            })

            // wx.navigateTo({
            //   url: '../storageConsole/storageConsole'
            // })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  previewImg(e) {
    console.log(e);
    const { src } = e.currentTarget.dataset;
    wx.previewImage({
      urls: [src],
    }, true)
  }
})