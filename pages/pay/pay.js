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
  }
})