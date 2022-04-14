<!--
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-04-13 09:40:59
 * @LastEditTime: 2022-04-14 12:08:59
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation\src\component\index-swiper.vue
-->
<template>
  <div class="box">
    <swiper
      :autoplay="autoplay"
      class="swiper"
      circular
      :vertical="true"
      @change="change"
      @animationfinish="animationfinish"
      :duration="250"
      :interval="6000"
    >
      <block v-for="(item, index) in list" :key="index">
        <swiper-item class="item">
          <div class="animate-ele-warp" v-show="item.show">
            <div class="animate-ele animated" :class="[item.class]" style="top: 0; left: 0; animation-delay: 0.2s">
              <image mode="aspectFill" lazy-load :src="item.url" class="animate-img slide-image" />
            </div>
          </div>
          <!-- 第一张动画 -->
          <div class="animate-ele-warp" v-if="showOverlay0 && index === 0">
            <div class="animate-ele animated zoomIn" style="animation-duration: 3s; animation-delay: 0.2s">
              <image class="animate-img" src="../../static/images/invitation.png" style="width: 710rpx; height: 95%" />
            </div>
            <div class="animate-ele animated fadeInUp" style="animation-duration: 1.5s; animation-delay: 1.8s">
              <image
                class="animate-img"
                src="../../static/images/loveistrue.png"
                style="bottom: 80rpx; left: 12rpx; width: 687rpx; height: 17rpx"
              />
            </div>
            <div
              class="animate-ele animated fadeInRight"
              style="left: 0; animation-duration: 1.5s; animation-delay: 1.8s"
            >
              <div class="info">
                <div class="content">
                  <h6 class="info-title">{{ info.name }}</h6>
                  <p class="info-content">{{ info.date }}</p>
                  <p class="info-content">{{ info.time }}</p>
                  <p class="info-content">{{ info.hotel }}</p>
                  <p class="info-content">{{ info.detail }}</p>
                  <image src="../../static/images/we.png" class="img_footer" />
                </div>
              </div>
            </div>
          </div>
          <!-- 第二张动画 -->
          <div class="animate-ele-warp" v-if="showOverlay1 && index === 1">
            <div class="animate-ele animated zoomIn" style="animation-duration: 2.5s; animation-delay: 0.2s">
              <image class="animate-img" src="../../static/images/zoomBack.png" style="height: 97%; width: 710rpx" />
            </div>
            <div
              class="animate-ele animated delay-1s fadeInUp"
              style="height: 25%; left: 65rpx; animation-duration: 1.5s"
            >
              <image
                class="animate-img"
                src="../../static/images/thelove.png"
                style="width: 632rpx; height: 150.968rpx"
              />
            </div>
            <div
              class="animate-ele animated fadeInUp"
              style="height: 50%; left: 40%; top: 200rpx; animation-duration: 1.5s; animation-delay: 1.5s"
            >
              <image class="animate-img" src="../../static/images/marryu.png" style="width: 122rpx; height: 158rpx" />
            </div>
          </div>
          <!-- 第三张动画 -->
          <div class="animate-ele-warp" v-if="showOverlay2 && index === 2">
            <div class="animate-ele animated fadeIn" style="animation-delay: 0.5s">
              <image class="animate-img" src="../../static/images/kuang.png" style="width: 711rpx; height: 97%" />
            </div>
            <div class="animate-ele animated fadeInDown" style="animation-duration: 1.5s; animation-delay: 0.8s">
              <image
                class="animate-img"
                src="../../static/images/loveistrue.png"
                style="left: 130rpx; top: 25rpx; width: 437rpx; height: 12rpx"
              />
            </div>
            <div class="animate-ele animated fadeInRight" style="animation-duration: 1.5s; animation-delay: 1s">
              <image
                class="animate-img"
                src="../../static/images/kiss.png"
                style="top: 250rpx; right: 100rpx; width: 135.968rpx; height: 387.968rpx"
              />
            </div>
            <div class="animate-ele animated fadeInUp" style="animation-duration: 1.5s; animation-delay: 1.2s">
              <image
                class="animate-img"
                src="../../static/images/wonderful.png"
                style="right: 70rpx; bottom: 65rpx; width: 326rpx; height: 54.968rpx"
              />
            </div>
            <div class="animate-ele animated zoomIn" style="nimation-duration: 1.5s; animation-delay: 0.8s">
              <image
                class="animate-img"
                src="../../static/images/thelove.png"
                style="width: 534.968rpx; height: 128rpx; left: 77rpx; top: 80rpx"
              />
            </div>
          </div>
          <!-- 第四张动画 -->
          <div class="animate-ele-warp" v-if="showOverlay3 && index === 3">
            <div class="animate-ele animated zoomIn" style="animation-delay: 0.3s">
              <image class="animate-img" src="../../static/images/kuang.png" style="width: 711rpx; height: 97%" />
            </div>
            <div class="animate-ele animated fadeInLeft" style="animation-duration: 1.5s; animation-delay: 1.2s">
              <image
                class="animate-img"
                src="../../static/images/happiness.png"
                style="left: 30rpx; top: 35rpx; width: 380rpx; height: 168.968rpx"
              />
            </div>
            <div class="animate-ele animated fadeInUp" style="animation-duration: 1.5s; animation-delay: 1.5s">
              <image
                class="animate-img"
                src="../../static/images/goodtime.png"
                style="bottom: 60rpx; right: 70rpx; width: 294rpx; height: 54rpx"
              />
            </div>
          </div>
          <!-- 第五张动画 -->
          <div class="animate-ele-warp" v-if="showOverlay4 && index === 4">
            <div class="animate-ele animated zoomIn" style="animation-delay: 0.3s">
              <image class="animate-img" src="../../static/images/kuang.png" style="width: 711rpx; height: 97%" />
            </div>
            <div class="animate-ele animated zoosmIn" style="animation-duration: 1.5s; animation-delay: 0.5s">
              <image
                class="animate-img"
                src="../../static/images/goodtime2.png"
                style="left: 30rpx; top: 35rpx; width: 306.968rpx; height: 468.968rpx"
              />
            </div>
          </div>
          <!-- 第六张动画 -->
          <div class="animate-ele-warp" v-if="showOverlay5 && index === 5">
            <div class="animate-ele animated fadeIn" style="animation-delay: 1.5s">
              <image class="animate-img" src="../../static/images/kuang.png" style="width: 711rpx; height: 97%" />
            </div>
            <div class="animate-ele animated zoomIn" style="animation-duration: 1.5s; animation-delay: 0.5s">
              <image
                class="animate-img"
                src="../../static/images/happiness.png"
                style="left: 30rpx; top: 35rpx; width: 339rpx; height: 149rpx"
              />
            </div>
            <div class="animate-ele animated fadeInRight" style="animation-duration: 1.5s; animation-delay: 0.8s">
              <image
                class="animate-img"
                src="../../static/images/freedom.png"
                style="left: 30rpx; bottom: 250rpx; width: 137rpx; height: 317rpx"
              />
            </div>
            <div class="animate-ele animated fadeInUp" style="animation-duration: 1.5s; animation-delay: 1s">
              <image
                class="animate-img"
                src="../../static/images/celebaration.png"
                style="left: 30rpx; bottom: 65rpx; width: 435.968rpx; height: 96rpx"
              />
            </div>
          </div>
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref, onMounted } from 'vue'

