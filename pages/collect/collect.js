// pages/collect/collect.js
Page({
  data: {
    collect: []
  },
  onShow() {
    const collect = wx.getStorageSync("collect")||[];
    this.setData({
      collect
    });
  },

  // 
  goToCategory() {
    wx.switchTab({
      url: "/pages/category/category"
    })
  },
})