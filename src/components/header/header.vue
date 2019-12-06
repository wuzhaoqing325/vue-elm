<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <h1 class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </h1>
        <div class="desc">
          <p>{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
        </div>
        <div class="extra" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="supports" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin" @click="showDetail">
      <span class="icon"></span><span class="text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-content">
          <h1 class="title">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <v-line :text="lineText1" v-if="seller.supports"></v-line>
          <div class="detail-supports" v-if="seller.supports">
            <div class="supports-wrapper">
              <ul>
                <li v-for="(support,index) in seller.supports" :key="support.id" class="support-item">
                  <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                  <span class="text">{{seller.supports[index].description}}</span>
                </li>
              </ul>
            </div>
          </div>
          <v-line :text="lineText2"></v-line>
          <div class="detail-bulletin">
            <div class="bulletin-text">{{seller.bulletin}}</div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
    </div>
  </div>
</template>
<script>
import star from 'components/star/star'
import line from 'components/line/line'
export default{
  components: {
    star,
    'v-line': line
  },
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false,
      lineText1: '优惠信息',
      lineText2: '商家公告'
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    hideDetail () {
      this.detailShow = false
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.header
  position:relative
  overflow:hidden
  color:#fff
  background:rgba(7,17,27,0.5)
  .content-wrapper
    padding:24px 12px 18px 24px
    font-size:0
    backdrop-filter:blur(10px)
    .avatar
      display:inline-block
      vertical-align:top
      margin-right:16px
      img
        border-radius:2px
    .content
      display:inline-block
      vertical-align:top
      padding:2px 0
      .title
        font-size:0
        .brand
          display:inline-block
          vertical-align:top
          width:30px
          height:18px
          bg-image('brand')
          background-size:30px 18px
          background-repeat:no-repeat
          margin-right:6px
        .name
          display:inline-block
          vertical-align:top
          line-height:18px
          font-size:16px
          font-weight:bold
      .desc
        margin:8px 0 10px 0
        line-height:12px
        font-size:12px
      .extra
        font-size:0
        .icon
          display:inline-block
          vertical-align:top
          width:12px
          height:12px
          background-size:12px 12px
          background-repeat:no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .text
          margin-left:4px
          line-height:12px
          font-size:10px
    .supports
      position:absolute
      right:12px
      bottom:14px
      height:24px
      line-height:24px
      padding:0 8px
      border-radius:14px
      background:rgba(0,0,0,0.2)
      font-size:10px
      .count
        margin-right:2px
      .icon-keyboard_arrow_right
        line-height:24px
  .bulletin
    position:relative
    height:28px
    line-height:28px
    padding:0 22px 0 12px
    white-space:nowrap
    overflow:hidden
    text-overflow:ellipsis
    background:rgba(7,17,27,0.2)
    .icon
      display:inline-block
      vertical-align:top
      margin-top:8px
      width:22px
      height:12px
      bg-image('bulletin')
      background-size:22px 12px
      background-repeat:no-repeat
    .text
      vertical-align:top
      font-size:10px
      margin:0 4px
    .icon-keyboard_arrow_right
      position:absolute
      right:12px
      top:8px
      font-size:10px
  .background
    position:absolute
    top:0
    left:0
    width:100%
    height:100%
    z-index:-1
    filter:blur(10px)
  .detail
    position:fixed
    top:0
    left:0
    width:100%
    height:100%
    padding-left:36px
    padding-right:36px
    box-sizing:border-box
    overflow:auto
    z-index:100
    opacity:1
    background:rgba(7,17,27,0.8)
    backdrop-filter:blur(10px)
    &.fade-enter-active,&.fade-leave-active
      transition:all 0.5s
    &.fade-enter,&.fade-leave-active
      opacity:0
      background:rgba(7,17,27,0)
    .detail-content
      width:100%
      min-height:100%
      margin-top:64px
      padding-bottom:64px
      color:#fff
      .title
        margin-bottom:16px
        line-height:16px
        font-size:16px
        font-weight:700
        text-align:center
      .star-wrapper
        text-align:center
        margin-bottom:28px
      .detail-supports
        .supports-wrapper
          padding:0 12px
          margin:24px 0 28px
          .support-item
            font-size:0
            margin-bottom:12px
            &:last-child
              margin-bottom:0
            .icon
              display:inline-block
              vertical-align:top
              width:16px
              height:16px
              background-size:16px 16px
              background-repeat:no-repeat
              &.decrease
                bg-image('decrease_2')
              &.discount
                bg-image('discount_2')
              &.guarantee
                bg-image('guarantee_2')
              &.invoice
                bg-image('invoice_2')
              &.special
                bg-image('special_2')
            .text
              display:inline-block
              vertical-align:top
              margin-left:6px
              line-height:12px
              padding:2px 0
              font-size:12px
      .detail-bulletin
        margin-top:24px
        padding:0 12px
        .bulletin-text
          line-height:24px
          font-size:12px
    .detail-close
      position:relative
      margin:-64px auto 0 auto
      clear:both
      width:32px
      font-size:32px
      color:rgba(255,255,255,0.5)
</style>
