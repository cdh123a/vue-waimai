<template>
  <section class="msite">
    <TopHeader :title="position.name">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
       <span class="header_login_text">登录|注册</span>
      </span>
    </TopHeader>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(arrSmall,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index) in arrSmall" :key="index">
              <div class="food_container">
                <img :src="(path + category.image_url)">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>

        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>

<script>
  import {mapState} from 'vuex'
  import Swiper from 'swiper';
  import ShopList from '../../components/shop-list/shop-list.vue'

  export default {
    data () {
      return {
        path : 'https://fuss10.elemecdn.com'
      }
    },
    computed : {
      ...mapState(['position','categorys']),

      //生成一个轮播的二维数组
      categorysArr () {
        //拿出categorys
        const { categorys } = this ;
        //定义二维数组arr
        let arr = [ ];
        //定义二维数组内的数组
        let arrSmall = [ ];

        categorys.forEach( c => {
          if(arrSmall.length === 0){
            //arrSmall为空数组 ，拉入arr里面  后面arrSmall再拉取元素
            arr.push(arrSmall)
          }

          //实现当arrSmall里面有8个元素 ，清空 ，arr就能再次将新的arrSmall拉入，实现二维数组
          arrSmall.push(c)

          //当arrSmall的元素有8个 就将arrSmall清空
          if(arrSmall.length === 8){
            arrSmall = [ ];
          }

        })
        return arr ;
      }
    },
    components : {
      ShopList
    },
    mounted() {
      //这里来创建swiper  会导致状态数据categorys没有回来
      //组件跳转回来之后 mounted 里面再创建一个swiper  实现组件跳转回来之后还有轮播
      new Swiper('.swiper-container',{
        loop : true ,  //是否循环播放
        pagination : {
          el : '.swiper-pagination'
        }
      })
    },

    watch : {
      categorys : function (value) {   //状态数据回来了  但是组件没有更新
        //$nextTick()  方法在状态数据更新之后 组件更新之后调用 里面是回调函数
        this.$nextTick( () => {
         new Swiper('.swiper-container',{
           loop : true ,  //是否循环播放
           pagination : {
             el : '.swiper-pagination'
           }
         })
       })
      }
    }
  }
</script>

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>

