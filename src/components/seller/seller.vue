<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="title">
      <div class="name">{{seller.name}}</div>
      <div class="star-wrapper">
        <star :size="36" :score="seller.score"></star>
        <span class="ratingCount">({{seller.ratingCount}})</span>
        <span class="sellCount">月售{{seller.sellCount}}单</span>
      </div>
      <div class="favorite" @click="toggleFavorite">
        <div class="icon-favorite" :class="{'active':favorite}"></div>
        <div class="text">{{favoriteText}}</div>
      </div>
    </div>
    <div class="list">
      <div class="list-item">
        <div class="text">起送价</div>
        <div class="data"><div class="stress">{{seller.minPrice}}</div>元</div>
      </div>
      <div class="list-item">
        <div class="text">商家配送</div>
        <div class="data"><div class="stress">{{seller.deliveryPrice}}</div>元</div>
      </div>
      <div class="list-item">
        <div class="text">平均配送时间</div>
        <div class="data"><div class="stress">{{seller.deliveryTime}}</div>分钟</div>
      </div>
    </div>
    <split></split>
    <div class="bulletin">
      <div class="bulletin-title">公告与活动</div>
      <div class="bulletin-text">
        <p>{{seller.bulletin}}</p>
      </div>
    </div>
    <div class="supports">
      <ul>
        <li v-for="support in seller.supports" class="support-item" :key="support.id">
          <span class="icon" :class="classMap[support.type]"></span>
          <span class="description">{{support.description}}</span>
        </li>
      </ul>
    </div>
    <split></split>
    <div class="pics">
      <div class="pictrue-title">商家实景</div>
      <div class="pictrue-wrapper" ref="picWrapper">
        <ul ref="picList">
          <li v-for="pic in seller.pics" class="pictrue-item" :key="pic.id">
            <img :src="pic" width="120" height="90">
          </li>
        </ul>
      </div>
    </div>
    <split></split>
    <div class="infos">
      <div class="infos-title">商家信息</div>
      <ul>
        <li v-for="info in seller.infos" :key="info.id" class="info-item"><p class="text">{{info}}</p></li>
      </ul>
    </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import star from 'components/star/star'
import split from 'components/split/split'
import {loadFromLocal, saveToLocal} from 'common/js/store'
export default{
  data () {
    return {
      favorite: (() => {
        return loadFromLocal(this.seller.id, 'favorite', false)
      })()
    }
  },
  components: {
    star,
    split
  },
  props: {
    seller: Object
  },
  computed: {
    favoriteText () {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  },
  watch: {
    'seller' () {
      this.$nextTick(() => {
        this._initScroll()
        this._initPics()
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this._initScroll()
      this._initPics()
    })
  },
  methods: {
    toggleFavorite () {
      if (!event._constructed) {
        return
      }
      this.favorite = !this.favorite
      saveToLocal(this.seller.id, 'favorite', this.favorite)
    },
    _initScroll () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        })
      } else {
        this.scroll.refresh()
      }
    },
    _initPics () {
      if (this.seller.pics) {
        let picWidth = 120
        let margin = 6
        let width = (picWidth + margin) * this.seller.pics.length - margin
        this.$refs.picList.style.width = width + 'px'
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              click: true,
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          } else {
            this.picScroll.refresh()
          }
        })
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.seller
  position:absolute
  top:174px
  left:0
  bottom:0
  overflow:hidden
  width:100%
  .seller-content
    .title
      position:relative
      margin:0 18px 0 18px
      padding:18px 0
      border-1px(rgba(7,17,27,0.1))
      .name
        // margin-top:18px
        margin-bottom:8px
        line-height:14px
        font-size:14px
        color:rgb(7,17,27)
      .star-wrapper
        font-size:0
        .star
          display:inline-block
          vertical-align:top
        .ratingCount
          margin:0 12px 0 8px
          display:inline-block
          vertical-align:top
          line-height:18px
          font-size:10px
        .sellCount
          display:inline-block
          vertical-align:top
          line-height:18px
          font-size:10px
      .favorite
        position:absolute
        width:50px
        top:18px
        right:11px
        text-align:center
        .icon-favorite
          margin-bottom:4px
          line-height:24px
          font-size:24px
          color:#d4d6d9
          &.active
            color:rgb(240,20,20)
        .text
          line-height:10px
          font-size:10px
          color:rgb(77,85,93)
    .list
      display:flex
      margin:0 18px
      .list-item
        flex:1
        margin:18px 0
        border-right:1px solid rgba(7,17,27,0.1)
        text-align:center
        &:last-child
          border-right:none
        .text
          line-height:10px
          margin-bottom:4px
          font-size:10px
          color:rgb(147,153,159)
        .data
          line-height:24px
          font-size:10px
          .stress
            display:inline-block
            font-size:24px
    .bulletin
      margin:18px 18px 0 18px
      border-1px(rgba(7,17,27,0.1))
      .bulletin-title
        line-height:14px
        margin-bottom:8px
        font-size:14px
        color:rgb(7,17,27)
      .bulletin-text
        padding:0 12px 16px 12px
        line-height:24px
        font-size:12px
        color:rgb(240,20,20)
    .supports
      margin:0 18px
      .support-item
        padding:16px 12px
        font-size:0
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
        .icon
          display:inline-block
          vertical-align:top
          margin-right:6px
          width:16px
          height:16px
          background-size:16px 16px
          background-repeat:no-repeat
          &.decrease
            bg-image('decrease_4')
          &.discount
            bg-image('discount_4')
          &.guarantee
            bg-image('guarantee_4')
          &.invoice
            bg-image('invoice_4')
          &.special
            bg-image('special_4')
        .description
          display:inline-block
          vertical-align:top
          line-height:16px
          font-size:12px
          color:rgb(7,17,27)
    .pics
      padding:18px
      .pictrue-title
        line-height:14px
        margin-bottom:12px
        font-size:14px
        color:rgb(7,17,27)
      .pictrue-wrapper
        width:100%
        overflow:hidden
        white-space:nowrap
        .pictrue-item
          display:inline-block
          margin-right:6px
          width:120px
          height:90px
          &:last-child
            margin-right:0
    .infos
      padding:18px 18px 0 18px
      .infos-title
        line-height:14px
        padding-bottom:12px
        border-1px(rgba(7,17,27,0.1))
        font-size:14px
        color:rgb(7,17,27)
      .info-item
        padding:16px 12px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
        .text
          line-height:16px
          font-size:12px
          color:rgb(7,17,27)
</style>
