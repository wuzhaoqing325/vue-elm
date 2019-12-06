<template>
  <div class="line">
    <span class="left-line"></span>
    <span class="text">{{text}}</span>
    <span class="right-line"></span>
  </div>
</template>
<script>
export default{
  props: {
    text: {
      type: String
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.line
  display:flex
  font-size:0
  .left-line,.right-line
    flex:1
    display:inline-block
    height:0
    position:relative
    top:6px
    border-top:1px solid rgba(255,255,255,0.2)
  .text
    display:inline-block
    padding:0 12px
    font-size:14px
    font-weight:700
  .right-left
    display:inline-block
    flex:1
</style>
