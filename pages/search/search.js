import { request } from "../../request/index.js";
Page({
  data: {
    goods: [],
    isFocus: false, // 删除按钮是否显示
    inpValue: ""
  },
  TimeId: -1,
  handleInput(e) {
    // 1.获取输入框的值
    const {value} = e.detail;
    // 2.检测合法性
    if(!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false
      }),
      clearTimeout(this.TimeId);
      // 值不合法
      return;
    };
    // 显示删除按钮
    this.setData({
      isFocus: true
    });
    // 3.准备发送请求获取数据
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(() => {
      this.qsearch(value);
    },1000)
    
  },
  // handleConfirm(){
  //   this.qsearch(value);
  // },
  // 发送请求获取搜索建议的数据
  async qsearch(query) {
    const goods = await request({url:"/goods/qsearch",data:{query}});
    this.setData({
      goods
    })
    
  },
  handleDelect() {
    this.setData({
      inpValue: "",
      isFocus: false,
      goods: []
    })
  },

  handleCancel() {
    wx.navigateBack({
      delta:1
    });
  }
})