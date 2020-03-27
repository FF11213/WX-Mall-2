// 引入 request方法
import { request } from "../../request/index";

Page({
  data: {
    swiperList: [],  // 轮播图数组
    cateList: [],  // 导航栏数组
    floorList: [],  // 楼层数组
  },
  // 页面开始加载 触发
  onLoad: function (options) {
    // 发送异步请求 获取轮播图数据
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   },
    // });

    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },

  // 获取轮播图数据
  getSwiperList() {
    request({ url: '/home/swiperdata' })
      .then(result => {
        this.setData({
          swiperList: result
        })
      })
  },
  // 获取分类导航栏数据
  getCateList() {
    request({ url: '/home/catitems' })
      .then(result => {
        this.setData({
          cateList: result
        })
      })
  },
  // 获取分类导航栏数据
  getFloorList() {
    request({ url: '/home/floordata'})
      .then(result => {
        this.setData({
          floorList: result
        })
      })
  }
});