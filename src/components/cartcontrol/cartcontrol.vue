<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="minus" @click.stop.prevent="minusCart" v-if="food.count>0">
        <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div class="text" v-if="food.count>0">{{food.count}}</div>
    <div class="add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>
<script>
import Vue from 'vue'
export default{
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    minusCart (event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    },
    addCart (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('add', event.target)
      // console.log('click')
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
  font-size:0
  .minus
    display:inline-block
    padding:6px
    opacity:1
    transform:translate3d(0,0,0)
    .inner
      display:inline-block
      line-height:24px
      font-size:24px
      color:rgb(0,160,220)
      transition:all 0.4s linear
      transform:rotate(0)
    &.move-enter-active,&.move-leave-active
      transition:all 0.4s linear
    &.move-enter,&.move-leave-active
      opacity:0
      transform:translate3d(24px,0,0)
      .inner
        transform:rotate(180deg)
  .text
    display:inline-block
    vertical-align:top
    width:12px
    line-height:24px
    padding-top:6px
    text-align:center
    font-size:10px
    color:rgb(147,153,159)
  .add
    display:inline-block
    padding:6px
    line-height:24px
    font-size:24px
    color:rgb(0,160,220)
</style>
