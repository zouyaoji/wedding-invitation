<!--
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2020-12-12 16:15:26
 * @LastEditTime: 2023-01-30 15:11:43
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation-github\README.md
-->

# wedding-invitation

目前已更新为 uniapp + vue3 + ts + vite 技术栈。

> 微信小程序开发的电子请帖。从码云[wedding](https://gitee.com/roberthuang123/wedding)项目 Fork 而来，感谢原作者[roberthuang123](https://gitee.com/roberthuang123)贡献分享。我在此基础上修改了一些细节，具体如下：

- 增加留言板删除功能，指定某个 openid 可以删除。
- 修改 audio 标签为 innerAudioContext。
- 电话号码和视频都存云数据库请求而来。
- 留言板出席电话简单隐藏。
- 修改我要出席逻辑，已经填过出席的再次填是修改之前填的。
- 增加 CSS 动画效果。
- 改为 uniapp + vue3 + ts + vite 技术栈。
- 适配了微信小程序 “头像昵称填写” 能力。

## 体验

![小程序二维码](./ma.jpg)

## 说明

20230130 更新，因为微信云开发开始计费，放弃了云开发。用 Node + Koa 开发后端项目，部署到了自己的服务器上，后端代码提供以下两种方式：

- 自己有服务器的同学可以赞赏任意金额后留邮箱获取后端项目自己部署。
- 一次性托管赞助 288+，托管到我服务器上。

## 赞赏

- 微信 / 支付宝

  <div style="display: flex">
    <img alt="wechat" title="wechat" src="https://zouyaoji.top/vue-cesium/images/wechat.png">
    <img alt="alipay" title="alipay" src="https://zouyaoji.top/vue-cesium/images/alipay.png">
  </div>

## 其他

其他问题请查看 uniapp 官方文档。
