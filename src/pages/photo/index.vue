<!--
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-04-13 09:29:23
 * @LastEditTime: 2023-01-18 01:59:39
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation\src\pages\photo\index.vue
-->
<template>
  <div class="photo">
    <image class="bg-image" :src="background" />
    <h-swiper :list="list" :isGif="isGif" :autoplay="autoplay"></h-swiper>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HSwiper from '@src/component/swiper.vue'
import { onHide, onShow } from '@dcloudio/uni-app'
import { getPhotoBannerList, getCommonConfig } from '@src/api/wedding-invitation'

const list = ref([])
const isGif = ref(false)
const background = ref('')
const autoplay = ref(false)

onMounted(() => {
  getList()

  if (import.meta.env.VITE_VUE_WECHAT_TCB === 'true') {
    const db = wx.cloud.database()
    const common = db.collection('common')
    common.get().then(res => {
      background.value = res.data[0].background
    })
  } else {
    getCommonConfig().then(res => {
      background.value = res.data.background
    })
  }
})

onShow(() => {
  autoplay.value = true
})

onHide(() => {
  autoplay.value = false
})

const getList = () => {
  if (import.meta.env.VITE_VUE_WECHAT_TCB === 'true') {
    const db = wx.cloud.database()
    const banner = db.collection('indexBanner')
    banner.get().then(res => {
      let result = []
      for (let i = 0; i < res.data[0].indexBanner.length; i++) {
        let show = i === 0
        result.push({
          url: res.data[0].indexBanner[i],
          show: show
        })
      }
      list.value = result
    })
  } else {
    getPhotoBannerList().then(res => {
      let result = []
      for (let i = 0; i < res.data.indexBanner.length; i++) {
        let show = i === 0
        result.push({
          url: res.data.indexBanner[i],
          show: show
        })
      }
      list.value = result
    })
  }
}
</script>

<style lang="scss" scoped>
.photo {
  height: 100%;
}
</style>
