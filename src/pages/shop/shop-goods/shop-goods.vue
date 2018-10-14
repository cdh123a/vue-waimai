<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftLiNode">
          <li class="menu-item " v-for="(goodType ,index) in goods" :key="index" :class="{current:index === currentIndex }" @click="selectItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="goodType.icon" v-if="goodType.icon">
              {{goodType.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="liNode">
          <li class="food-list-hook" v-for="(goodType ,index) in goods" :key="index">
            <h1 class="title">{{goodType.name}}</h1>
            <ul v-if="goodType">
              <li class="food-item bottom-border-1px" v-for="(food,index) in goodType.foods" :key="index">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    CartControl组件
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
  /* 1. 滑动右侧列表, 左侧列表的当前分类同步变化
      根据滑动的距离来判断在哪一个li的高度内
        初始一个右边li高度累加的数组  滑动的距离
  2. 点击左侧某个分类项, 右侧列表滑动到对应位置
  3. 完善1的功能: 使用左侧当前分类总是可见  */

  import {mapState } from 'vuex'
  import BScroll  from 'better-scroll'
  export default {
    data () {
      return {
        liHeights : [],
        scrollY :  0 ,
      }
    },
    computed : {
      ...mapState(['goods']) ,

      currentIndex () {
        const {liHeights , scrollY} = this
        //实现 右边滑动到这个li的区域  给左边的对应的li添加current类名
        //currentIndex 根据 scrollY 和 liHeights数组来实现
        const index = liHeights.findIndex( (liHeight,index) => scrollY >=liHeight && scrollY<liHeights[index+1])


       /* //右边滑动  左边滑动到对应的li
        if(this.index != index){
          //一开始this上没有index 因此不等于 进入之后更新this.index
          this.index = index ;
          //当点击同一个li  不需要执行这一段代码
          if(this.leftLi){
            // 注意 此时的状态数据还没有生成完毕 组件还没有更新 因此leftLi还没有创建 先判断
            this.leftLi.scrollToElement(this.$refs.leftLiNode.children[index],200)
          }
        }*/


        return index
      }
    },
    mounted () {
      this.$store.dispatch('saveGoods',() => {
        //保证数据回来 并且组件更新之后才创建BScroll对象  这次使用nectTick+回调函数
        //状态数据更新完毕  $nextTick函数 状态数据更新之后，组件更新之前
        // 里面的回调是组价更新之后立即执行
        this.$nextTick( () => {

          //组件更新之后就创建Scroll对象    配置能触发滚动事件
         this._initScrollObj()

          //初始liHeights
          this._initLiHeights();


        })
      })

    },

    methods : {
      _initLiHeights () {
        //更新li高度数组  拿到右边的ul  下面的所有li
        let height = 0 ;
        let liHeights = [ ];
        liHeights.push(height)
        this.$refs.liNode.querySelectorAll('.food-list-hook')
          .forEach( li => {
            height += li.clientHeight;
            liHeights.push(height)
          })
        //更新liHeights状态数据
        this.liHeights = liHeights
      },

      _initScrollObj () {
        this.leftLi = new BScroll('.menu-wrapper',{
          click : true ,
          probeType :  1
        })
        this.rightLi =  new BScroll('.foods-wrapper',{
          click : true ,
          probeType :  1
        })

        //给右边的li绑定监听  当右边滑动时  左边的li跟着划动到对应的li
        //better-scroll文档
        this.rightLi.on('scroll',({x,y}) => {
          this.scrollY =Math.abs(y)
        })
        //选择probrType为1 不是实时监听  因此还需要绑定scrollEnd监听  来让右边停止时 ，让左边的对应的li来添加current类名
        this.rightLi.on('scrollEnd',({x,y}) =>{
          this.scrollY =Math.abs(y)

          //当右边滑动时 左边滑动到对应的li
          //scrollTo方法滑动的太多  没法实现
          //this.leftLi.scrollTo(0,-this.$refs.leftLiNode.children[0].clientHeight*this.currentIndex)
          //使用scrollToElement方法  其中第一个el是dom对象
          if(this.index != this.currentIndex){
            //当右边滑动 但没有滑动出这个li的区域 此时左边不需要执行  因此需要判断一下，
            // 一开始this.index为undefined  能进来  然后每次都更新this.index
            // 确保滑动后的值相等 左边li就不会执行
            this.index = this.currentIndex
            this.leftLi.scrollToElement(this.$refs.leftLiNode.children[this.currentIndex],200)
          }
          //要拿到currentIndex  这里也可以到计算属性currentIndex中做

        })






      } ,

      //左边点击那个li 右边就滑动到对应的li区域  左边li绑定点击事件
      selectItem (index) {
        //点击左边的li  滑动到右边对应的区域
        //拿到要滑到的高度  注意要取反
        const scrollTo = -this.liHeights[index]
        //scroll-Better文档   300为滚动时间300ms
        this.rightLi.scrollTo(0,scrollTo,300)
        //左边的current类名添加到点击的li   由于currentIndex只设置了get方法  没有set方法 无法直接更新  只能更新scrollY来间接更新  scrollY是正数 this.scrollY = Math.abs(scrollTo)或者
        this.scrollY = -scrollTo
      }
    }



  }
</script>

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus" scoped>

  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 245px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color #02a774
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px



</style>
