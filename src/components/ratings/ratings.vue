<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content-wrapper">
      <div class="overview">
      <div class="overview-left">
        <div class="score">{{seller.score}}</div>
        <div class="label">综合评分</div>
        <div class="rank">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="overview-right">
        <ul>
          <li class="score-item">
            <span class="text">服务态度</span>
              <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </li>
          <li class="score-item">
            <span class="text">商品评分</span>
            <span class="star-wrapper">
              <star :size="36" :score="seller.foodScore"></star>
            </span>
            <span class="score">{{seller.foodScore}}</span>
          </li>
          <li class="score-item">
            <span class="text">送达时间</span>
            <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
          </li>
        </ul>
      </div>
    </div>
    <split></split>
    <div class="ratingselect-wrapper">
      <ratingselect :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent" @toggle="toggleContent" @select="selectRating"></ratingselect>
    </div>
    <div class="ratings-content">
      <div class="content-wrapper">
        <ul>
          <li v-for="rating in ratings" :key="rating.id" class="rating-item border-1px" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <div class="name">{{rating.username}}</div>
              <div class="score">
                <star :size="24" :score="rating.score"></star><span class="deliveryTime" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <div class="text">{{rating.text}}</div>
              <div class="recommend" v-if="rating.recommend.length>0">
                <i class="icon-thumb_up"></i>
                  <span v-for="item in rating.recommend" :key="item.id" class="recommend-item">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import star from 'components/star/star'
import split from 'components/split/split'
import ratingselect from 'components/ratingselect/ratingselect'
import {formatDate} from 'common/js/date.js'
const ERR_OK = 0
const ALL = 2
export default{
  data () {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: false
    }
  },
  components: {
    star,
    split,
    ratingselect
  },
  props: {
    seller: Object
  },
  created () {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.ratings = response.data
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        })
      }
    })
  },
  methods: {
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === 2) {
        return true
      } else {
        return type === this.selectType
      }
    },
    toggleContent () {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    selectRating (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
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
.ratings
  position:absolute
  top:174px
  left:0
  bottom:0
  overflow:hidden
  width:100%
  .overview
    display:flex
    .overview-left
      flex: 0 0 137px
      width:137px
      margin:18px 0
      text-align:center
      border-right:1px solid rgba(7,17,27,0.1)
      @media only screen and (max-width:320px)
        flex:0 0 120px
        width:120px
      .score
        line-height:28px
        margin-bottom:6px
        font-size:24px
        color:rgb(255,153,0)
      .label
        line-height:12px
        margin-bottom:8px
        font-size:12px
        color:rgb(7,17,27)
      .rank
        line-height:10px
        font-size:10px
        color:rgb(147,153,159)
    .overview-right
      flex:1
      padding:18px 24px
      @media only screen and (max-width:320px)
        padding:18px 0 18px 6px
      .score-item
        margin-bottom:8px
        font-size:0
        &:last-child
          margin-bottom:0
        .text
          display:inline-block
          vertical-align:top
          line-height:18px
          margin-right:12px
          font-size:12px
          color:rgb(7,17,27)
        .star
          display:inline-block
          vertical-align:top
          margin-right:12px
        .score,.deliveryTime
          display:inline-block
          vertical-align:top
          line-height:18px
          font-size:12px
          color:rgb(255,153,0)
        .deliveryTime
          color:rgb(147,153,159)
  .ratingselect-wrapper
    padding:18px
  .ratings-content
    border-top:1px solid rgba(7,17,27,0.1)
    .content-wrapper
      padding:0 18px
      .rating-item
        display:flex
        padding:18px 0
        border-1px(rgba(7,17,27,0.1))
        .avatar
          flex:0 0 28px
          width:28px
          margin-right:12px
          img
            border-radius:50%
        .content
          position:relative
          flex:1
          .name
            line-height:12px
            margin-bottom:4px
            font-size:10px
            color:rgb(7,17,27)
          .score
            .star
              display:inline-block
              vertical-align:top
              margin-right:6px
            .deliveryTime
              display:inline-block
              vertical-align:top
              line-height:12px
              font-size:10px
              color:rgb(147,153,159)
          .text
            line-height:18px
            margin-bottom:8px
            font-size:12px
            color:rgb(7,17,27)
          .recommend
            font-size:0
            .icon-thumb_up
              display:inline-block
              vertical-align:top
              line-height:16px
              font-size:12px
              color:rgb(0,160,220)
              margin-right:8px
            .recommend-item
              display:inline-block
              vertical-align:top
              line-height:16px
              margin:0 8px 4px 0
              padding:0 6px
              border:1px solid rgba(7,17,27,0.1)
              border-radius:2px
              font-size:9px
              color:rgb(147,153,159)
          .time
            position:absolute
            top:0
            right:0
            line-height:12px
            font-size:10px
            color:rgb(147,153,159)
</style>
