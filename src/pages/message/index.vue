<template>
    <div class="message">
        <scroll-view
            scroll-y
            @scroll="scroll"
            class="box"
        >
            <p class="place"></p>
            <div class="item" v-for="(item, index) in messageList" :key="index">
                <image class="left" :src="item.url"/>
                <div class="right">
                    <div class="top">
                      <div class="delete" @tap="deleteMessage(item)">
                        <image src="../../static/images/close.png" class="delete_icon" v-if="item._openid === openId || isAdmin"/>
                      </div>
                      <span class="top-l">{{item.name}}</span>
                      <span class="top-r">{{item.time}}</span>
                    </div>
                    <p class="con">{{item.desc}}</p>
                </div>
            </div>
            <p class="place-end"></p>
        </scroll-view>
        <div class="bottom">
            <button class="left" lang="zh_CN" open-type="getUserInfo" @getuserinfo="toMessage">说点啥吧</button>
            <button class="right" open-type="getUserInfo" @getuserinfo="toForm">我要出席</button>
        </div>
        <div class="dialog" v-show="isOpen">
            <textarea focus="true" maxlength="80" class="desc" placeholder="在这里输入您想要说的话" name="textarea" placeholder-style="color:#ccc;" v-model="desc"/>
            <div class="btn">
                <button class="left" @tap="sendMessage">发送留言</button>
                <button class="right" @tap="cancel">取消</button>
            </div>
        </div>
        <div class="video-dialog"  @tap="toVideo" v-if="url !== '' && url !== undefined">
            <image src="../../static/images/video1.png"/>
        </div>
        <div class="form-dialog" @tap="lookList">
            <image src="../../static/images/form.png"/>
        </div>
        <div class="video" v-if="isVideo">
            <h-video @closeVideo="closeVideo" :url="url" :poster="poster"></h-video>
        </div>
        <div class="form" ref="form" v-show="isForm">
            <h-form @closeForm="closeForm" @getFromlist="getFromlist"></h-form>
        </div>
        <div class="form-list" v-show="isFormlist">
            <h-formlist @closeFormlist="closeFormlist" :formList="formList"></h-formlist>
        </div>
    </div>
</template>

