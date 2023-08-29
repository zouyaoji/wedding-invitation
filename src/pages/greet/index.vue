<!--
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-04-13 09:21:48
 * @LastEditTime: 2023-08-24 15:32:50
 * @LastEditors: zouyaoji 370681295@qq.com
 * @Description:
 * @FilePath: \wedding-invitation-me\src\pages\greet\index.vue
-->
<template>
  <div class="greet">
    <image class="head" src="../../static/images/heart-animation.gif" />
    <scroll-view scroll-y class="image-box">
      <div class="image-item" v-for="(item, index) in userList" :key="index">
        <view
          class="cu-avatar round lg"
          :style="{
            'background-image': `url(${item.user.avatarUrl})`
          }"
        ></view>
        <p>{{ item.user.nickName }}</p>
      </div>
    </scroll-view>
    <p class="count">已收到{{ userList.length }}位好友送来的祝福</p>
    <div class="bottom">
      <button class="left" lang="zh_CN" open-type="getUserInfo" @getuserinfo="sendGreet">送上祝福</button>
      <button class="right" open-type="share">分享喜悦</button>
    </div>
  </div>

  <view class="cu-modal" :class="modalName === 'Modal' ? 'show' : ''">
    <view class="cu-dialog">
      <view class="cu-bar bg-white justify-end">
        <view class="content">怎么称呼您？</view>
        <view class="action" @tap="hideModal">
          <text class="cuIcon-close text-red"></text>
        </view>
      </view>
      <view class="padding-sm">
        <form>
          <view class="cu-form-group margin-top">
            <view class="title">头像</view>

            <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
              <view
                class="cu-avatar round lg"
                :style="{
                  'background-image': `url(${avatarUrl})`
                }"
              ></view>
            </button>
          </view>
          <view class="cu-form-group margin-top">
            <view class="title">昵称</view>
            <input type="nickname" placeholder="请选择或输入昵称" @blur="onInput" v-model="nickname" />
          </view>
        </form>
      </view>
      <view class="cu-bar bg-white justify-end">
        <view class="action">
          <button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
          <button class="cu-btn bg-green margin-left" @tap="onConfirm">确定</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'
import {
  addOrUpdateUser,
  code2Session,
  getFriendUserList,
  getUserByOpenId,
  uploadAvatar
} from '@src/api/wedding-invitation'
import { showToast } from '@src/utils'
import { getCurrentInstance, onMounted, ref } from 'vue'

const userList = ref([])
const userInfo = ref(null)
const instance = getCurrentInstance()
const modalName = ref(null)
const avatarUrl = ref(null)
const nickname = ref(null)

// onMounted(() => {
//   getUserList()
// })

onShow(() => {
  getUserList()
})

const onInput = e => {
  nickname.value = e.detail.value
}

const hideModal = e => {
  modalName.value = null
}

const onConfirm = e => {
  if (nickname.value === null || nickname.value === '') {
    showToast('请选择或输入昵称~')
    return
  }

  if (avatarUrl.value === null || avatarUrl.value === '') {
    showToast('请选择或上传头像~')
    return
  }
  modalName.value = null

  const openId = instance.appContext.config.globalProperties.$MpUserData.openId
  uploadAvatar(avatarUrl.value, {
    openId
  }).then(res => {
    addOrUpdateUser({
      openid: openId,
      user: {
        nickName: nickname.value,
        avatarUrl: res.data
      }
    }).then(res => {
      showToast('祝福成功~')
      getUserList()
      getUserByOpenId(openId).then(res => {
        if (res?.data?.length > 0) {
          instance.appContext.config.globalProperties.$MpUserData = {
            openId,
            ...res.data[0]
          }
        }
      })
    })
  })
}

const sendGreet = e => {
  // if (e.target.errMsg === 'getUserInfo:ok') {
  //   wx.getUserInfo({
  //     success: function (res: any) {
  //       userInfo.value = res.userInfo
  //       getOpenId(jsCodeMP.value)
  //     }
  //   })
  // }

  if (instance.appContext.config.globalProperties.$MpUserData?.user) {
    showToast('您已经送过祝福了~')
  } else {
    addUser()
  }
}

const addUser = () => {
  if (import.meta.env.VITE_VUE_WECHAT_TCB === 'true') {
    const db = wx.cloud.database()
    const user = db.collection('user')
    user
      .add({
        data: {
          user: userInfo.value
        }
      })
      .then(res => {
        showToast('祝福成功~')
        getUserList()
      })
  } else {
    modalName.value = 'Modal'
  }
}

const getUserList = () => {
  if (import.meta.env.VITE_VUE_WECHAT_TCB === 'true') {
    wx.cloud
      .callFunction({
        name: 'userList',
        data: {}
      })
      .then(res => {
        userList.value = (res.result as AnyObject).data.reverse()
      })
  } else {
    getFriendUserList().then(res => {
      userList.value = res.data.reverse()
    })
  }
}

const onChooseAvatar = e => {
  avatarUrl.value = e.detail.avatarUrl
}
</script>

<style lang="scss" scoped>
.greet {
  width: 100%;
  height: 100%;
  .cu-form-group .title {
    min-width: calc(4em + 15px);
  }
  .head {
    height: 150rpx;
    width: 200rpx;
    margin: 0 auto;
  }
  .image-box {
    height: 700rpx;
    width: 750rpx;
    margin-left: 30rpx;
    border-radius: 16rpx;
    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    .image-item {
      width: 180rpx;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding: 25rpx;
      float: left;
      image {
        width: 180rpx;
        height: 180rpx;
        border-radius: 90rpx;
      }
      p {
        height: 90rpx;
        line-height: 60rpx;
        font-size: 24rpx;
        color: #444;
        width: 90rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }
    }
  }
  .bottom {
    height: 140rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .left {
      height: 80rpx;
      line-height: 80rpx;
      font-size: 28rpx;
      width: 300rpx;
      color: #fff;
      background: #e62c6b;
      margin-right: 20rpx;
    }
    .right {
      height: 80rpx;
      line-height: 80rpx;
      font-size: 28rpx;
      color: #fff;
      width: 300rpx;
      background: #2ca6f9;
    }
  }
  .count {
    height: 60rpx;
    line-height: 60rpx;
    background: rgba(255, 255, 255, 0.5);
    position: fixed;
    bottom: 140rpx;
    left: 0;
    font-size: 28rpx;
    color: #444;
    text-align: center;
    width: 100%;
  }
}
</style>
