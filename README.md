<!--
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2020-12-12 16:15:26
 * @LastEditTime: 2022-04-14 14:53:28
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation-github\README.md
-->

# wedding-invitation

目前已更新为 uniapp + vue3 + ts + vite 技术栈。Mpvue vue2 版本请看另外一个分支。

> 微信小程序开发的电子请帖。从码云[wedding](https://gitee.com/roberthuang123/wedding)项目 Fork 而来，感谢原作者[roberthuang123](https://gitee.com/roberthuang123)贡献分享。我在此基础上修改了一些细节，具体如下：

- 增加留言板删除功能，指定某个 openid 可以删除。
- 修改 audio 标签为 innerAudioContext。
- 电话号码和视频都存云数据库请求而来。
- 留言板出席电话简单隐藏。
- 修改我要出席逻辑，已经填过出席的再次填是修改之前填的。
- 增加 CSS 动画效果。
- 改为 uniapp + vue3 + ts + vite 技术栈。

以上贡献出来，希望帮助有缘人^\_^

## 体验

![小程序二维码](./ma.jpg)

## 说明

大家不要直接跑本项目，需要开通云开发，现做简要说明，不懂可以发邮件问我。

1. 用你喜欢的 ide 打开项目。将 `manifest.json` 中 `mp-weixin` 节点的 `appid` 改为你的小程序 id。
2. `.env` 中用 `VITE_VUE_WECHAT_ENV` 赋值云开发环境。
3. 运行 `pnpm dev:mp-weixin` 成功后， 微信开发者工具导入项目 `/dist/mp-weixin`。
4. 开通云开发，设置环境名称，选 支持按量付费中 `基础版 1`，免费的，基本够用了。

5. 云开发控制台云函数中上传并部署云函数。

- 微信开发者工具中找到 static/functions 目录。
- functions 上右键指定当前环境，然后同步云函数列表。
- functions 中每个文件夹上右键选择 `上传并部署`

![云函数](./云函数.png)

6. 把你要用到的音乐、图片、视频资源放到 `/data/存储/`下面的文件夹中。

7. 云开发控制台存储中上传这些文件夹。

![存储](./存储.png)

8. 云开发控制台数据库中新建集合 `banner`, `common`, `indexBanner`, `message`, `music`,`present`,`user`。**注意**集合的数据权限要设置为`所有用户可读，仅创建者可读写`。

9. 编辑 `/data/数据库/` 中 `banner`(首页轮播图), `common`(位置、电话等配置), `indexBanner`(第二页轮播图), `music`(背景音乐路径) 指示的路径，url 改成你想要展示的，具体从存储里面读取。

10. 将`/data/数据库/`中的 json 文件对应导入到步骤 8 建的集合中。

![数据库](./数据库.png)

最后预览

![预览](./预览.png)

上手前可以先熟悉云开发文档结合原作者的掘金文章[项目讲解](https://juejin.im/post/5c341e1d6fb9a049f66c4876)一起使用。

## 其他

其他问题请查看 uniapp 官方文档。
