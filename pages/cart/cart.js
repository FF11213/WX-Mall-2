import { getSetting, chooseAddress, openSetting, showToast, showModal } from "../../utils/asyncWx.js";
Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0,
    userName: ''
  },
  onShow() {
    // 获取登录信息
    const userinfo = wx.getStorageSync("userinfo");
    
    this.setData({
      userName: userinfo.nickName
    }) 
    // 获取缓存中收货地址信息
    const address = wx.getStorageSync("address");

    // 获取缓存中购物车的数据
    const cart = wx.getStorageSync("cart") || [];
    // 计算全选
    this.setCart(cart)
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

  // 商品的选中
  handleItemChange(e) {
    // 1.获取被修改的商品id
    const goods_id = e.currentTarget.dataset.id;
    // 2.获取购物车数组 
    let { cart } = this.data
    // 3.找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id);
    // 4.选中的对象状态取反
    cart[index].checked = !cart[index].checked;
    // 5. 6. 把购物车数据重新设置回 data和缓存中
    this.setCart(cart);
  },

  // 全选
  handleItemAllCheck(e) {
    // 1.获取 data中的数据
    let { cart, allChecked } = this.data;
    // 2.修改值
    allChecked = !allChecked;
    // 3.循环修改 cart
    cart.forEach(v => v.checked = allChecked);
    // 4.把购物车数据重新设置回 data和缓存中
    this.setCart(cart);
  },

  // 商品数量编辑
  handleItemNumEdit(e) {
    // 1.获取传递过来的参数
    const { operation, id } = e.currentTarget.dataset;
    // 2.获取购物车数组
    let { cart } = this.data;
    // 3.找到需要修改的商品的索引
    const index = cart.findIndex(v => v.goods_id === id);
    // 4.修改数量
    if (cart[index].num === 1 && operation === -1) {
      wx.showToast({
        title: '商品数量不能再减少了',
        duration: 1000,
        icon: 'none',
        mask: true,
      });
    } else {
      cart[index].num += operation
    }
    // 5.把购物车数据重新设置回 data和缓存中
    this.setCart(cart)

  },

  // 设置购物车状态同时 重新计算底部工具栏的数据 
  setCart(cart) {
    let allChecked = true;
    // 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.goods_price * v.num;
        totalNum += v.num;
      } else {
        allChecked = false
      }
    })
    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    });
    wx.setStorageSync("cart", cart);
  },


  // 左滑删除
  //   slideButtonTap(e) {
  //     console.log('slide button tap', e.detail)
  // },

  // 跳转登录
  goToLogin() {
    wx.navigateTo({
      url: "/pages/login/login"
    })
  },

  // 跳转购物
  goToCategory() {
    wx.switchTab({
      url: "/pages/category/category"
    })
  },

  // 结算
  async handlePay() {
    // 1.判断收货地址 
    const {address,totalNum} = this.data;
    if(!address.userName) {
      // await showToast({title:"您还没有选择收货地址"});
      await showModal();
      return ;
    }
    
    // 2. 跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/pay',
    });

  }

})