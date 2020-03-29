import { request } from "../../request/index";
import { login } from '../../utils/asyncWx.js';

Page({
  async handleGetUserInfo(e) {
    // 1.获取用户信息
    const {encryptedData, rawData, iv, signature} = e.detail;
    // 2.获取小程序登录成功后的 code值
    const {code} = await login();
    const loginParams = {encryptedData, rawData, iv, signature, code}
    // 3.发送请求 获取用户的 token
    const res = await request({url:"/user/wxlogin",data:loginParams,method:"post"})
    // wx.setStorageSync("token", token);
    wx.navigateBack({
      delta: 1
    });
  }
})