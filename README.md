# wedding-invitation

> Mpvue+微信小程序开发的电子请帖。从码云[wedding](https://gitee.com/roberthuang123/wedding)项目 Fork 而来，感谢原作者[roberthuang123](https://gitee.com/roberthuang123)贡献分享。我在此基础上修改了一些细节，具体如下：

* 增加留言板删除功能，指定某个 openid 可以删除。
* 修改 audio 标签为 innerAudioContext。
* 电话号码和视频都存云数据库请求而来。
* 留言板出席电话简单隐藏。
* 修改我要出席逻辑，已经填过出席的再次填是修改之前填的。
* 增加 CSS 动画效果。

以上贡献出来，希望帮助有缘人^\_^

## 体验

![小程序二维码](./ma.jpg)

## 说明

大家不要直接跑本项目，需要开通云开发，需要建立集合，上手前记得先熟悉云开发文档结合原作者的掘金文章[项目讲解](https://juejin.im/post/5c341e1d6fb9a049f66c4876)一起使用。

## Build Setup

```bash
# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
