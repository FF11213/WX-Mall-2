import { getSetting, chooseAddress, openSetting } from "../../utils/asyncWx.js";
Page({
  data: {
    address: {}
  },
  onShow() {
    // 获取缓存中收货地址信息
    const address = wx.getStorageSync("address");
    // 给 data赋值
    this.setData({
      address
    })
  },

  // 点击 收货地址
  async handleChooseAddress() {
    try {
      // 1.获取 权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      // 2.判断权限状态
      if (scopeAddress === false) {
        await openSetting();
      }
      // 3.调用获取收货地址的 api
      const address = await chooseAddress();
      // 4.存入到缓存中
      wx.setStorageSync("address", address);
    }
    catch (error) {
      console.log(error);
    }
  },
})