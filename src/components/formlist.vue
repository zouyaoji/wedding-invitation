<template>
    <div>
        <scroll-view class="formlist" scroll-y>
            <li class="item" v-for="(item, index) in formList" :key="index">
                <div class="item-top">
                    <span class="left">{{item.name}}</span>
                    <span class="right">{{item.phone}}</span>
                </div>
                <div class="item-middle">
                    <p class="address">
                        <span>{{item.count}}</span>
                        <span v-if="item.desc">备注：{{item.desc}}</span>
                    </p>
                </div>
            </li>
        </scroll-view>
        <image src="../../static/images/close1.png" @tap="close"/>
    </div>
</template>

<script>
export default {
  name: 'Formlist',
  props: ['formList'],
  methods: {
    close () {
      const that = this
      that.$emit('closeFormlist')
    }
  },

  watch: {
    formList (newValue, oldValue) {
      if (newValue) {
        // console.log(newValue)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.formlist
    position absolute
    top 20rpx
    width 690rpx
    height 800rpx
    margin-left 30rpx
    box-shadow 0 0 10rpx rgba(0, 0, 0, 0.1)
    border-radius 16rpx
    .bottom
        height 40rpx
        line-height 40rpx
        font-size 22rpx
        color #ccc
        text-align center
        padding 4rpx 0 20rpx
    .item
        background #fff
        position relative
        margin-bottom 16rpx
        border-radius 16rpx
        .item-top
            height 80rpx
            padding 0 30rpx
            display flex
            justify-content space-between
            align-items center
            .left
                height 42rpx
                line-height 42rpx
                font-size 30rpx
                color #333
            .right
                height 30rpx
                line-height 30rpx
                font-size 22rpx
                color #999
        .item-middle
            padding-left 30rpx
            .address
                width 100%
                height 72rpx
                line-height 72rpx
                color #666
                font-size 26rpx
                display flex
                justify-content space-between
                align-items center
                span
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                    &:nth-of-type(1)
                        width 120rpx
                        margin-right 20rpx
                    &:nth-of-type(2)
                        flex 1
                        margin-right 30rpx
            .concat
                width 720rpx
                height 26rpx
                line-height 26rpx
                color #666
                font-size 26rpx
                display flex
                justify-content flex-start
                align-items center
                span
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                    &:nth-of-type(1)
                        margin-right 40rpx
            .remark
                line-height 40rpx
                font-size 26rpx
                color #333
                margin 15rpx 0
                width 690rpx
                white-space pre-wrap
            .no-remark
                height 15rpx
image
    width 80rpx
    height 80rpx
    margin 0 auto
    position absolute
    bottom 100rpx
    left 50%
    margin-left -40rpx
</style>
