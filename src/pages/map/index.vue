<template>
    <div class="map">
        <image mode="aspectFit" class="head-img" src="../../static/images/t1.png"/>
        <map class="content" id="map" longitude="104.088262" latitude="30.763111" :markers="markers" scale="18" @tap="toNav">
        </map>
        <div class="call">
            <div class="left" @tap="linkHe">
                <image src="../../static/images/he.png"/>
                <span>呼叫新郎</span>
            </div>
            <div class="right" @tap="linkShe">
                <image src="../../static/images/she.png"/>
                <span>呼叫新娘</span>
            </div>
        </div>
        <image class="footer" src="../../static/images/grren-flower-line.png"/>
    </div>
</template>

<script>
// import QQMap from 'common/js/qqmap-wx-jssdk.js'
export default {
  name: 'Map',
  data () {
    return {
      // qqSdk: '',
      markers: [{
        iconPath: '../../static/images/nav.png',
        id: 0,
        latitude: 30.763111,
        longitude: 104.088262,
        width: 50,
        height: 50
      }]
    }
  },
  onLoad () {
    const that = this
    const db = wx.cloud.database()
    const common = db.collection('common')
    common.get().then(res => {
      that.heNumber = res.data[0].heNumber
      that.sheNumber = res.data[0].sheNumber
    })
  },
  methods: {
    toNav () {
      wx.openLocation({
        latitude: 30.763111,
        longitude: 104.088262,
        scale: 18
      })
    },
    linkHe () {
      wx.makePhoneCall({
        phoneNumber: this.heNumber
      })
    },
    linkShe () {
      wx.makePhoneCall({
        phoneNumber: this.sheNumber
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.map
    height 100%
    background #fff
    .head-img
      width 100%
      height 180rpx
      margin-bottom 50rpx
    .content
      width 690rpx
      margin-left 30rpx
      height 600rpx
      margin-bottom 30rpx
      border-radius 16rpx
    .call
      display flex
      justify-content space-around
      align-items center
      width 100%
      margin-bottom 20rpx
      .left, .right
        flex 1
        display flex
        flex-direction column
        justify-content center
        align-items center
        image
          height 64rpx
          width 64rpx
        span
          height 50rpx
          line-height 50rpx
          font-size 24rpx
          color #6B4F4E
    .footer
      height 80rpx
      width 716rpx
      margin-left 17rpx
</style>
