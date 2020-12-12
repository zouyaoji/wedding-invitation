<template>
  <div class="index">
    <image :src="background" class="bg-image" />
    <div class="bg-swiper">
      <index-swiper :list="list" :info="info"></index-swiper>
    </div>
    <div @tap="audioPlay" class="bg_music" v-if="isPlay">
      <image class="musicImg music_icon" src="../../static/images/music_icon.png" />
      <image class="music_play pauseImg" src="../../static/images/music_play.png" />
    </div>
    <div @tap="audioPlay" class="bg_music" v-else>
      <image class="musicImg" src="../../static/images/music_icon.png" />
      <image class="music_play playImg" src="../../static/images/music_play.png" />
    </div>
  </div>
</template>

<script>
import IndexSwiper from 'components/indexSwiper'
import tools from 'common/js/h_tools'
export default {
  name: 'Index',
  components: {
    IndexSwiper
  },
  data () {
    return {
      isPlay: false,
      list: [],
      audioCtx: '',
      background: '',
      info: {}
    }
  },
  onLoad () {
    this.globalData.innerAudioContext.onEnded(this.onEnded)
    this.globalData.innerAudioContext.onPlay(this.onPlay)
    this.globalData.innerAudioContext.onPause(this.onPause)
    this.getList()
    const db = wx.cloud.database()
    const common = db.collection('common')
    common.get().then(res => {
      this.background = res.data[0].background
      this.info = res.data[0].info
    })
  },
  onShow () {
    this.audioCtx = this.globalData.innerAudioContext
    this.isPlay = !this.audioCtx.paused
  },
  methods: {
    onPlay () {
      this.isPlay = true
    },
    onPause () {
      this.isPlay = false
    },
    onEnded () {
      if (this.globalData.index >= this.globalData.musics.length) {
        this.globalData.index = 0
      }
      this.globalData.innerAudioContext.src = this.globalData.musics[this.globalData.index].musicUrl
      this.globalData.index += 1
    },
    audioPlay () {
      if (this.audioCtx.paused) {
        this.audioCtx.play()
        tools.showToast('背景音乐已开启~')
      } else {
        this.audioCtx.pause()
        tools.showToast('您已暂停音乐播放~')
      }
    },
    getList () {
      const that = this
      const db = wx.cloud.database()
      const banner = db.collection('banner')
      banner.get().then(res => {
        let list = []
        let animations = [
          'fadeInLeft',
          'slideInDown',
          'rotateInDownRight',
          'rollIn',
          'jackInTheBox',
          'flip'
        ]
        for (let i = 0; i < res.data[0].bannerList.length; i++) {
          let show = i === 0
          list.push({
            url: res.data[0].bannerList[i],
            show: show,
            class: animations[i]
          })
        }
        that.list = list
      })
    },
    getMusicUrl () {
      const that = this
      const db = wx.cloud.database()
      const music = db.collection('music')
      music.get().then(res => {
        that.globalData.innerAudioContext.src = res.data[0].musicUrl
        that.audioCtx.play()
        that.getList()
      })
    }
  },

  onShareAppMessage: function (res) {
    return {
      path: '/pages/index/main'
    }
  }
}
</script>

<style scoped lang="stylus">
@-webkit-keyframes musicRotate
  from
    -webkit-transformb rotate(0deg)
  to
    -webkit-transform rotate(360deg)
@-webkit-keyframes musicStop
  from
    -webkit-transform rotate(20deg)
  to
    -webkit-transform rotate(0deg)
@-webkit-keyframes musicStart
  from
    -webkit-transform rotate(0deg)
  to
    -webkit-transform rotate(20deg)
@-webkit-keyframes infoAnimation
  0%
    -webkit-transform scale(1) translate(0, 0)
  50%
    -webkit-transform scale(.9) translate(5px, 5px)
  100%
    -webkit-transform scale(1) translate(0, 0)
.index
  height 100%
  position relative
  .img
    width 100%
    height 100%
  .bg-swiper
    width 100%
    height 100%
  .inv
    position absolute
    top 20rpx
    left 89rpx
    width 572rpx
    height 69rpx
    z-index 9
  .bg_music
    position fixed
    right 10rpx
    top 100rpx
    width 100rpx
    z-index 99
    display flex
    justify-content flex-start
    align-items flex-start
    .musicImg
      width 60rpx
      height 60rpx
    .music_icon
      animation musicRotate 3s linear infinite
    .music_play
      width 28rpx
      height 60rpx
      margin-left -10rpx
      transform-origin top
      -webkit-transform rotate(20deg)
    .playImg
      animation musicStop 1s linear forwards
    .pauseImg
      animation musicStart 1s linear forwards
  #myAudio
    display none


</style>
