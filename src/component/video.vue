<template>
  <div class="section">
    <video
      id="myVideo"
      class="myVideo"
      style="cursor: pointer"
      :src="url"
      @play="play"
      @ended="ended"
      :danmu-list="danmuList"
      enable-danmu
      danmu-btn
      controls
      :poster="poster"
    ></video>
    <div class="btn-area">
      <input
        class="danmuInput"
        @blur="bindInputBlur"
        placeholder="请输入临时弹幕，真实弹幕来自留言"
        placeholder-style="color:#bbb"
      />
      <button @tap="bindSendDanmu">点击生成临时弹幕</button>
      <image src="../../static/images/close1.png" @tap="close" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GlobalData } from '@src/types'
import { getCurrentInstance, onMounted, ref } from 'vue'

defineProps({
  url: String,
  poster: String
})

const $emit = defineEmits(['closeVideo'])
const inputValue = ref('')
const danmuList = ref([])
const videoContext = ref<WechatMiniprogram.VideoContext>(null)
const musicPlay = ref(false)
const instance = getCurrentInstance()
const globalData: GlobalData = instance.appContext.config.globalProperties.globalData

onMounted(() => {
  getMessageList()
  videoContext.value = wx.createVideoContext('myVideo')
})

const play = e => {
  musicPlay.value = false
  if (!globalData.innerAudioContext.paused) {
    musicPlay.value = true
    globalData.innerAudioContext.pause()
  }
}
const ended = e => {
  if (musicPlay.value) {
    globalData.innerAudioContext.play()
  }
}

const bindInputBlur = e => {
  inputValue.value = e.detail.value
}

const bindSendDanmu = () => {
  videoContext.value.sendDanmu({
    text: inputValue.value,
    color: getRandomColor()
  })
}
const getRandomColor = () => {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length === 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

const getMessageList = () => {
  const db = wx.cloud.database()
  const message = db.collection('message')
  message.get().then(res => {
    let data = res.data.reverse()
    let arr = []
    if (data.length > 0) {
      data.forEach((item, index) => {
        arr.push({
          text: item.desc,
          color: getRandomColor(),
          time: 1 + index * 2
        })
      })
      danmuList.value = arr
    }
  })
}

const close = () => {
  videoContext.value.stop()
  $emit('closeVideo')
}
</script>

<style lang="scss" scoped>
.section {
  width: 750rpx;
  position: relative;
  .myVideo {
    height: 422rpx;
    width: 100%;
    margin-bottom: 20rpx;
  }
  .btn-area {
    .danmuInput {
      width: 660rpx;
      border: 1rpx solid #e5e5e5;
      padding-left: 30rpx;
      height: 80rpx;
      line-height: 80rpx;
      font-size: 30rpx;
      color: #ccc;
      margin-bottom: 30rpx;
      margin-left: 30rpx;
      border-radius: 16rpx;
    }
    button {
      height: 92rpx;
      width: 690rpx;
      border-radius: 16rpx;
      background: #1aad19;
      color: #fff;
      line-height: 92rpx;
      text-align: center;
      font-size: 36rpx;
      margin-bottom: 40rpx;
    }
    image {
      width: 80rpx;
      height: 80rpx;
      background: #fff;
      margin: 0 auto;
    }
  }
}
</style>
