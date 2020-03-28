import { request } from "../../request/index";

Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: []
  },
  // 接口参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: 1,

  onLoad: function (options) {
    // console.log(options.cid);
    this.QueryParams.cid = options.cid;
    this.getGoodsList()

  },

  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({ url: '/goods/search', data: this.QueryParams });
    // 获取总条数
    const total = res.total;
    // 计算总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    // console.log(this.totalPages);
    
    this.setData({
      goodsList: [...this.data.goodsList,...res.goods]
    });

    // 关闭下拉刷新
    wx.stopPullDownRefresh();
  },

  // 标题点击事件 从子组件传递
  handleTabsItemChange(e) {
    // 获取被点击的标题索引
    const { index } = e.detail;
    // 修改源数组
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    // 赋值到data中
    this.setData({
      tabs
    })
  },

  // 页面上拉触底事件的处理函数
  onReachBottom() {
    // 判断有无下一页数据
    if(this.QueryParams.pagenum >= this.totalPages) {
      // console.log('%c'+'没有下一页数据',"color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
      wx.showToast({
        title: '已经到最底部了！',
        icon: 'none',
        duration: 1500,
      });
    }else {
      // console.log('%c'+'有下一页数据',"color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  // 下拉刷新事件
  onPullDownRefresh() {
    // 重置数组
    this.setData({
      goodsList: []
    })
    // 重置页码
    this.QueryParams.pagenum = 1;
    // 重新发送请求
    this.getGoodsList();
  }


})