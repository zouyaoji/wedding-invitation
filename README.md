<!--
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2020-12-12 16:15:26
 * @LastEditTime: 2023-09-26 17:44:51
 * @LastEditors: zouyaoji 370681295@qq.com
 * @Description:
 * @FilePath: \wedding-invitation\README.md
-->

# wedding-invitation

已更新为 uniapp + vue3 + ts + vite 技术栈。

> 微信小程序开发的电子请帖。从码云[wedding](https://gitee.com/roberthuang123/wedding)项目 Fork 而来，在此感谢原作者[roberthuang123](https://gitee.com/roberthuang123)贡献。我在此基础上修改了一些细节，具体如下：

- 增加留言板删除功能，指定某个 openid 可以删除。
- 修改 audio 标签为 innerAudioContext。
- 电话号码和视频都从数据库请求而来。
- 留言板出席电话简单隐藏。
- 修改我要出席逻辑，已经填过出席的再次填是修改之前填的。
- 增加 CSS 动画过渡效果。
- 改为 uniapp + vue3 + ts + vite 技术栈。
- 适配了微信小程序 “头像昵称填写” 能力。

## 体验

![小程序二维码](./ma.jpg)

## 开发步骤说明

### 前端

微信公众平台申请小程序，并进行相关开发配置。完成之后到 manifest.json 中填写你的微信小程序 appid。

```bash
pnpm install
pnpm dev:mp-weixin
```

### 后端

20230130 更新，因为微信云开发开始计费，放弃了云开发。用 Node + Koa + Typeorm(lowdb) 开发后端项目，部署到了自己的服务器上，后端代码提供以下两种方式：

- 自己有服务器的同学可以赞赏任意金额后留邮箱获取后端项目自己部署。
- 一次性赞助 288+，托管到我服务器上。提供运维接口，支持通过接口上传静态资源，获取和配置相关参数。赞赏后请联系我分配账号和接口地址。

## 赞赏

- 微信 / 支付宝

  <div style="display: flex">
    <img alt="wechat" title="wechat" src="https://zouyaoji.top/vue-cesium/images/wechat.png">
    <img alt="alipay" title="alipay" src="https://zouyaoji.top/vue-cesium/images/alipay.png">
  </div>

## 其他

其他问题请查看 uniapp 官方文档。

## 附：托管服务数据录入文档

录入数据都是需要鉴权的，但小程序读取数据不需要。

### 登录

用分配给您的账户登录，成功后拿到`accessToken`。

### 资源文件上传

上传照片、视频、音乐资源。上传完成之后返回上传文件列表拿各资源的url。后续可以通过“获取用户资源文件上传记录”接口获取上传记录。

### 添加邀请函的婚礼简要说明


```ts
{
    "heNumber": "18000000000", // 男生电话
    "sheNumber": "18100000000", // 女生电话
    "poster": "", // 视频的poster图片 url
    "background": "", // 背景图片url
    "videoUrl": "", // 视频url
    "adminOpenIds": [
      "" // 管理员id 可以删除不良评论
    ],
    "location": { // 酒店经纬度
      "longitude": 104.088684,
      "latitude": 30.7638
    },
    "info": { 
      "name": "Mr.Z & Miss.Q",
      "date": "谨定于 2019年10月01日 星期二",
      "time": "农历 九月初三 中午十一点半 举办婚礼",
      "hotel": "席设：顺庭龙庄中一厅",
      "detail": "地址：成都市新都区临河街与荣德路交叉口"
    }
}
```

### 添加静态资源地址

type 为 `photo-banner` 默认是 `甜蜜相册` 请求的图片。type 为 `index-banner` 默认是 `邀请函` 请求的图片。type 为 `music` 默认是背景音乐请求的图片。

```ts
{
    "records": [
        {
            "url": "",
            "type": "photo-banner"
        },
        {
            "url": "",
            "type": "photo-banner"
        },
        {
            "url": "",
            "type": "photo-banner"
        }
    ]
}
```


### 添加小程序秘钥

从微信公众号平台拿到小程序的 `AppId` 和 `AppSecret`。留言板获取微信用户的头像和昵称的 “头像昵称填写”功能需要。（承诺不外泄）
