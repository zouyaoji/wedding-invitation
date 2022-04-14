<!--
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2022-04-13 09:29:22
 * @LastEditTime: 2022-04-14 14:17:07
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \wedding-invitation\src\pages\message\index.vue
-->
<template>
  <div class="message">
    <scroll-view scroll-y class="box">
      <p class="place"></p>
      <div class="item" v-for="(item, index) in messageList" :key="index">
        <image class="left" :src="item.url" />
        <div class="right">
          <div class="top">
            <div class="delete" @tap="deleteMessage(item)">
              <image
                src="../../static/images/close.png"
                class="delete_icon"
                v-if="item._openid === openId || isAdmin"
              />
            </div>
            <span class="top-l">{{ item.name }}</span>
            <span class="top-r">{{ item.time }}</span>
          </div>
          <p class="con">{{ item.desc }}</p>
        </div>
      </div>
      <p class="place-end"></p>
    </scroll-view>
    <div class="bottom">
      <button class="left" lang="zh_CN" open-type="getUserInfo" @getuserinfo="toMessage">说点啥吧</button>
      <button class="right" open-type="getUserInfo" @getuserinfo="toForm">我要出席</button>
    </div>
    <div class="dialog" v-show="isOpen">
      <textarea
        focus="true"
        maxlength="80"
        class="desc"
        placeholder="在这里输入您想要说的话"
        name="textarea"
        placeholder-style="color:#ccc;"
        v-model="desc"
      />
      <div class="btn">
        <button class="left" @tap="sendMessage">发送留言</button>
        <button class="right" @tap="cancel">取消</button>
      </div>
    </div>
    <div class="video-dialog" @tap="toVideo" v-if="url !== '' && url !== undefined">
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
</template>

<script setup lang="ts">
import { onMounted, ref, computed, getCurrentInstance } from 'vue'
import HVideo from '@src/component/video.vue'
import HForm from '@src/component/form.vue'
import HFormlist from '@src/component/formlist.vue'
import { showToast } from '@src/utils'
import { GlobalData } from '@src/types'

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

const formRef = ref(null)

const instance = getCurrentInstance()
const globalData: GlobalData = instance.appContext.config.globalProperties.globalData

const isAdmin = computed(() => {
  return adminsIds.value.indexOf(openId.value) !== -1
})

onMounted(() => {
  getVideoUrl()
  isVideo.value = false
  isForm.value = false
  isFormlist.value = false
  getMessageList()
})

const getVideoUrl = () => {
  const db = wx.cloud.database()
  const common = db.collection('common')
  common.get().then(res => {
    url.value = res.data[0].videoUrl
    poster.value = res.data[0].poster
    adminsIds.value = res.data[0].adminOpenId
  })
}

const toMessage = e => {
  if (e.target.errMsg === 'getUserInfo:ok') {
    wx.getUserInfo({
      success: function (res) {
        userInfo.value = res.userInfo
        isOpen.value = true
        getOpenId()
      }
    })
  }
}

const cancel = () => {
  isOpen.value = false
}

const sendMessage = () => {
  if (desc.value) {
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
    showToast('说点什么吧~')
  }
}

const deleteMessage = item => {
  wx.showModal({
    title: '提示',
    content: '确认删除？',
    success(res) {
      if (res.confirm) {
        if (isAdmin.value) {
          wx.cloud
            .callFunction({
              name: 'message',
              data: {
                _id: item._id
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
            .doc(item._id)
            .remove()
            .then(res => {
              desc.value = ''
              getMessageList()
            })
            .catch(e => {
              console.log(e)
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
  wx.cloud
    .callFunction({
      name: 'messageList',
      data: {}
    })
    .then(res => {
      messageList.value = (res.result as AnyObject).data.reverse()
    })
}

const toForm = e => {
  if (e.target.errMsg === 'getUserInfo:ok') {
    wx.getUserInfo({
      success: function (res) {
        userInfo.value = res.userInfo
        getOpenId('present')
      }
    })
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

const getOpenId = (type?) => {
  wx.cloud
    .callFunction({
      name: 'user',
      data: {}
    })
    .then(res => {
      openId.value = (res.result as AnyObject).openid
      if (type === 'present') {
        getIsPresentExist()
      } else {
        getIsExist()
      }
    })
}

const getIsPresentExist = () => {
  const db = wx.cloud.database()
  const present = db.collection('present')
  present
    .where({
      _openid: openId.value
    })
    .get()
    .then(res => {
      const formData: any = {
        dataFlag: false,
        _id: ''
      }
      if (res.data.length !== 0) {
        formData.name = res.data[0].name
        formData.phone = res.data[0].phone
        formData.count = res.data[0].count
        formData.phoneFlag = true
        formData._id = res.data[0]._id
      }

      formRef.value.updateForm(formData)
      isForm.value = true
    })
}

const getIsExist = () => {
  const db = wx.cloud.database()
  const user = db.collection('user')
  user
    .where({
      _openid: openId.value
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
          _id: x._id,
          _openid: x._openid
        }
      })
    })
}
</script>

<style lang="scss" scoped>
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
      width: 630rpx;
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
    z-index: 99;
    background: #fff;
    width: 100%;
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
