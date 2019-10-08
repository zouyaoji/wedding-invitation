<template>
    <scroll-view scroll-x class="slider">
        <view>
            <image mode="aspectFill" lazy-load="true" :src="item" v-for="(item, index) in imgList" :key="index" @tap="lookImages(index)"/>
        </view>
    </scroll-view>
</template>

<script>
export default {
  name: 'Slider',
  props: ['list'],
  computed: {
    imgList () {
      let that = this
      if (that.list) {
        let arr = []
        that.list.forEach(item => {
          arr.push(item.imageUrl)
        })
        return arr
      }
      return []
    }
  },
  methods: {
    lookImages (index) {
      let that = this
      wx.previewImage({
        current: that.imgList[index],
        urls: that.imgList// 需要预览的图片http链接列表
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.slider
    height 240rpx
    width 690rpx
    white-space nowrap
    position relative
    margin-bottom 24rpx
    padding 0 30rpx
    image
        height 240rpx
        width 160rpx
        margin-right 20rpx
        display inline-block
        border-radius 16rpx
        background linear-gradient(#fff, #aaa)
</style>