<script>
import HVideo from 'components/video'
import HForm from 'components/form'
import HFormlist from 'components/formlist'
import tools from 'common/js/h_tools'
export default {
  name: 'Message',
  components: {
    HVideo,
    HForm,
    HFormlist
  },
  data () {
    return {
      isOpen: false,
      desc: '',
      messageList: [],
      openId: '',
      userInfo: '',
      isForm: false,
      isVideo: false,
      isFormlist: false,
      formList: [],
      url: '',
      poster: ''
    }
  },
  onLoad () {
    this.getVideoUrl()
  },
  onShow () {
    const that = this
    that.isVideo = false
    that.isForm = false
    that.isFormlist = false
    that.getMessageList()
  },
  computed: {
    isAdmin: function () {
      return this.openId === 'o2g_z5Bccke5PW_JIUCB9_LOTV48'
    }
  },
  methods: {
    getVideoUrl () {
      const that = this
      const db = wx.cloud.database()
      const common = db.collection('common')
      common.get().then(res => {
        that.url = res.data[0].videoUrl
        that.poster = res.data[0].poster
      })
    },
    toMessage (e) {
      const that = this
      if (e.target.errMsg === 'getUserInfo:ok') {
        wx.getUserInfo({
          success: function (res) {
            that.userInfo = res.userInfo
            that.isOpen = true
            that.getOpenId()
          }
        })
      }
    },

    cancel () {
      const that = this
      that.isOpen = false
    },

    sendMessage () {
      const that = this
      if (that.desc) {
        const db = wx.cloud.database()
        const message = db.collection('message')
        message.add({
          data: {
            desc: that.desc,
            type: 'message',
            time: that.getNowFormatDate(),
            url: that.userInfo.avatarUrl,
            name: that.userInfo.nickName
          }
        }).then(res => {
          that.isOpen = false
          that.desc = ''
          that.getMessageList()
        })
      } else {
        tools.showToast('说点什么吧~')
      }
    },
    deleteMessage (item) {
      const that = this
      wx.showModal({
        title: '提示',
        content: '确认删除？',
        success (res) {
          if (res.confirm) {
            if (that.isAdmin) {
              wx.cloud.callFunction({
                name: 'message',
                data: {
                  _id: item._id
                }
              }).then(res => {
                that.desc = ''
                that.getMessageList()
              })
            } else {
              const db = wx.cloud.database()
              const message = db.collection('message')
              message.doc(item._id).remove().then(res => {
                that.desc = ''
                that.getMessageList()
              }).catch(e => {
                console.log(e)
              })
            }
          } else if (res.cancel) {
          }
        }
      })
    },
    getNowFormatDate () {
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
    },

    getMessageList () {
      const that = this
      wx.cloud.callFunction({
        name: 'messageList',
        data: {}
      }).then(res => {
        that.messageList = res.result.data.reverse()
      })
    },

    toForm (e) {
      const that = this
      if (e.target.errMsg === 'getUserInfo:ok') {
        wx.getUserInfo({
          success: function (res) {
            that.userInfo = res.userInfo
            that.getOpenId('present')
          }
        })
      }
    },
    closeForm () {
      const that = this
      that.isForm = false
    },

    addUser () {
      const that = this
      const db = wx.cloud.database()
      const user = db.collection('user')
      user.add({
        data: {
          user: that.userInfo
        }
      }).then(res => {
        // console.log(res)
      })
    },

    getOpenId (type) {
      const that = this
      wx.cloud.callFunction({
        name: 'user',
        data: {}
      }).then(res => {
        that.openId = res.result.openid
        if (type === 'present') {
          that.getIsPresentExist()
        } else {
          that.getIsExist()
        }
      })
    },

    getIsPresentExist () {
      const that = this
      const db = wx.cloud.database()
      const present = db.collection('present')
      present.where({
        _openid: that.openId
      }).get().then(res => {
        if (res.data.length !== 0) {
          that.$children[1].name = res.data[0].name
          that.$children[1].phone = res.data[0].phone
          that.$children[1].list.forEach(item => {
            item.checked = res.data[0].count === item.name
          })
          that.$children[1]._id = res.data[0]._id
          that.$children[1].phoneFlag = true
        } else {
          that.$children[1].dataFlag = false
          that.$children[1]._id = ''
        }
        that.isForm = true
      })
    },

    getIsExist () {
      const that = this
      const db = wx.cloud.database()
      const user = db.collection('user')
      user.where({
        _openid: that.openId
      }).get().then(res => {
        if (res.data.length === 0) {
          that.addUser()
        }
      })
    },

    toVideo () {
      const that = this
      that.isVideo = true
      this.musicPlay = false
      if (!this.globalData.innerAudioContext.paused) {
        this.musicPlay = true
        this.globalData.innerAudioContext.pause()
      }
    },

    closeVideo () {
      const that = this
      that.isVideo = false
      if (this.musicPlay) {
        this.globalData.innerAudioContext.play()
      }
    },

    lookList () {
      const that = this
      that.isFormlist = true
      that.getFromlist()
    },

    closeFormlist () {
      const that = this
      that.isFormlist = false
    },

    getFromlist () {
      const that = this
      wx.cloud.callFunction({
        name: 'presentList',
        data: {}
      }).then(res => {
        that.formList = res.result.data.reverse().map(x => {
          return {
            count: x.count,
            desc: x.desc,
            name: x.name,
            phone: that.isAdmin ? x.phone : x.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
            _id: x._id,
            _openid: x._openid
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.message
    height 100%
    width 100%
    .box
        height 100%
        background #F9E0D9
        width 100%
        .place
            height 20rpx
        .place-end
            height 160rpx
        .item
            width 630rpx
            margin-left 30rpx
            border-radius 16rpx
            background #fff
            display flex
            justify-content center
            align-items flex-start
            padding 30rpx
            margin-bottom 20rpx
            .left
                width 100rpx
                height 100rpx
                border-radius 50rpx
            .right
                display flex
                flex-direction column
                justify-content flex-start
                min-height 100rpx
                align-items flex-start
                width 480rpx
                margin-left 20rpx
                .top
                    height 40rpx
                    width 100%
                    display flex
                    justify-content space-between
                    align-items center
                    .top-l
                        height 50rpx
                        line-height 50rpx
                        color #444
                        font-size 28rpx
                    .top-r
                        height 50rpx
                        line-height 50rpx
                        color #999
                        font-size 24rpx
                .con
                    line-height 50rpx
                    color #666
                    font-size 28rpx
                    white-space pre-wrap
                    width 450rpx
                .delete
                    display flex
                    line-height 50rpx
                    width 48rpx
                    .delete_icon
                        width:36rpx
                        height:36rpx
    .bottom
        position fixed
        bottom 0
        left 0
        height 160rpx
        background rgba(255, 255, 255, 0.75)
        width 100%
        display flex
        justify-content center
        align-items center
        .left, .right
            height 80rpx
            line-height 80rpx
            font-size 28rpx
            width 300rpx
            color #fff
            background #ED695D
            margin 0 20rpx 0 0
        .right
            margin 0
    .dialog
        position fixed
        bottom 0
        left 0
        z-index 99
        background #fff
        width 100%
        textarea
            height 200rpx
            line-height 42rpx
            font-size 30rpx
            color #333
            resize none
            outline none
            padding 30rpx
            width 690rpx
            background #f5f5f5
            &::-webkit-input-placeholder
                font-size 30rpx
                color #999
        .btn
            height 120rpx
            display flex
            justify-content center
            align-items center
            .left, .right
                height 80rpx
                line-height 80rpx
                font-size 28rpx
                flex 2
                color #fff
                background #ED695D
                margin 0 20rpx 0 30rpx
            .right
                flex 1
    .video-dialog
        position fixed
        right 10rpx
        top 200rpx
        width 100rpx
        height 100rpx
        box-shadow 0 0 10rpx rgba(0, 0, 0, 0.1)
        background #fff
        border-radius 16rpx
        image
            width 100%
            height 100%
    .form-dialog
        position fixed
        right 10rpx
        top 320rpx
        width 100rpx
        height 100rpx
        box-shadow 0 0 10rpx rgba(0, 0, 0, 0.1)
        background #fff
        border-radius 50rpx
        image
            width 100%
            height 100%
    .video, .form, .form-list
        position fixed
        top 0
        bottom 0
        left 0
        right 0
        background #fff
        z-index 99
    .form-list
        background rgba(0, 0, 0, 0.5)
</style>
