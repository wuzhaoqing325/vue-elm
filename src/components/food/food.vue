<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="header-image">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <div class="overview">
            <h1 class="name">{{food.name}}</h1>
            <div class="desc">
              <span class="count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥<span class="data">{{food.price}}</span></span>
              <span class="old" v-if="food.oldPrice">￥<span class="data">{{food.oldPrice}}</span></span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol @add="addFood" :food="food"></cartcontrol>
            </div>
            <transition name="fade">
              <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count||food.count === 0">加入购物车</div>
            </transition>
          </div>
          <split></split>
          <div class="info" v-show="food.info">
            <h1 class="title">商品介绍</h1>
            <p class="content">{{food.info}}</p>
          </div>
          <split v-show="food.info"></split>
          <div class="ratings">
            <h1 class="title">商品评价</h1>
            <div class="ratingselect-wrapper">
              <ratingselect @select="selectRating" @toggle="toggleContent" :ratings="food.ratings" :selectType="selectType" :onlyContent="onlyContent" :desc="desc"></ratingselect>
            </div>
            <div class="content-wrapper">
              <ul class="content">
                <li v-for="rating in food.ratings" :key="rating.id" class="rating-item border-1px" v-show="needShow(rating.rateType,rating.text)">
                  <div class="time">{{rating.rateTime | formatDate}}</div>
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <span class="avatar">
                      <img :src="rating.avatar" width="12" height="12">
                    </span>
                  </div>
                  <div class="rating">
                    <i :class="[{'icon-thumb_up':rating.rateType === 0},{'icon-thumb_down':rating.rateType === 1}]"></i>
                    <span class="text">{{rating.text}}</span>
                  </div>
                </li>
              </ul>
              <div class="no-content" v-if="!food.ratings">
                <p class="no-rating">暂无评价</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import split from 'components/split/split'
import cartcontrol from 'components/cartcontrol/cartcontrol'
import ratingselect from 'components/ratingselect/ratingselect'
import {formatDate} from 'common/js/date.js'

const ALL = 2

export default{
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    },
    selectRating (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    toggleContent () {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    addFood (target) {
      this.$emit('add', target)
    },
    addFirst (event) {
      if (!event._constructed) {
        return
      }
      this.$emit('add', event.target)
      Vue.set(this.food, 'count', 1)
    },
    hide () {
      this.showFlag = false
    },
    show () {
      this.showFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.food
  position:fixed
  left:0
  top:0
  bottom:48px
  width:100%
  background:#fff
  transform:translate3d(0,0,0)
  z-index:30
  &.move-enter-active,&.move-leave-active
    transition:all 0.2s linear
  &.move-enter,&.move-leave-active
    transform:translate3d(100%,0,0)
  .food-content
    .header-image
      position:relative
      width:100%
      height:0
      padding-top:100%
      img
        position:absolute
        top:0
        left:0
        width:100%
        height:100%
      .back
        position:absolute
        left:10px
        top:20px
        .icon-arrow_lift
          font-size:24px
          color:#fff
    .content
      .overview
        position:relative
        padding:18px
        .name
          line-height:14px
          margin-bottom:8px
          font-size:14px
          color:rgb(7,17,27)
          font-weight:700
        .desc
          margin-bottom:18px
          font-size:0
          .count
            font-size:10px
            color:rgb(147,153,159)
            margin-right:12px
          .rating
            font-size:10px
            color:rgb(147,153,159)
        .price
          line-height:24px
          font-size:10px
          font-weight:normal
          .now
            color:rgb(240,20,20)
            margin-right:12px
            .data
              font-weight:700
              font-size:14px
          .old
            color:rgb(147,153,159)
            text-decoration:line-through
            .data
              font-weight:700
        .cartcontrol-wrapper
          position:absolute
          right:12px
          bottom:12px
        .buy
          position:absolute
          right:18px
          bottom:18px
          padding:0 12px
          height:24px
          box-sizing:border-box
          border-radius:24px
          line-height:24px
          font-size:10px
          color:#fff
          background:rgb(0,160,220)
          opacity:1
          &.fade-enter-active,&.fade-leave-active
            transition:all 0.2s
          &.fade-enter,&.fade-leave-active
            opacity:0
            z-index:-1
      .info
        padding:18px
        .title
          line-height:14px
          margin-bottom:6px
          font-size:14px
          color:rgb(7,17,27)
        .content
          padding:0 8px
          line-height:24px
          font-size:12px
          color:rgb(77,85,93)
      .ratings
        .title
          margin:18px
          line-height:14px
          font-size:14px
          color:rgb(7,17,27)
        .ratingselect-wrapper
          padding:0 18px
        .content-wrapper
          border-top:1px solid rgba(7,17,27,0.1)
          .content
            padding:0 18px
            .rating-item
              position:relative
              padding-bottom:16px
              border-1px(rgba(7,17,27,0.1))
              color:rgb(147,153,159)
              .time
                margin:16px 0 6px 0
                line-height:12px
                font-size:10px
              .user
                position:absolute
                right:0
                top:0
                font-size:0
                .name
                  display:inline-block
                  vertical-align:top
                  line-height:12px
                  margin-right:6px
                  font-size:10px
                .avatar
                  display:inline-block
                  vertical-align:top
                  img
                    border-radius:50%
              .rating
                font-size:0
                .icon-thumb_up,.icon-thumb_down
                  display:inline-block
                  vertical-align:top
                  line-height:24px
                  font-size:12px
                .icon-thumb_up
                  color:rgb(0,160,220)
                .text
                  display:inline-block
                  vertical-align:top
                  line-height:24px
                  margin-left:4px
                  font-size:12px
                  color:rgb(7,17,27)
          .no-content
            padding:18px
            .no-rating
              font-size:12px
              color:rgb(147,153,159)
</style>
