<!--
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-04-12 21:49:06
 * @LastEditTime: 2022-04-14 12:08:36
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation\src\pages\index\index.vue
-->
<template>
  <div class="index">
    <image class="bg-image" :src="background" />
    <div class="bg-swiper">
      <index-swiper :list="list" :info="info" :autoplay="autoplay"></index-swiper>
    </div>
    <div class="bg_music" v-if="isPlaying" @tap="audioPlay">
      <image src="../../static/images/music_icon.png" class="musicImg music_icon" />
      <image src="../../static/images/music_play.png" class="music_play pauseImg" />
    </div>
    <div class="bg_music" v-else @tap="audioPlay">
      <image src="../../static/images/music_icon.png" class="musicImg" />
      <image src="../../static/images/music_play.png" class="music_play playImg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import IndexSwiper from '@src/component/index-swiper.vue'
import { onHide, onLoad, onShareAppMessage, onShow, onUnload } from '@dcloudio/uni-app'
import { GlobalData } from '@src/types'
import { showToast } from '@src/utils'

const isPlaying = ref(false)
const list = ref([])
const info = ref({})
const autoplay = ref(false)

const instance = getCurrentInstance()
const globalData: GlobalData = instance.appContext.config.globalProperties.globalData
const innerAudioContext = globalData.innerAudioContext
const background = ref('')

onLoad(() => {
  innerAudioContext.onEnded(onEnded)
  innerAudioContext.onPlay(onPlay)
  innerAudioContext.onPause(onPause)

  const db = wx.cloud.database()
  const common = db.collection('common')
  common.get().then(res => {
    background.value = res.data[0].background
    info.value = res.data[0].info
  })

  getBannerList()
})

onShow(() => {
  autoplay.value = true
})

onHide(() => {
  autoplay.value = false
})

const audioPlay = () => {
  if (innerAudioContext.paused) {
    innerAudioContext.play()
    showToast('背景音乐已开启~')
  } else {
    innerAudioContext.pause()
    showToast('您已暂停音乐播放~')
  }
}
const onPlay = () => {
  isPlaying.value = true
}
const onPause = () => {
  isPlaying.value = false
}
const onEnded = () => {
  if (globalData.musicIndex >= globalData.musicList.length) {
    globalData.musicIndex = 0
  }
  globalData.innerAudioContext.src = globalData.musicList[globalData.musicIndex].musicUrl
  globalData.musicIndex += 1
}

const getBannerList = () => {
  const db = wx.cloud.database()
  const banner = db.collection('banner')
  banner.get().then(res => {
    let result = []
    let animations = ['fadeInLeft', 'slideInDown', 'rotateInDownRight', 'rollIn', 'jackInTheBox', 'flip']
    for (let i = 0; i < res.data[0].bannerList.length; i++) {
      result.push({
        url: res.data[0].bannerList[i],
        show: i === 0,
        class: animations[i]
      })
    }
    list.value = result
  })
}

onShareAppMessage(() => {
  return {
    path: '/pages/index/index'
  }
})
</script>

<style lang="scss">
@-webkit-keyframes musicRotate {
  from {
    -webkit-transformb: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-moz-keyframes musicRotate {
  from {
    -webkit-transformb: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-ms-keyframes musicRotate {
  from {
    -webkit-transformb: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-o-keyframes musicRotate {
  from {
    -webkit-transformb: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes musicRotate {
  from {
    -webkit-transformb: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes musicStop {
  from {
    -webkit-transform: rotate(20deg);
  }
  to {
    -webkit-transform: rotate(0deg);
  }
}
@-moz-keyframes musicStop {
  from {
    -webkit-transform: rotate(20deg);
  }
  to {
    -webkit-transform: rotate(0deg);
  }
}
@-ms-keyframes musicStop {
  from {
    -webkit-transform: rotate(20deg);
  }
  to {
    -webkit-transform: rotate(0deg);
  }
}
@-o-keyframes musicStop {
  from {
    -webkit-transform: rotate(20deg);
  }
  to {
    -webkit-transform: rotate(0deg);
  }
}
@keyframes musicStop {
  from {
    -webkit-transform: rotate(20deg);
  }
  to {
    -webkit-transform: rotate(0deg);
  }
}
@-webkit-keyframes musicStart {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(20deg);
  }
}
@-moz-keyframes musicStart {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(20deg);
  }
}
@-ms-keyframes musicStart {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(20deg);
  }
}
@-o-keyframes musicStart {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(20deg);
  }
}
@keyframes musicStart {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(20deg);
  }
}
@-webkit-keyframes infoAnimation {
  0% {
    -webkit-transform: scale(1) translate(0, 0);
  }
  50% {
    -webkit-transform: scale(0.9) translate(5px, 5px);
  }
  100% {
    -webkit-transform: scale(1) translate(0, 0);
  }
}
@-moz-keyframes infoAnimation {
  0% {
    -webkit-transform: scale(1) translate(0, 0);
  }
  50% {
    -webkit-transform: scale(0.9) translate(5px, 5px);
  }
  100% {
    -webkit-transform: scale(1) translate(0, 0);
  }
}
@-ms-keyframes infoAnimation {
  0% {
    -webkit-transform: scale(1) translate(0, 0);
  }
  50% {
    -webkit-transform: scale(0.9) translate(5px, 5px);
  }
  100% {
    -webkit-transform: scale(1) translate(0, 0);
  }
}
@-o-keyframes infoAnimation {
  0% {
    -webkit-transform: scale(1) translate(0, 0);
  }
  50% {
    -webkit-transform: scale(0.9) translate(5px, 5px);
  }
  100% {
    -webkit-transform: scale(1) translate(0, 0);
  }
}
@keyframes infoAnimation {
  0% {
    -webkit-transform: scale(1) translate(0, 0);
  }
  50% {
    -webkit-transform: scale(0.9) translate(5px, 5px);
  }
  100% {
    -webkit-transform: scale(1) translate(0, 0);
  }
}
.index {
  height: 100%;
  position: relative;
  .img {
    width: 100%;
    height: 100%;
  }
  .bg-swiper {
    width: 100%;
    height: 100%;
  }
  .inv {
    position: absolute;
    top: 20rpx;
    left: 89rpx;
    width: 572rpx;
    height: 69rpx;
    z-index: 9;
  }
  .bg_music {
    position: fixed;
    right: 10rpx;
    top: 100rpx;
    width: 100rpx;
    z-index: 99;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    .musicImg {
      width: 60rpx;
      height: 60rpx;
    }
    .music_icon {
      animation: musicRotate 3s linear infinite;
    }
    .music_play {
      width: 28rpx;
      height: 60rpx;
      margin-left: -10rpx;
      transform-origin: top;
      -webkit-transform: rotate(20deg);
    }
    .playImg {
      animation: musicStop 1s linear forwards;
    }
    .pauseImg {
      animation: musicStart 1s linear forwards;
    }
  }
}
</style>
