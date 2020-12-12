<template>
  <div class="box">
    <swiper class="swiper"
      autoplay
      circular
      :vertical="true"
      @change="change"
      @animationfinish="animationfinish"
      :duration=250
      interval=6000
    >
      <block v-for="(item, index) in list" :key="index">
        <swiper-item class="item">
          <div class="animate-ele-warp" v-show="item.show">
            <div class="animate-ele animated" :class="[item.class]" style="top: 0; left: 0; animation-delay: 0.2s;">
              <image mode="aspectFill" lazy-load :src="item.url" class="animate-img slide-image"/>
            </div>
          </div>
          <!-- 第一张动画 -->
          <div class="animate-ele-warp" v-if="showOverlay0 && index === 0">
            <div class="animate-ele animated zoomIn" style="animation-duration: 3s; animation-delay: 0.2s;">
              <image class="animate-img" src="../../static/images/invitation.png" style="width: 710rpx; height: 95%;"/>
            </div>
            <div class="animate-ele animated fadeInUp" style="animation-duration: 1.5s; animation-delay: 1.8s">
              <image class="animate-img" src="../../static/images/loveistrue.png" style="bottom: 80rpx; left: 12rpx; width: 687rpx; height: 17rpx;" />
            </div>
            <div class="animate-ele animated fadeInRight" style="left: 0; animation-duration: 1.5s; animation-delay: 1.8s">
              <div class="info">
                <div class="content">
                  <!-- <h6>Mr.Z & Miss.Q</h6>
                  <p>谨定于 2019年10月01日 （星期二）中午11:30</p>
                  <p>农历 九月初三 中午十一点半 举办婚礼</p>
                  <p>席设：顺庭龙庄中一厅</p>
                  <p>地址：成都市新都区临河街与荣德路交叉口</p> -->
                  <h6>{{info.name}}</h6>
                  <p>{{info.date}}</p>
                  <p>{{info.time}}</p>
                  <p>{{info.hotel}}</p>
                  <p>{{info.detail}}</p>
                  <image src="../../static/images/we.png" class="img_footer"/>
                </div>
              </div>
            </div>
          </div>
          <!-- 第二张动画 -->
          <div class="animate-ele-warp" v-if="showOverlay1 && index === 1">
            <div class="animate-ele animated zoomIn" style="animation-duration: 2.5s; animation-delay: 0.2s">
              <image class="animate-img" src="../../static/images/zoomBack.png" style="height: 97%; width: 710rpx;" />
            </div>
            <div class="animate-ele animated delay-1s fadeInUp " style="height: 25%; left: 65rpx; animation-duration: 1.5s;">
              <image class="animate-img" src="../../static/images/thelove.png" style="width: 632rpx; height: 150.968rpx;" />
            </div>
            <div class="animate-ele animated fadeInUp" style="height: 50%; left: 40%; top: 200rpx; animation-duration: 1.5s; animation-delay: 1.5s;">
              <image class="animate-img" src="../../static/images/marryu.png" style="width: 122rpx; height: 158rpx;" />
            </div>
          </div>
          <!-- 第三张动画 -->
          <div class="animate-ele-warp" v-if="showOverlay2 && index === 2">
            <div class="animate-ele animated fadeIn" style="animation-delay: 0.5s">
              <image class="animate-img" src="../../static/images/kuang.png" style="width: 711rpx; height: 97%;"/>
            </div>
            <div class="animate-ele animated fadeInDown" style="animation-duration: 1.5s; animation-delay: 0.8s;">
              <image class="animate-img" src="../../static/images/loveistrue.png" style="left: 130rpx; top: 25rpx; width: 437rpx; height: 12rpx;"/>
            </div>
            <div class="animate-ele animated fadeInRight" style="animation-duration: 1.5s; animation-delay: 1s;">
              <image class="animate-img" src="../../static/images/kiss.png" style="top: 250rpx; right: 100rpx; width: 135.968rpx; height: 387.968rpx;"/>
            </div>
            <div class="animate-ele animated fadeInUp" style="animation-duration: 1.5s; animation-delay: 1.2s;">
              <image class="animate-img" src="../../static/images/wonderful.png" style="right: 70rpx; bottom: 65rpx; width: 326rpx; height: 54.968rpx;"/>
            </div>
            <div class="animate-ele animated zoomIn" style="nimation-duration: 1.5s; animation-delay: 0.8s;">
              <image class="animate-img" src="../../static/images/thelove.png" style="width: 534.968rpx; height: 128rpx; left: 77rpx; top: 80rpx" />
            </div>
          </div>
          <!-- 第四张动画 -->
          <div class="animate-ele-warp" v-if="showOverlay3 && index === 3">
            <div class="animate-ele animated zoomIn" style="animation-delay: 0.3s;">
              <image class="animate-img" src="../../static/images/kuang.png" style="width: 711rpx; height: 97%;"/>
            </div>
            <div class="animate-ele animated fadeInLeft" style="animation-duration: 1.5s; animation-delay: 1.2s;">
              <image class="animate-img" src="../../static/images/happiness.png" style="left: 30rpx; top:35rpx; width: 380rpx; height: 168.968rpx;"/>
            </div>
            <div class="animate-ele animated fadeInUp" style="animation-duration: 1.5s; animation-delay: 1.5s;">
              <image class="animate-img" src="../../static/images/goodtime.png" style="bottom: 60rpx; right: 70rpx; width: 294rpx; height: 54rpx;"/>
            </div>
          </div>
          <!-- 第五张动画 -->
          <div class="animate-ele-warp" v-if="showOverlay4 && index === 4">
            <div class="animate-ele animated zoomIn" style="animation-delay: 0.3s;">
              <image class="animate-img" src="../../static/images/kuang.png" style="width: 711rpx; height: 97%;"/>
            </div>
            <div class="animate-ele animated zoomIn" style="animation-duration: 1.5s; animation-delay: 0.5s;">
              <image class="animate-img" src="../../static/images/goodtime2.png" style="left: 30rpx; top: 35rpx; width: 306.968rpx; height: 468.968rpx;"/>
            </div>
          </div>
          <!-- 第六张动画 -->
          <div class="animate-ele-warp" v-if="showOverlay5 && index === 5">
            <div class="animate-ele animated fadeIn" style="animation-delay: 1.5s">
              <image class="animate-img" src="../../static/images/kuang.png" style="width: 711rpx; height: 97%;"/>
            </div>
            <div class="animate-ele animated zoomIn" style="animation-duration: 1.5s; animation-delay: 0.5s;">
              <image class="animate-img" src="../../static/images/happiness.png" style="left: 30rpx; top:35rpx; width: 339rpx; height: 149rpx;"/>
            </div>
            <div class="animate-ele animated fadeInRight" style="animation-duration: 1.5s; animation-delay: 0.8s;">
              <image class="animate-img" src="../../static/images/freedom.png" style="left: 30rpx; bottom: 250rpx; width: 137rpx; height: 317rpx;"/>
            </div>
            <div class="animate-ele animated fadeInUp" style="animation-duration: 1.5s; animation-delay: 1s;">
              <image class="animate-img" src="../../static/images/celebaration.png" style="left: 30rpx; bottom: 65rpx; width: 435.968rpx; height: 96rpx;"/>
            </div>
          </div>
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'GoodSwiper',
  props: ['list', 'info'],
  data () {
    return {
      showOverlay0: true,
      showOverlay1: false,
      showOverlay2: false,
      showOverlay3: false,
      showOverlay4: false,
      showOverlay5: false,
      changeFlag: false,
      lastIndex: 0,
      lastRadom: -1
    }
  },
  onHide (e) {
    // 禁止后台切换图片
    this.$root.$mp.page.setData({'$root[0].autoplay': false})
  },
  methods: {
    change (val) {
      this.changeFlag = true
    },
    animationfinish (val) {
      if (!this.changeFlag) { return }
      // console.log(val, '111')
      this.showOverlay0 = val.target.current === 0
      this.showOverlay1 = val.target.current === 1
      this.showOverlay2 = val.target.current === 2
      this.showOverlay3 = val.target.current === 3
      this.showOverlay4 = val.target.current === 4
      this.showOverlay5 = val.target.current === 5
      this.list[this.lastIndex].show = false
      this.list[val.target.current].show = true
      this.lastIndex = val.target.current
      this.changeFlag = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.box
  position relative
  height 100%
  .swiper
    height 100%
    width 100%
    .item
      width 100%
      height 100%
      image
        width 100%
        height 100%
        display block
  .info
    width 630rpx
    background rgba(255, 255, 255, 0.75)
    z-index 9
    position absolute
    bottom 120rpx
    left 50rpx
    padding 10rpx
    animation infoAnimation 12s linear infinite
    .content
      width 626rpx
      border 1rpx solid #000
      display flex
      flex-direction column
      justify-content flex-start
      align-items center
      position relative
      padding-bottom 30rpx
      h1
        font-size 50rpx
        height 100rpx
        line-height 100rpx
      p
        font-size 24rpx
        height 60rpx
        line-height 60rpx
      .img_footer
        position absolute
        bottom 10rpx
        left 53rpx
        z-index 99
        height 14rpx
        width 520rpx
</style>
