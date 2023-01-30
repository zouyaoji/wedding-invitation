<!--
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-04-13 09:21:48
 * @LastEditTime: 2023-01-30 00:26:35
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation\src\pages\map\index.vue
-->
<template>
  <div class="map">
    <image mode="aspectFit" class="head-img" src="../../static/images/t1.png" />
    <map
      class="content"
      id="map"
      :longitude="markers[0].longitude"
      :latitude="markers[0].latitude"
      :markers="markers"
      scale="18"
      @markertap="toNav"
    >
    </map>
    <div class="call">
      <div class="left" @tap="linkHe">
        <image src="../../static/images/he.png" />
        <span>呼叫新郎</span>
      </div>
      <div class="right" @tap="linkShe">
        <image src="../../static/images/she.png" />
        <span>呼叫新娘</span>
      </div>
    </div>
    <image class="footer" src="../../static/images/grren-flower-line.png" />
  </div>
</template>
<script setup lang="ts">
import { getCommonConfig } from '@src/api/wedding-invitation'
import { onMounted, ref } from 'vue'

const markers = ref([
  {
    iconPath: '../../static/images/nav.png',
    id: 0,
    width: 50,
    height: 50,
    latitude: '30',
    longitude: '104'
  }
])

const heNumber = ref('')
const sheNumber = ref('')

onMounted(() => {
  if (import.meta.env.VITE_VUE_WECHAT_TCB === 'true') {
    const db = wx.cloud.database()
    const common = db.collection('common')
    common.get().then(res => {
      heNumber.value = res.data[0].heNumber
      sheNumber.value = res.data[0].sheNumber
      markers.value[0].latitude = res.data[0].location.latitude
      markers.value[0].longitude = res.data[0].location.longitude
    })
  } else {
    getCommonConfig().then(res => {
      heNumber.value = res.data.heNumber
      sheNumber.value = res.data.sheNumber
      markers.value[0].latitude = res.data.location.latitude
      markers.value[0].longitude = res.data.location.longitude
    })
  }
})

const toNav = res => {
  console.log(res)
  wx.openLocation({
    latitude: Number(markers.value[0].latitude),
    longitude: Number(markers.value[0].longitude),
    scale: 18
  })
}

const linkHe = () => {
  wx.makePhoneCall({
    phoneNumber: heNumber.value
  })
}
const linkShe = () => {
  wx.makePhoneCall({
    phoneNumber: sheNumber.value
  })
}
</script>

<style lang="scss" scoped>
.map {
  height: 100%;
  background: #fff;
  .head-img {
    width: 100%;
    height: 180rpx;
    margin-bottom: 50rpx;
  }
  .content {
    width: 690rpx;
    margin-left: 30rpx;
    height: 600rpx;
    margin-bottom: 30rpx;
    border-radius: 16rpx;
  }
  .call {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin-bottom: 20rpx;
    .left,
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      image {
        height: 64rpx;
        width: 64rpx;
      }
      span {
        height: 50rpx;
        line-height: 50rpx;
        font-size: 24rpx;
        color: #6b4f4e;
      }
    }
  }
  .footer {
    height: 80rpx;
    width: 716rpx;
    margin-left: 17rpx;
  }
}
</style>
