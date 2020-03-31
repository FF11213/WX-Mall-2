export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => { }
    });
  })
}

export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => { }
    });
  })
}

export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => { }
    });
  })
}

export const showToast = ({ title }) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: '提示',
      icon: "none",
      title: title,
      duration: 1000,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  })
}

export const showModal = ({content}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: "提示",
      content: content,
      confirmColor: '#eb4450',
      success :(res) => {
        resolve(res);
      },
      fail:(err) => {
        reject(err);
      }
    });
  })
}


export const showModalRemove = () => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title:'提示', 
      content: "是否将商品移出购物车",
      confirmColor: '#eb4450',
      success :(res) => {
        resolve(res);
      },
      fail:(err) => {
        reject(err);
      }
    });
  })
}


export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
    });
  })
}