const props = defineProps({
  list: Array as PropType<any[]>,
  info: Object as PropType<any>,
  autoplay: {
    type: Boolean,
    default: true
  }
})

const showOverlay0 = ref(false)
const showOverlay1 = ref(false)
const showOverlay2 = ref(false)
const showOverlay3 = ref(false)
const showOverlay4 = ref(false)
const showOverlay5 = ref(false)
const changeFlag = ref(false)
const lastIndex = ref(0)
const lastRadom = ref(-1)

// onMounted(() => {

// })
setTimeout(() => {
  showOverlay0.value = true
}, 1500)
const change = () => {
  changeFlag.value = true
}

const animationfinish = val => {
  if (!changeFlag.value) {
    return
  }
  showOverlay0.value = val.target.current === 0
  showOverlay1.value = val.target.current === 1
  showOverlay2.value = val.target.current === 2
  showOverlay3.value = val.target.current === 3
  showOverlay4.value = val.target.current === 4
  showOverlay5.value = val.target.current === 5
  props.list[lastIndex.value].show = false
  props.list[val.target.current].show = true
  lastIndex.value = val.target.current
  changeFlag.value = false
}
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  height: 100%;
  .swiper {
    height: 100%;
    width: 100%;
    .item {
      width: 100%;
      height: 100%;

      image {
        width: 100%;
        height: 100%;
        display: block;
      }

      .info {
        width: 630rpx;
        background: rgba(255, 255, 255, 0.75);
        z-index: 9;
        position: absolute;
        bottom: 120rpx;
        left: 50rpx;
        padding: 10rpx;
        animation: infoAnimation 12s linear infinite;
        .content {
          width: 626rpx;
          border: 1rpx solid #000;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          position: relative;
          padding-bottom: 30rpx;
          .info-title {
            font-size: 50rpx;
            height: 100rpx;
            line-height: 100rpx;
          }
          .info-content {
            font-size: 24rpx;
            height: 60rpx;
            line-height: 60rpx;
          }
          .img_footer {
            position: absolute;
            bottom: 10rpx;
            left: 53rpx;
            z-index: 99;
            height: 14rpx;
            width: 520rpx;
          }
        }
      }
    }
  }
}
</style>
