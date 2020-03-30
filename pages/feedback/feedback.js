
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: "用户体验",
        isActive: true
      },
      {
        id: 1,
        value: "商品投诉",
        isActive: false
      }
    ],
    chooseImgs: [], // 被选中的图片路径数组
    textVal: "" // 文本域的内容
  },

  // 外网的图片路径数组
  UpLoadImgs: [],

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

  // 上传图片
  handleChooseImg() {
    // 调用小程序内置 api
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        // console.log(result);
        this.setData({
          // 要将数组进行拼接
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    });
  },

  // 移除图片
  handleRemoveImg(e) {
    // 1. 获取被点击图片的索引
    const { index } = e.currentTarget.dataset;
    // console.log(index);
    // 2.获取 data中的图片数组
    let { chooseImgs } = this.data;
    // 3.删除元素
    chooseImgs.splice(index, 1)
    this.setData({
      chooseImgs
    })
  },

  // 文本域内容
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },

  // 提交
  handleFormSubmit() {
    const { textVal, chooseImgs } = this.data;
    if (!textVal.trim()) {
      wx.showToast({
        title: '请先输入',
        icon: 'none',
        mask: true,
      });
      return;
    }
    wx.showLoading({
      title: "正在上传中",
      mask: true,
    });
    setTimeout(() => {
      wx.hideLoading();
    }, 2000);
    // 重置页面
    setTimeout(() => {
      this.setData({
        textVal: "",
        chooseImgs: []
      })
    }, 2200);
    
    // setTimeout(() => {
    //   wx.navigateBack({
    //     delta: 1
    //   });
    // }, 500);
    
    // 准备上传图片 到专门的图片服务器
    // 上传文件的 api不支持多个文件同时上传 遍历数组上传 
    // chooseImgs.forEach((v, i) => {
    //   wx.uploadFile({
    //     // 图片要上传到哪里
    //     url: 'https://sm.ms/api/v2/upload',
    //     // 被上传文件的路径
    //     filePath: v,
    //     // 上传文件的名称 后台用来获取文件
    //     name: 'smfile',
    //     // 顺带的文本
    //     formData: {},
    //     success: (result) => {
    //       console.log(result);
    //       let url = JSON.parse (result.data).url;
    //       this.UpLoadImgs.push(url);
    //       if(i===chooseImgs.length-1) { 
    //         console.log("把文本内容和外网的图片数组 提交到后台中")
    //         // 提交都成功了
    //         // 重置页面
    //         this.setData({
    //           textVal: "",
    //           chooseImgs: []
    //         })
    //         wx.navigationBack({
    //           delta: 1
    //         })
    //       }
    //     },
    //   });
    // })
  }
})
