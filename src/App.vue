<!--
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-04-12 21:49:06
 * @LastEditTime: 2022-04-14 13:19:28
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation\src\App.vue
-->
<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { getCurrentInstance, onMounted } from 'vue'

onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
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
