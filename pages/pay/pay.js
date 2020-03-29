var app = getApp();
import { getSetting, chooseAddress, openSetting, showToast } from "../../utils/asyncWx.js";
Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
  },
  onShow() {
    // 获取缓存中收货地址信息
    const address = wx.getStorageSync("address");
    // 获取缓存中购物车的数据
    let cart = wx.getStorageSync("cart") || [];
    // 过滤后的购物车数组
    cart = cart.filter(v => v.checked);

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.goods_price * v.num;
      totalNum += v.num;
    })

    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });

    // 判断是否为 iPhoneX以上机型
    let modelmes = wx.getStorageSync('modelmes');
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
  },

  // 点击支付
  handleOrderPay() {
    // 1.判断缓存中有没有token
    //   const token = wx.getStorageSync("token");
    //   if(!token) {
    //     wx.navigateTo({
    //       url: '/pages/auth/auth',
    //     });
    //     return ;
    //   }
    //   console.log("存在token");
    wx.showToast({
      title: '支付成功！',
      icon: 'none',
      image: '',
      duration: 2000,
      mask: true,
    });
    // 过滤支付完成的商品
    let newCart = wx.getStorageSync("cart");
    newCart = newCart.filter(v => !v.checked);
    wx.setStorageSync("cart", newCart);
    setTimeout(() => {
      wx.navigateBack({
        delta: 1
      });
    }, 2500);
  }
})