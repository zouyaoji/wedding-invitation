<!--
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-04-13 09:29:22
 * @LastEditTime: 2023-08-22 15:51:01
 * @LastEditors: zouyaoji 370681295@qq.com
 * @Description:
 * @FilePath: \wedding-invitation-me\src\pages\message\index.vue
-->
<template>
  <div class="message">
    <scroll-view scroll-y class="box">
      <p class="place"></p>
      <div class="item" v-for="(item, index) in messageList" :key="index">
        <image class="left" :src="item.url" />
        <div class="right">
          <div class="top">
            <uni-tag v-if="item.customIndex === 0" text="置顶" type="success" @click="copy(item)" />
            <div class="delete">
              <image
                src="../../static/images/close.png"
                class="delete_icon"
                @click="deleteMessage(item)"
                v-if="item.openid === openId || isAdmin"
              />
            </div>
            <span class="top-l">{{ item.name }}</span>
            <span class="top-r">{{ formatDateTime(item.time) }}</span>
          </div>
          <p class="con">{{ item.desc }}</p>
        </div>
      </div>
      <p class="place-end"></p>
    </scroll-view>
    <div class="bottom" v-if="openId">
      <button class="left" lang="zh_CN" open-type="getUserInfo" @getuserinfo="toMessage">说点啥吧</button>
      <button class="right" open-type="getUserInfo" @getuserinfo="toForm">我要出席</button>
    </div>
    <div class="dialog" v-show="isOpen">
      <textarea class="desc" placeholder="在这里输入您想要说的话" placeholder-style="color:#ccc;" v-model="desc" />
      <div class="btn">
        <button class="left" @tap="sendMessage">发送留言</button>
        <button class="right" @tap="cancel">取消</button>
      </div>
    </div>
    <div class="video-dialog" @tap="toVideo" v-if="url !== '' && url !== undefined && url !== null">
      <image src="../../static/images/video1.png" />
    </div>
    <div class="form-dialog" @tap="lookList">
      <image src="../../static/images/form.png" />
    </div>
    <div class="video" v-if="isVideo">
      <h-video @closeVideo="closeVideo" :url="url" :poster="poster"></h-video>
    </div>
    <div class="form" v-show="isForm">
      <h-form ref="formRef" @closeForm="closeForm" @getFromlist="getFromlist"></h-form>
    </div>
    <div class="form-list" v-show="isFormlist">
      <h-formlist @closeFormlist="closeFormlist" :formList="formList"></h-formlist>
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

<script setup lang="ts">
import { onMounted, ref, computed, getCurrentInstance } from 'vue'
import HVideo from '@src/component/video.vue'
import HForm from '@src/component/form.vue'
import HFormlist from '@src/component/formlist.vue'
import { showToast } from '@src/utils'
import { GlobalData } from '@src/types'
import UniTag from '@src/component/uni-tag.vue'
import {
  addMessage,
  addOrUpdateUser,
  code2Session,
  getAllMessageList,
  getCommonConfig,
  getPresentList,
  getUserByOpenId,
  uploadAvatar,
  deleteMessage as deleteMessageApi,
  addOrUpdatePresent
} from '@src/api/wedding-invitation'
import { onShow } from '@dcloudio/uni-app'

const isOpen = ref(false)
const desc = ref('')
const messageList = ref([])
const openId = ref('')
const userInfo = ref(null)
const isForm = ref(false)
const isVideo = ref(false)
const isFormlist = ref(false)
const formList = ref([])
const url = ref('')
const poster = ref('')
const adminsIds = ref([])
const musicPlay = ref(false)
const nickname = ref('')
const formRef = ref(null)

const modalName = ref(null)
const instance = getCurrentInstance()
const globalData: GlobalData = instance.appContext.config.globalProperties.globalData
openId.value = instance.appContext.config.globalProperties.$MpUserData?.openId

const isAdmin = computed(() => {
  return adminsIds.value.indexOf(openId.value) !== -1
})

const avatarUrl = ref(
  'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
)

onShow(() => {
  openId.value = instance.appContext.config.globalProperties.$MpUserData?.openId

  getVideoUrl()
  isVideo.value = false
  isForm.value = false
  isFormlist.value = false
  getMessageList()
})

// onMounted(() => {
//   getVideoUrl()
//   isVideo.value = false
//   isForm.value = false
//   isFormlist.value = false
//   getMessageList()
// })

