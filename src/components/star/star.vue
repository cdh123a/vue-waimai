<template>
                              <!-- star-24 -->
  <div class="star" :class=" 'star-'+size ">
    <span class="star-item" v-for="(item,index) in classArr" :key="index"
       :class="item"></span>
  </div>
</template>

<script>
  /*根据 评分 和 尺寸(24  36  48) 来动态显示 星星的背景图*/
  export default {
    props : {
      score : Number ,
      size : Number
    },
    computed : {
      /*根据评分来生成有“on  half  off”类名的数组*/
      classArr () {
        let arr1 = [];
        const {score} = this ;

        //on 是评分取整   n个
        // half根据小数部分四舍五入来确定   0 / 1 个
        //off 根据上面剩余的来确定  n个

        //on  评分取整
        const onClass = Math.floor(score);
        for (let i = 0; i < onClass; i++) {
          arr1.push('on')
        }

        //half   小数部分四舍五入来确定
        const halfClass = score - onClass ;
        if(halfClass*10 >= 5){
          arr1.push('half')
        }

        //off  on half剩余的来确定
        const rest = 5 - arr1.length ;
        for (let i = 0; i < rest; i++) {
          arr1.push('off')
        }

        return arr1 ;
      }
    }
  }
</script>

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
