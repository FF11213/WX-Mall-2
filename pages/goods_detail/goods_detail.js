var app = getApp();
import { request } from "../../request/index";

Page({

  data: {
    goodsObj: {}
  },
  // 商品对象
  GoodsInfo: {},
  onLoad: function (options) {
    let modelmes = wx.getStorageSync('modelmes');
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
    console.log(isIphoneX);
    
    const { goods_id } = options
    // console.log(goods_id);
    this.getGoodsDetail(goods_id);
  },

  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({ url: "/goods/detail", data: { goods_id } });
    this.GoodsInfo = goodsObj
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // iphone部分手机 不识别 webp图片格式
        // goods_introduce: goodsObj.goods_introduce,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics,
      }
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

  }
})