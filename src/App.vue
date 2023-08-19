<!--
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-04-12 21:49:06
 * @LastEditTime: 2023-08-20 00:48:17
 * @LastEditors: zouyaoji 370681295@qq.com
 * @Description:
 * @FilePath: \wedding-invitation\src\App.vue
-->
<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { getCurrentInstance, onMounted } from 'vue'
import { code2Session, getUserByOpenId } from './api/wedding-invitation'

onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})

uni.login({
  provider: 'weixin',
  success: res => {
    code2Session(res.code).then(res => {
      const openId = res.data.openid
      instance.appContext.config.globalProperties.$MpUserData = {
        openId
      }

      getUserByOpenId(openId).then(res => {
        if (res?.data?.length > 0) {
          instance.appContext.config.globalProperties.$MpUserData = {
            openId,
            ...res.data[0]
          }
        }
      })
    })
  },
  fail: err => {
    console.log('login fail:', err)
  }
})

const instance = getCurrentInstance()
uni.getSystemInfo({
  success: function (e) {
    instance.appContext.config.globalProperties.$StatusBar = e.statusBarHeight
    if (e.platform === 'android') {
      instance.appContext.config.globalProperties.$CustomBar = e.statusBarHeight! + 50
    } else {
      instance.appContext.config.globalProperties.$CustomBar = e.statusBarHeight! + 45
    }

    // #ifdef MP-WEIXIN
    instance.appContext.config.globalProperties.$StatusBar = e.statusBarHeight
    const custom = uni.getMenuButtonBoundingClientRect()
    instance.appContext.config.globalProperties.$Custom = custom
    instance.appContext.config.globalProperties.$CustomBar = custom.bottom + custom.top - e.statusBarHeight!
    // #endif

    // #ifdef MP-ALIPAY
    instance.appContext.config.globalProperties.$StatusBar = e.statusBarHeight
    instance.appContext.config.globalProperties.$CustomBar = e.statusBarHeight! + e.titleBarHeight!
    // #endif
  },
  fail: function (e) {
    console.log(e)
  }
})
</script>
<style lang="scss">
@import 'common/colorui/main.css';
@import 'common/colorui/icon.css';
@import 'common/colorui/animation.css';

page {
  height: 100%;
}
image {
  display: block;
}
.animate-ele-warp {
  width: 100%;
  height: 100%;
  transform-origin: center top;
  position: absolute;
  z-index: 3;
  transform: translate3d(0px, 0px, 3px);
  pointer-events: none;
  .animate-ele {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 20rpx;
    top: 20rpx;
    z-index: 3;
    pointer-events: none;
    .animate-img {
      position: absolute;
    }
  }
}
.bg-image {
  position: fixed;
  width: 100%;
  height: 100%;
}
</style>
