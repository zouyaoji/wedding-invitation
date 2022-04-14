<!--
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-04-14 11:20:59
 * @LastEditTime: 2022-04-14 11:44:14
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation\src\component\swiper.vue
-->
<template>
  <div class="box">
    <swiper
      class="swiper"
      :autoplay="autoplay"
      :circular="true"
      :indicator-dots="true"
      @change="change"
      @animationfinish="animationfinish"
      :duration="250"
    >
      <block v-for="(item, index) in list" :key="index">
        <swiper-item class="item">
          <div class="animate-ele-warp" v-if="item.show">
            <div class="animate-ele animated" :class="[item.class]" style="top: 0; left: 0; animation-delay: 0.2s">
              <image mode="aspectFill" lazy-load :src="item.url" class="animate-img slide-image" />
            </div>
          </div>
        </swiper-item>
      </block>
    </swiper>
    <!-- <image v-if="isGif" class="img" src="../../static/images/save_the_date_pu.gif"/> -->
  </div>
</template>

<script lang="ts" setup>
import { onHide } from '@dcloudio/uni-app'
import { GlobalData } from '@src/types'
import { getCurrentInstance, PropType, ref, watch } from 'vue'

const props = defineProps({
  list: Array as PropType<any>,
  isGif: Boolean,
  autoplay: {
    type: Boolean,
    default: true
  }
})

const changeFlag = ref(false)
const lastIndex = ref(0)
const lastRadom = ref(-1)

const instance = getCurrentInstance()
const globalData: GlobalData = instance.appContext.config.globalProperties.globalData

onHide(() => {
  // this.$root.$mp.page.setData({'$root[0].autoplay': false})
})

const change = val => {
  changeFlag.value = true
}

const animationfinish = val => {
  if (!changeFlag.value) {
    return
  }

  props.list[lastIndex.value].show = false
  props.list[val.target.current].show = true
  let index = randomNum()
  props.list[val.target.current].class = globalData.animations[index]
  lastIndex.value = val.target.current
  changeFlag.value = false
}

const randomNum = () => {
  let minNum = 0
  let maxNum = globalData.animations.length
  let result = parseInt(String(Math.random() * (maxNum - minNum + 1) + minNum), 10)
  while (lastRadom.value === result) {
    result = parseInt(String(Math.random() * (maxNum - minNum + 1) + minNum), 10)
  }
  lastRadom.value = result
  return result
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
    }
  }
  .img {
    position: absolute;
    bottom: 50rpx;
    left: 50rpx;
    z-index: 99;
  }
}
</style>
