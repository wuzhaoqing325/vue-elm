<template>
  <div>
  <div class="shopcart" @click="toggleList">
    <div class="shopcart-left">
      <div class="cart-wrapper">
        <div class="cart" :class="{'hightLight':totalCount>0}">
          <i class="icon-shopping_cart" :class="{'hightLight':totalCount>0}"></i>
        </div>
        <div class="num" v-if="totalCount>0">{{totalCount}}</div>
      </div>
      <div class="price" :class="{'hightLight':totalPrice>0}">￥{{totalPrice}}</div>
      <div class="extra">另需配送费￥{{deliveryPrice}}</div>
    </div>
    <div class="shopcart-right" @click="pay">
      <div class="buy" :class="buyClass">{{buyDesc}}</div>
    </div>
    <div class="ball-container">
      <div v-for="ball in balls" :key="ball.id">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fold">
      <div class="foodList" v-show="listShow">
        <h1 class="title">
          <span class="name">购物车</span>
          <span class="empty" @click="empty">清空</span>
        </h1>
        <div class="food-content" ref="foodContent">
          <ul>
            <li v-for="food in selectFoods" :key="food.id" class="food-item border-1px">
              <div class="foodname">{{food.name}}</div>
              <div class="foodprice">￥<span class="num">{{food.price*food.count}}</span></div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
  <transition name="fade">
    <div class="list-mask" v-show="listShow" @click="hideList"></div>
  </transition>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import cartcontrol from 'components/cartcontrol/cartcontrol'
export default{
  components: {
    cartcontrol
  },
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      fold: true
    }
  },
  props: {
    minPrice: {
      type: Number,
      default: 0
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array,
      default () {
        return [
          {
            price: 10,
            count: 2
          }
        ]
      }
    }
  },
  computed: {
    listShow () {
      if (!this.totalCount) {
        this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodContent, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    },
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    buyClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    buyDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}起送`
      } else {
        return `去结算`
      }
    }
  },
  methods: {
    hideList () {
      this.fold = true
    },
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    pay () {
      if (this.totalPrice < this.minPrice) {
        return
      }
      window.alert(`支付${this.totalPrice}元`)
    },
    drop (el) {
      // console.log(el)
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeDrop (el) {
      // console.log('click')
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          // console.log(x, y)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    dropping (el) {
      /* eslint-disable no-unused-vars */
      // 申明rf是为了触发浏览器的重排
      let rf = el.offsetHeight
      el.style.webkitTransform = `translate3d(0,0,0)`
      el.style.transform = `translate3d(0,0,0)`
      let inner = el.getElementsByClassName('inner-hook')[0]
      inner.style.webkitTransform = `translate3d(0,0,0)`
      inner.style.transform = `translate3d(0,0,0)`
    },
    afterDrop (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.shopcart
  position:relative
  display:flex
  background:#141d27
  width:100%
  height:48px
  z-index:50
  color:rgba(255,255,255,0.4)
  .shopcart-left
    flex:1
    font-size:0
    background:#141d27
    .cart-wrapper
      display:inline-block
      vertical-align:top
      position:relative
      top:-10px
      margin:0 12px
      padding:6px
      width:56px
      height:56px
      box-sizing:border-box
      border-radius:50%
      background:#141d27
      .cart
        width:100%
        height:100%
        border-radius:50%
        background:#2b343c
        text-align:center
        &.hightLight
          background:rgb(0,160,220)
        .icon-shopping_cart
          line-height:44px
          font-size:24px
          &.hightLight
            color:#fff
      .num
        position:absolute
        right:0
        top:0
        width:24px
        line-height:16px
        text-align:center
        font-size:9px
        font-weight:700
        background:rgb(240,20,20)
        color:#fff
        border-radius:16px
    .price
      display:inline-block
      vertical-align:top
      padding-right:12px
      margin-top:12px
      line-height:24px
      border-right:1px solid rgba(255,255,255,0.1)
      font-size:16px
      font-weight:700
      &.hightLight
        color:#fff
    .extra
      display:inline-block
      vertical-align:top
      margin:12px 0 0 12px
      line-height:24px
      font-size:10px
  .shopcart-right
    flex:0 0 105px
    width:105px
    .buy
      height:48px
      line-height:48px
      text-align:center
      font-size:12px
      font-weight:700
      &.not-enough
        background:#2b333b
      &.enough
        background:#00b43c
        color:#fff
  .ball-container
    .ball
      position:fixed
      left:32px
      bottom:22px
      z-index:200
      transition:all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner
        width:16px
        height:16px
        border-radius:50%
        background:rgb(0,160,220)
        transition:all 0.4s linear
  .foodList
    position:absolute
    top:0
    left:0
    width:100%
    z-index:-1
    transform:translate3d(0,-100%,0)
    &.fold-enter-active,&.fold-leave-active
      transition:all 0.5s
    &.fold-enter,&.fold-leave-active
      transform:translate3d(0,0,0)
    .title
      height:40px
      padding:0 18px
      background:#f3f5f7
      .name
        float:left
        line-height:40px
        font-size:14px
        color:rgb(7,17,27)
      .empty
        float:right
        line-height:40px
        font-size:12px
        color:rgb(0,160,220)
    .food-content
      max-height:217px
      padding:0 18px
      background:#fff
      overflow:hidden
      .food-item
        position:relative
        padding:12px 0
        box-sizing:border-box
        border-1px(rgba(7,17,27,0.1))
        .foodname
          line-height:24px
          font-size:12px
          color:rgb(7,17,27)
        .foodprice
          position:absolute
          right:90px
          bottom:12px
          line-height:24px
          font-size:10px
          font-weight:normal
          color:rgb(240,20,20)
          .num
            font-size:14px
            font-weight:700
        .cartcontrol-wrapper
          position:absolute
          right:0
          bottom:6px
.list-mask
  position:fixed
  top:0
  left:0
  width:100%
  height:100%
  z-index:40
  opacity:1
  background:rgba(7,17,27,0.6)
  backdrop-filter:blur(10px)
  &.fade-enter-active,fade-leave-active
    transition:all 0.5s
  &.fade-enter,fade-leave-active
    opacity:0
    background:rgba(7,17,27,0)
</style>
