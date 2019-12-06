<template>
  <div>
  <div class="goods">
  <div class="menu-wrapper" ref="menuWrapper">
    <ul>
      <li v-for="(good,index) in goods" :key="good.id" class="goods-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
        <div class="text border-1px">
          <span class="icon" v-if="good.type>0" :class="classMap[good.type]"></span>
          <span class="name">{{good.name}}</span>
        </div>
      </li>
    </ul>
  </div>
  <div class="goods-wrapper" ref="goodsWrapper">
    <ul>
      <li v-for="good in goods" :key="good.id" class="good-list-hook">
        <h1 class="title">{{good.name}}</h1>
        <ul>
          <li v-for="food in good.foods" :key="food.id" class="food-item" @click="selectFood(food,$event)">
            <div class="food-image">
              <img :src="food.icon" width="57" height="57">
            </div>
            <div class="food-content">
                <h2 class="name">{{food.name}}</h2>
            <div class="desc">{{food.description}}</div>
            <div class="extra">
              <span class="count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥<div class="data">{{food.price}}</div></span>
              <span class="old" v-show="food.oldPrice">￥<div class="data">{{food.oldPrice}}</div></span>
            </div>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food" @add="addFood"></cartcontrol>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <shopcart ref="shopcart" :selectFoods="selectFoods" :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice"></shopcart>
  </div>
  <food :food="selectedFood" ref="food" @add="addFood"></food>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import cartcontrol from 'components/cartcontrol/cartcontrol'
import shopcart from 'components/shopcart/shopcart'
import food from 'components/food/food'
const ERR_OK = 0
export default{
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    cartcontrol,
    shopcart,
    food
  },
  data () {
    return {
      goods: [],
      scrollY: 0,
      heightList: [],
      selectedFood: {}
    }
  },
  computed: {
    selectFoods () {
      let result = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count > 0) {
            result.push(food)
          }
        })
      })
      return result
    },
    currentIndex () {
      for (let i = 0; i < this.heightList.length; i++) {
        let height1 = this.heightList[i]
        let height2 = this.heightList[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    this.$http.get('/api/goods').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.goods = response.data
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }
    })
  },
  methods: {
    selectFood (food, event) {
      if (!event._constructed) {
        return
      }
      this.selectedFood = food
      this.$refs.food.show()
    },
    addFood (target) {
      if (!event._constructed) {
        return
      }
      // console.log('click')
      this._drop(target)
    },
    _drop (target) {
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target)
      })
    },
    selectMenu (index, event) {
      if (!event._constructed) {
        return
      }
      let goodList = this.$refs.goodsWrapper.getElementsByClassName('good-list-hook')
      let el = goodList[index]
      this.goodsScroll.scrollToElement(el, 300)
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.goodsScroll = new BScroll(this.$refs.goodsWrapper, {
        click: true,
        probeType: 3
      })
      this.goodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () {
      let goodList = this.$refs.goodsWrapper.getElementsByClassName('good-list-hook')
      let height = 0
      this.heightList.push(height)
      for (let i = 0; i < goodList.length; i++) {
        let item = goodList[i]
        height += item.clientHeight
        this.heightList.push(height)
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.goods
  position:absolute
  display:flex
  top:174px
  left:0
  bottom:48px
  overflow:hidden
  .menu-wrapper
    flex:0 0 80px
    width:80px
    overflow:hidden
    .goods-item
      display:table
      height:54px
      padding:0 12px
      background:#f3f5f7
      overflow:hidden
      &.current
        position:relative
        top:-1px
        font-weight:700
        background:#fff
        .text
          border-none()
      .text
        display:table-cell
        vertical-align:middle
        width:56px
        border-1px(rgba(7,17,27,0.1))
        font-size:0
        .icon
          display:inline-block
          vertical-align:top
          width:12px
          height:12px
          background-size:12px 12px
          background-repeat:no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .name
          line-height:14px
          font-size:12px
          color:rgb(7,17,27)
  .goods-wrapper
    flex:1
    .title
      height:26px
      line-height:26px
      padding-left:14px
      border-left:2px solid #d9dde1
      background:#f3f5f7
      font-size:12px
      color:rgb(147,153,159)
    .food-item
      position:relative
      display:flex
      margin:18px
      padding-bottom:18px
      border-1px(rgba(7,17,27,0.1))
      &:last-child
        margin-bottom:0
        border-none()
      .food-image
        flex:0 0 57px
        margin-right:10px
      .food-content
        flex:1
        padding-top:2px
        .name
          margin-bottom:8px
          line-height:14px
          font-size:14px
          color:rgb(7,17,27)
        .desc
          line-height:12px
          font-size:10px
          color:rgb(147,153,159)
          margin-bottom:8px
        .extra
          line-height:10px
          font-size:10px
          color:rgb(147,153,159)
          .count
            margin-right:12px
        .price
          line-height:24px
          font-weight:normal
          font-size:10px
          color:rgb(147,153,159)
          .now
            margin-right:8px
            color:rgb(240,20,20)
            .data
              display:inline-block
              font-size:14px
              font-weight:700
          .old
            text-decoration:line-through
            .data
              text-decoration:line-through
              display:inline-block
              font-weight:700
      .cartcontrol-wrapper
        position:absolute
        right:8px
        bottom:6px
  .shopcart
    position:fixed
    bottom:0
    left:0
    height:48px
    background:red
</style>