const formatDateTime = dateTimeString => {
  const dateObject = new Date(dateTimeString)
  const formattedDateTime = `${dateObject.toISOString().slice(0, 19).replace('T', ' ')}`
  return formattedDateTime
}

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
    openId: openId
  }).then(res => {
    addOrUpdateUser({
      openid: openId,
      user: {
        nickName: nickname.value,
        avatarUrl: res.data
      }
    }).then(res => {
      isOpen.value = true
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

const onChooseAvatar = e => {
  avatarUrl.value = e.detail.avatarUrl
}

const getVideoUrl = () => {
  if (import.meta.env.VITE_VUE_WECHAT_TCB === 'true') {
    const db = wx.cloud.database()
    const common = db.collection('common')
    common.get().then(res => {
      url.value = res.data[0].videoUrl
      poster.value = res.data[0].poster
      adminsIds.value = res.data[0].adminOpenIds
    })
  } else {
    getCommonConfig().then(res => {
      url.value = res.data.videoUrl
      poster.value = res.data.poster
      adminsIds.value = res.data.adminOpenIds
    })
  }
}

const copy = item => {
  if (typeof item.customIndex === 'number') {
    uni.setClipboardData({
      data: item.desc,
      success: function () {
        showToast('复制成功')
      }
    })
  }
}

const toMessage = e => {
  if (instance.appContext.config.globalProperties.$MpUserData?.user) {
    isOpen.value = true
  } else {
    modalName.value = 'Modal'
  }
}

const cancel = () => {
  isOpen.value = false
}

const sendMessage = () => {
  if (desc.value) {
    if (import.meta.env.VITE_VUE_WECHAT_TCB === 'true') {
      const db = wx.cloud.database()
      const message = db.collection('message')
      message
        .add({
          data: {
            desc: desc.value,
            type: 'message',
            time: getNowFormatDate(),
            url: userInfo.value.avatarUrl,
            name: userInfo.value.nickName
          }
        })
        .then(res => {
          isOpen.value = false
          desc.value = ''
          getMessageList()
        })
    } else {
      addMessage({
        desc: desc.value,
        type: 'message',
        time: getNowFormatDate(),
        url: instance.appContext.config.globalProperties.$MpUserData?.user.avatarUrl,
        name: instance.appContext.config.globalProperties.$MpUserData?.user.nickName,
        openid: instance.appContext.config.globalProperties.$MpUserData.openId
      }).then(res => {
        isOpen.value = false
        desc.value = ''
        getMessageList()
      })
    }
  } else {
    showToast('说点什么吧~')
  }
}

const deleteMessage = item => {
  wx.showModal({
    title: '提示',
    content: '确认删除？',
    success(res) {
      if (res.confirm) {
        if (import.meta.env.VITE_VUE_WECHAT_TCB === 'true') {
          if (isAdmin.value) {
            wx.cloud
              .callFunction({
                name: 'message',
                data: {
                  id: item.id
                }
              })
              .then(res => {
                desc.value = ''
                getMessageList()
              })
          } else {
            const db = wx.cloud.database()
            const message = db.collection('message')
            message
              .doc(item.id)
              .remove()
              .then(res => {
                desc.value = ''
                getMessageList()
              })
              .catch(e => {
                console.log(e)
              })
          }
        } else {
          deleteMessageApi(item.id).then(res => {
            desc.value = ''
            getMessageList()
          })
        }
      } else if (res.cancel) {
      }
    }
  })
}

const getNowFormatDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const hh = now.getHours()
  const mm = now.getMinutes()
  const ss = now.getSeconds()
  let clock = year + '-'
  if (month < 10) {
    clock += '0'
  }
  clock += month + '-'
  if (day < 10) {
    clock += '0'
  }
  clock += day + ' '
  if (hh < 10) {
    clock += '0'
  }
  clock += hh + ':'
  if (mm < 10) {
    clock += '0'
  }
  clock += mm + ':'
  if (ss < 10) {
    clock += '0'
  }
  clock += ss
  return clock
}

const getMessageList = () => {
  if (import.meta.env.VITE_VUE_WECHAT_TCB === 'true') {
    wx.cloud
      .callFunction({
        name: 'messageList',
        data: {}
      })
      .then(res => {
        messageList.value = (res.result as AnyObject).data.reverse()
      })
  } else {
    getAllMessageList().then(res => {
      messageList.value = res.data
    })
  }
}

const toForm = e => {
  // if (e.target.errMsg === 'getUserInfo:ok') {
  //   wx.getUserInfo({
  //     success: function (res: any) {
  //       userInfo.value = res.userInfo
  //       getOpenId(res.code, 'present')
  //     }
  //   })
  // }

  if (instance.appContext.config.globalProperties.$MpUserData?.user) {
    getIsPresentExist()
  } else {
    modalName.value = 'Modal'
  }
}

const closeForm = () => {
  isForm.value = false
}

const addUser = () => {
  const db = wx.cloud.database()
  const user = db.collection('user')
  user
    .add({
      data: {
        user: userInfo.value
      }
    })
    .then(res => {
      // console.log(res)
    })
}
const getIsPresentExist = () => {
  if (import.meta.env.VITE_VUE_WECHAT_TCB === 'true') {
    const db = wx.cloud.database()
    const present = db.collection('present')
    present
      .where({
        openid: openId.value
      })
      .get()
      .then(res => {
        const formData: any = {
          dataFlag: false,
          id: ''
        }
        if (res.data.length !== 0) {
          formData.name = res.data[0].name
          formData.phone = res.data[0].phone
          formData.count = res.data[0].count
          formData.phoneFlag = true
          formData.id = res.data[0].id
          formData.desc = res.data[0].desc
        }

        formRef.value.updateForm(formData)
        isForm.value = true
      })
  } else {
    getPresentList(openId.value).then(res => {
      const formData: any = {
        dataFlag: false,
        id: '',
        name: instance.appContext.config.globalProperties.$MpUserData?.user.nickName
      }
      if (res?.data?.length) {
        formData.name = res.data?.[0]?.name
        formData.phone = res.data?.[0]?.phone
        formData.count = res.data?.[0]?.count
        formData.phoneFlag = true
        formData.id = res.data?.[0]?.id
        formData.desc = res.data?.[0]?.desc
      }
      formRef.value.updateForm(formData)
      isForm.value = true
    })
  }
}

const getIsExist = () => {
  const db = wx.cloud.database()
  const user = db.collection('user')
  user
    .where({
      openid: openId.value
    })
    .get()
    .then(res => {
      if (res.data.length === 0) {
        addUser()
      }
    })
}

const toVideo = () => {
  isVideo.value = true
  musicPlay.value = false
  if (!globalData.innerAudioContext.paused) {
    musicPlay.value = true
    globalData.innerAudioContext.pause()
  }
}

const closeVideo = () => {
  isVideo.value = false
  if (musicPlay.value) {
    globalData.innerAudioContext.play()
  }
}

const lookList = () => {
  isFormlist.value = true
  getFromlist()
}

const closeFormlist = () => {
  isFormlist.value = false
}

const getFromlist = () => {
  if (import.meta.env.VITE_VUE_WECHAT_TCB === 'true') {
    wx.cloud
      .callFunction({
        name: 'presentList',
        data: {}
      })
      .then(res => {
        formList.value = (res.result as AnyObject).data.reverse().map(x => {
          return {
            count: x.count,
            desc: x.desc,
            name: x.name,
            phone: isAdmin.value ? x.phone : x.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
            id: x.id,
            openid: x.openid
          }
        })
      })
  } else {
    getPresentList().then(res => {
      formList.value = res.data.reverse().map(x => {
        return {
          count: x.count,
          desc: x.desc,
          name: x.name,
          phone: isAdmin.value ? x.phone : x.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
          id: x.id,
          openid: x.openid
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.cu-form-group .title {
  min-width: calc(4em + 15px);
}
.message {
  height: 100%;
  width: 100%;
  .box {
    height: 100%;
    background: #f9e0d9;
    width: 100%;
    .place {
      height: 20rpx;
    }
    .place-end {
      height: 160rpx;
    }
    .item {
      width: 695rpx;
      margin-left: 30rpx;
      border-radius: 16rpx;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 30rpx;
      margin-bottom: 20rpx;
      .left {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50rpx;
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        min-height: 100rpx;
        align-items: flex-start;
        width: 480rpx;
        margin-left: 20rpx;
        .top {
          height: 40rpx;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .top-l {
            height: 50rpx;
            line-height: 50rpx;
            color: #444;
            font-size: 28rpx;
          }
          .top-r {
            height: 50rpx;
            line-height: 50rpx;
            color: #999;
            font-size: 24rpx;
          }
        }
        .con {
          line-height: 50rpx;
          color: #666;
          font-size: 28rpx;
          white-space: pre-wrap;
          width: 450rpx;
        }
        .delete {
          display: flex;
          line-height: 50rpx;
          width: 48rpx;
          .delete_icon {
            width: 36rpx;
            height: 36rpx;
          }
        }
      }
    }
  }
  .bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 160rpx;
    background: rgba(255, 255, 255, 0.75);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .left,
    .right {
      height: 80rpx;
      line-height: 80rpx;
      font-size: 28rpx;
      width: 300rpx;
      color: #fff;
      background: #ed695d;
      margin: 0 20rpx 0 0;
    }
    .right {
      margin: 0;
    }
  }
  .dialog {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 30rpx;
    z-index: 6669;
    background: #fff;
    width: 100%;
    .avatar-wrapper {
      padding: 0;
      width: 56px !important;
      border-radius: 8px;
      margin-top: 40px;
      margin-bottom: 40px;
    }

    .avatar {
      display: block;
      width: 56px;
      height: 56px;
    }
    textarea {
      height: 200rpx;
      line-height: 42rpx;
      font-size: 30rpx;
      color: #333;
      resize: none;
      outline: none;
      padding: 30rpx;
      width: 690rpx;
      background: #f5f5f5;
      &::-webkit-input-placeholder {
        font-size: 30rpx;
        color: #999;
      }
    }
    .btn {
      height: 120rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      .left,
      .right {
        height: 80rpx;
        line-height: 80rpx;
        font-size: 28rpx;
        flex: 2;
        color: #fff;
        background: #ed695d;
        margin: 0 20rpx 0 30rpx;
      }
      .right {
        flex: 1;
      }
    }
  }
  .video-dialog {
    position: fixed;
    right: 10rpx;
    top: 200rpx;
    width: 100rpx;
    height: 100rpx;
    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
    background: #fff;
    border-radius: 16rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .form-dialog {
    position: fixed;
    right: 10rpx;
    top: 320rpx;
    width: 100rpx;
    height: 100rpx;
    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
    background: #fff;
    border-radius: 50rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .video,
  .form,
  .form-list {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 99;
  }
  .form-list {
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>
