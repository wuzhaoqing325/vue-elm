<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <div @click="select(2,$event)" class="block positive" :class="{'active':selectType === 2}">{{desc.all}}<span class="num">{{ratings.length}}</span></div>
    <div @click="select(0,$event)" class="block positive" :class="{'active':selectType === 0}">{{desc.positive}}<span class="num">{{positive.length}}</span></div>
    <div @click="select(1,$event)" class="block negative" :class="{'active':selectType === 1}">{{desc.negative}}<span class="num">{{negative.length}}</span></div>
    </div>
    <div class="toggleContent" @click="toggle">
      <i class="icon-check_circle" :class="{'on':onlyContent}"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
const ALL = 2
const POSITIVE = 0
const NEGATIVE = 1
export default{
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: true
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  computed: {
    positive () {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negative () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    select (type, event) {
      if (!event._constructed) {
        return
      }
      this.$emit('select', type)
    },
    toggle () {
      if (!event._constructed) {
        return
      }
      this.$emit('toggle')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.ratingselect
  .rating-type
    padding-bottom:18px
    border-1px(rgba(7,17,27,0.1))
    .block
      display:inline-block
      line-height:16px
      padding:8px 12px
      margin-right:8px
      border-radius:2px
      font-size:12px
      .num
        font-size:8px
      &.active
        color:#fff
      &.positive
        background:rgba(0,160,220,0.2)
        &.active
          background:rgb(0,160,220)
      &.negative
        background:rgba(77,85,93,0.2)
        &.active
          background:rgb(77,85,93)
  .toggleContent
    padding:12px 0
    color:rgb(147,153,159)
    font-size:0
    .icon-check_circle
      display:inline-block
      vertical-align:top
      line-height:24px
      margin-right:4px
      font-size:24px
      &.on
        color:#00c850
    .text
      display:inline-block
      vertical-align:top
      line-height:24px
      font-size:12px
</style>
