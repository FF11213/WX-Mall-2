// pages/category/category.js
import { request } from "../../request/index";

Page({
  data: {
    leftMenuList: [],  // 左侧菜单数据
    rightContent: [],  // 右侧商品数据
    currentIndex: 0,  // 被点击的左侧菜单
  },
  Cates: [],
  onLoad: function (options) {
    this.getCates();
  },

  // 获取分类数据
  getCates() {
    request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories'})
      .then(result => {   
        this.Cates = result.data.message;
        
        // 构造左侧菜单数据 
        let leftMenuList = this.Cates.map(v => v.cat_name);
        // 构造右侧商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      })
  },

  // 左侧菜单的点击事件
  handleItemTap(e) {
    // 1. 获取点击标题身上的索引 index
    // 2. 给 data中的 currentIndex赋值
    // 3. 根据不同索引渲染右侧的商品内容
    const {index} = e.currentTarget.dataset;

    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent
    })
    
  }
})