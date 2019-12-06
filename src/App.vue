<template>
<div class="app">
  <v-header :seller="seller"></v-header>
  <div class="tab">
    <div class="tab-item">
      <router-link to= "/goods">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link to= "/ratings">评论</router-link>
    </div>
    <div class="tab-item">
      <router-link to= "/seller">商家</router-link>
    </div>
  </div>
  <div class="content">
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</div>
</template>

<script>
import header from 'components/header/header'
import {urlParse} from 'common/js/util.js'
const ERR_OK = 0
export default {
  components: {
    'v-header': header
  },
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          return queryParam.id
        })()
      }
    }
  },
  created () {
    this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        // this.seller = response.data
        this.seller = Object.assign({}, this.seller, response.data)
        // console.log(this.seller)
      }
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/mixin.styl'
.app
  .tab
    display:flex
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex:1
      height:40px
      line-height:40px
      & > a
        display:block
        text-align:center
        font-size:14px
        color:rgb(77,85,93)
        &.active
          color:rgb(240,20,20)
</style>
