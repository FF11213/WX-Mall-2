// pages/category/category.js
import { request } from "../../request/index";

Page({
  data: {
    leftMenuList: [],  // 左侧菜单数据
    rightContent: [],  // 右侧商品数据
    currentIndex: 0,  // 被点击的左侧菜单
    scrollTop: 0,  // 右侧商品滚动条到顶部的距离

  },
  Cates: [],
  onLoad: function (options) {
    // 缓存技术
    // 判断本地存储中是否有旧数据
    // { time：Data.now(), data:[...] }
    // 没有旧数据 直接发送新请求
    // 有旧数据 同时没有过期 就是用本地存储的旧数据

    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      // 不存在旧数据 发送请求
      this.getCates();
    } else {
      // 有旧数据据 定义过期时间
      if (Date.now() - Cates.time > 1000 * 60 * 2) {
        this.getCates();
      } else {
        // 可以使用旧数据
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent,
        })
      }
    }
  },

  // 获取分类数据
  async getCates() {
    // request({url: '/categories'})
    //   .then(result => {
    //     this.Cates = result;
    //     // 把接口数据存入本地存储中
    //     wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });

    //     // 构造左侧菜单数据 
    //     let leftMenuList = this.Cates.map(v => v.cat_name);
    //     // 构造右侧商品数据
    //     let rightContent = this.Cates[0].children;
    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //     })
    //   })

    // 使用ES7的 async await来发送异步请求
    const res = await request({ url: '/categories' })
    this.Cates = res;
    // 把接口数据存入本地存储中
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });

    // 构造左侧菜单数据 
    let leftMenuList = this.Cates.map(v => v.cat_name);
    // 构造右侧商品数据
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },

// 左侧菜单的点击事件
handleItemTap(e) {
  // 1. 获取点击标题身上的索引 index
  // 2. 给 data中的 currentIndex赋值
  // 3. 根据不同索引渲染右侧的商品内容
  const { index } = e.currentTarget.dataset;

  let rightContent = this.Cates[index].children;
  this.setData({
    currentIndex: index,
    rightContent,
    // 重新设置 scrollTop  
    scrollTop: 0
  })

}
})