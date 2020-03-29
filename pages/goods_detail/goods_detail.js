var app = getApp();
import { request } from "../../request/index";

Page({

  data: {
    goodsObj: {},
    isCollect: false // 商品是否被收藏
  },
  // 商品对象
  GoodsInfo: {},

  onShow: function () {
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length-1];
    let options = currentPage.options;
    
    // 判断是否为 iPhoneX以上机型
    let modelmes = wx.getStorageSync('modelmes');
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
    // console.log(isIphoneX);
    
    const { goods_id } = options
    // console.log(goods_id);
    this.getGoodsDetail(goods_id);


  },

  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({ url: "/goods/detail", data: { goods_id } });
    this.GoodsInfo = goodsObj

    // 判断收藏
    // 1.获取缓存中商品收藏的数组
    let collect = wx.getStorageSync("collect")||[];
    // 2.判断当前商品是否被收藏了
    let isCollect = collect.some(v => v.goods_id===this.GoodsInfo.goods_id);
    
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // iphone部分手机 不识别 webp图片格式
        // goods_introduce: goodsObj.goods_introduce,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics,
      },
      isCollect
    })

  },

  // 点击轮播图浏览大图
  handlePrevewImage(e) {
    // 先构造要预览图片的数组
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    // 接受传递过来的图片 url
    const currentUrl = e.currentTarget.dataset.url
    wx.previewImage({
      current: currentUrl,
      urls: urls,
    });
  },

  // 加入购物车
  handleCartAdd() {
    // 1.先绑定点击事件
    // 2.获取缓存中的鹅购物车数据 数组格式
    // 3.先判断 当前商品是否存在于购物车中
    // 4.已经存在 修改商品数量
    // 5.不存在 直接给购物车数组添加一个新元素
    // 6.弹出提示
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    if (index === -1) {
      // 不存在 第一次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
      wx.showToast({
        title: '加入成功',
        icon: 'success',
        mask: true,
      });

    } else {
      // 已经存在购物车中 num++
      cart[index].num++;
      wx.showToast({
        title: '商品数量+1',
        icon: 'success',
        mask: true,
      });
    }
    wx.setStorageSync("cart", cart);

  },

  // 加入收藏
  handleCollect() {
    let isCollect = false;
    // 1.获取缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect")||[];
    // 2.判断该商品是否被收藏过
    let index = collect.findIndex(v => v.goods_id===this.GoodsInfo.goods_id);
    // 3.当 index不等于 -1 表示已经收藏过
    if(index !== -1) {
      // 能找到 已经收藏过 从数组中删除
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true,
      });
    }else {
      // 没有收藏过 添加进数组中
      collect.push(this.GoodsInfo);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true,
      });
    }
    // 4.把数组重新存入到缓存中
    wx.setStorageSync("collect", collect);
    // 5.修改 data中的属性
    this.setData({
      isCollect
    })

  }
})