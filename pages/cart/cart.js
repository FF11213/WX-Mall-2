import { getSetting, chooseAddress, openSetting } from "../../utils/asyncWx.js";
Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow(){
    // 获取缓存中收货地址信息
    const address = wx.getStorageSync("address");
    // 获取缓存中购物车的数据
    const cart = wx.getStorageSync("cart")||[];
    // 计算全选
    // const allChecked = cart.length?cart.every(v => v.checked):false;
    let allChecked = true;
    // 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if(v.checked){
        totalPrice += v.goods_price * v.num;
        totalNum += v.num;
      }else{
        allChecked = false
      }
    })
    // 判断数组是否为空
    allChecked = cart.length!=0?allChecked:false;

    // 给 data赋值
    this.setData({
      address,
      cart,
      allChecked,
      totalPrice,
      totalNum
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
  }
})