<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{info.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{info.rankRate}}%</div>
        </div>
        <div class="overview-right">

          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :score="info.serviceScore" :size="36"/>
            <span class="score">{{info.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :score="info.foodScore" :size="36"/>
            <span class="score">{{info.foodScore}}</span></div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{info.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <Split/>

      <RatingFilter :isGoodContent="isGoodContent"
                     :onlyHaveContent="onlyHaveContent"
                      @showRatings="showRatings"
                      @toggleContent="toggleContent"
                       />

      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(rating,index) in ratingContentArr" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <Star :score="rating.score" :size="24"/>
                <span class="delivery">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="iconfont icon-thumb_up"></span>
              </div>
              <div class="time">{{rating.rateTime | time-format }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
  import {mapState } from 'vuex'
  import BScroll from 'better-scroll'

  import Star from '../../../components/star/star.vue'
  import RatingFilter from './rating-filter/rating-filter.vue'


  export default {
    data () {
      return {
        isGoodContent : 2 ,  // 0为只显示满意的评论 1为只显示吐槽的评论 2为所有的内容都行
        onlyHaveContent : false   //false显示所有的评论   true为显示有内容的评论
      }
    },

    computed : {
      ...mapState(['info','ratings']) ,

      ratingContentArr () {
        const { ratings ,isGoodContent,onlyHaveContent} = this ;

        /* 条件1 ：isGoodContent 0 1 2
              当isGoodContent为2时  就是说显示所有的评论
              当isGoodContent为0或1时 isGoodContent===rateType就显示对应的内容

              条件2 ：当onlyHaveContent为false  显示所有的内容
                     当onlyHaveContent=true时  显示有内容的评论
          * */
        return ratings.filter((rating) => {

            return (isGoodContent===2 || isGoodContent===rating.rateType) && (!onlyHaveContent || rating.text.length )

          })
        }
    },


    mounted () {
      this.$store.dispatch('saveRatings',() => {
        this.$nextTick(() => {
          new BScroll('.ratings',{
            click : true ,
          })
        })
      })
    },

    components : {
      Star ,
      RatingFilter
    },

    methods : {
      showRatings (isGoodContent) {
        //自定义事件 绑定监听通过v-on 简写为@事件名=“回调”
        // 根据子组件的选择值0 1 2来改变isGoodContent为 0 1 2
        this.isGoodContent = isGoodContent
      },
      toggleContent () {
        //自定义事件
        this.onlyHaveContent = !this.onlyHaveContent
      }
    }
  }
</script>

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"
  .ratings
    position: absolute
    top: 245px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    background #ffffff
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        padding: 6px 0
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .overview-right
        flex: 1
        padding: 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          margin-bottom: 8px
          font-size: 0
          display flex
          .title
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 12px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          position: relative
          flex: 1
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              vertical-align: top
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
          .text
            margin-bottom: 8px
            line-height: 18px
            color: rgb(7, 17, 27)
            font-size: 12px
          .recommend
            line-height: 16px
            font-size: 0
            .icon-thumb_up, .icon-thumb_down, .item
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
            .icon-thumb_up
              color: $yellow
            .icon-thumb_down
              color: rgb(147, 153, 159)

            .item
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 1px
              color: rgb(147, 153, 159)
              background: #fff
          .time
            position: absolute
            top: 0
            right: 0
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)


</style>
