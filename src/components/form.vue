<template>
    <div class="form">
        <image class="head-img" src="../../static/images/green-flower.png"/>
        <p class="title">
            <span>* </span>姓名
        </p>
        <input type="text" placeholder="怎么称呼您呢？" v-model="name" maxlength="6">
        <p class="title">
            <span>* </span>电话
        </p>
        <input type="number" placeholder="请填写有效的手机号码" v-model="phone" @input="checkPhone" maxlength="11">
        <p class="title">
            几人出席
        </p>
        <radio-group @change="radioChange" class="group">
            <label class="radio" v-for="(item, index) in list" :key="index">
                <radio :value="item.name" :checked="item.checked" />
                {{item.value}}
            </label>
        </radio-group>
        <p class="title">
            备注
        </p>
        <textarea focus="true" maxlength="80" class="desc" placeholder="请填写您的备注需求" name="textarea" placeholder-style="color:#ccc;" v-model="desc"/>
        <div class="btn">
            <button class="left" @tap="submit">确认提交</button>
            <button class="right" @tap="cancel">取消</button>
        </div>
    </div>
</template>

<script>
import tools from 'common/js/h_tools'
export default {
  name: 'Form',
  data () {
    return {
      list: [{
        name: '自己出席', value: '自己出席', checked: true
      }, {
        name: '两人出席', value: '两人出席', checked: false
      }, {
        name: '三人出席', value: '三人出席', checked: false
      }, {
        name: '三人以上', value: '三人以上', checked: false
      }],
      desc: '',
      name: '',
      phone: '',
      count: '自己出席',
      phoneFlag: false,
      _id: ''
    }
  },
  methods: {
    cancel () {
      const that = this
      that.$emit('closeForm')
    },

    radioChange (e) {
      const that = this
      that.count = e.mp.detail.value
      that.list.forEach(item => {
        if (item.name === that.count) {
          item.checked = true
        } else {
          item.checked = false
        }
      })
    },

    submit () {
      const that = this
      if (that.name) {
        if (that.phoneFlag) {
          that.addPresent()
        } else {
          tools.showToast('请正确输入您的手机号码')
        }
      } else {
        tools.showToast('请填写您的姓名')
      }
    },

    checkPhone () {
      let that = this
      let reg = /^(1[3-9][0-9])\d{8}$/
      if (that.phone.length === 11) {
        if (reg.test(that.phone)) {
          that.phoneFlag = true
        } else {
          that.phoneFlag = false
          tools.showToast('手机号码格式不正确')
        }
      }
    },

    addPresent () {
      const that = this
      const db = wx.cloud.database()
      const present = db.collection('present')
      if (this._id !== '') {
        present.doc(that._id).update({
          data: {
            name: that.name,
            phone: that.phone,
            count: that.count,
            desc: that.desc
          },
          success: function (res) {
            that.name = ''
            that.phone = ''
            that.count = '自己出席'
            that.desc = ''
            that.$emit('closeForm')
          }
        })
      } else {
        present.add({
          data: {
            name: that.name,
            phone: that.phone,
            count: that.count,
            desc: that.desc
          }
        }).then(res => {
          that.name = ''
          that.phone = ''
          that.count = '自己出席'
          that.desc = ''
          that.$emit('closeForm')
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.form
    position absolute
    top 20rpx
    width 690rpx
    margin-left 30rpx
    box-shadow 0 0 10rpx rgba(0, 0, 0, 0.1)
    background #fff
    border-radius 16rpx
    .head-img
        height 180rpx
        width 100%
    .title
        height 60rpx
        line-height 60rpx
        color #333
        font-size 24rpx
        margin-left 20rpx
        span
            color red
    input
        height 80rpx
        padding 0 20rpx
        background #f5f5f5
        color #333
        font-size 24rpx
    .group
        display flex
        flex-wrap wrap
        justify-content flex-start
        align-items flex-start
        .radio
            width 45%
            margin-left 5%
            font-size 24rpx
            margin-bottom 20rpx
    textarea
        height 140rpx
        line-height 42rpx
        font-size 24rpx
        color #333
        resize none
        outline none
        padding 20rpx
        width 650rpx
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
</style>
