<template>
  <div class="shop-info">
    <div class="info-content">
      <section class="section">
        <h3 class="section-title">配送信息</h3>
        <div class="delivery">
          <div>
            <span class="delivery-icon">{{info.description}}</span>
            <span>{{info.bulletin}}</span>
          </div>
          <div class="delivery-money">配送费￥{{info.deliveryPrice}}</div>
        </div>
      </section>
      <Split/>
      <section class="section">
        <h3 class="section-title">活动与服务</h3>
        <div class="activity">
          <div class="activity-item" v-for="(support,index) in info.supports"
          :class="classes[support.type]">
            <span class="content-tag">
              <span class="mini-tag">{{support.name}}</span>
            </span>
            <span class="activity-content">{{support.content}}</span>
          </div>
        </div>
      </section>
      <Split/>

      <section class="section">
        <h3 class="section-title">商家实景</h3>
        <div class="pic-wrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="(pic,index) in info.pics" :key="index">
              <img width="120" height="90" :src="pic">
            </li>
          </ul>
        </div>
      </section>
      <Split/>

      <section class="section">
        <h3 class="section-title">商家信息</h3>
        <ul class="detail">
          <li>
            <span class="bold">品类</span>
            <span>{{info.category}}</span>
          </li>
          <li>
            <span class="bold">商家电话</span>
            <span>{{info.phone}}</span>
          </li>
          <li>
            <span class="bold">地址</span>
            <span>{{info.address}}</span>
          </li>
          <li>
            <span class="bold">营业时间</span>
            <span>{{info.workTime}}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>


<script>
  /*dispatch(saveInfo) 在shopHeader组件内发送的请求  不需要再发请求*/
  import { mapState} from 'vuex'
  import BScroll from 'better-scroll'
  export default {
    computed : {
      ...mapState(['info'])
    },
    data () {
      return {
        classes : ['activity-green','activity-red','activity-orange']
      }
    },

    mounted () {
      //数据在shopHeader就已经更新完毕
      //从别的组件到shop-info 执行mounted回调时数据已经展示完毕  因此不需要nectTick函数
      new BScroll('.shop-info',{
        click : true
      })


      //防止在 这个组件内刷新 重新请求info 而info数据没有回来 就不执行下面的代码 防止报错
      if(!this.info){
        return ;
      }

      this._initBScroll()

      //在这个组件内刷新的话  请求info数据 数据还没有更新  因此需要watch监视info
    },

    watch : {
      info (value) {
        //注意：这里是数据更新完毕  到数据还没显示完毕 因此要调用nectTick
        this.$nextTick( () => {
          this._initBScroll()
        })

      }
    },


    methods : {
      _initBScroll () {
        //li容器的宽度写死了  因此没法进行横向滑动
        const ulContainer = this.$refs.picList
        //每个li都有一个margin-right 为 6
        const RIGHT = 6
        if( !ulContainer.children[0]){
          return
        }
        const liWidth =  ulContainer.children[0].clientWidth;
        ulContainer.style.width = (liWidth + RIGHT) * ulContainer.children.length - RIGHT + 'px'
        new BScroll('.pic-wrapper',{
          click : true ,
          scrollX : true
        })
      }
    }
  }
</script>

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"
  .shop-info
    position: absolute
    top: 244px
    bottom: 0
    left: 0
    width: 100%
    background: #fff;
    overflow: hidden
    .section
      padding 16px 14px 14px
      font-size 16px
      background-color #fff
      color #666
      border-bottom 1px solid #eee
      position relative
      .section-title
        color #000
        font-weight 700
        line-height 16px
        > .iconfont
          float right
          color #ccc
      .delivery
        margin-top 16px
        font-size 13px
        line-height 18px
        .delivery-icon
          width 55px
          font-size 11px
          margin-right 10px
          display inline-block
          text-align center
          color #fff
          background-color #0097ff
          padding 1px 0
          border-radius 4px
        .delivery-money
          margin-top 5px

      .activity
        margin-top 16px
        .activity-item
          margin-bottom 12px
          display flex
          font-size 13px
          align-items center
          &.activity-green
            .content-tag
              background-color rgb(112, 188, 70)
          &.activity-red
            .content-tag
              background-color rgb(240, 115, 115)
          &.activity-orange
            .content-tag
              background-color: rgb(241, 136, 79)
          .content-tag
            display inline-block
            border-radius 2px
            width 36px
            height: 18px
            margin-right 10px
            color #fff
            font-style normal
            position relative
            .mini-tag
              position absolute
              left 0
              top 0
              right -100%
              bottom -100%
              font-size 24px
              transform scale(.5)
              transform-origin 0 0
              display flex
              align-items center
              justify-content center
      .pic-wrapper
        width: 100%
        overflow: hidden
        white-space: nowrap
        margin-top 16px
        .pic-list
          font-size: 0
          .pic-item
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin: 0
      .detail
        margin-bottom -16px
        > li
          display flex
          justify-content space-between
          align-items center
          margin-right -10px
          padding 16px 12px 16px 0
          line-height 16px
          bottom-border-1px(#ddd)
          font-size 13px
          > .bold
            font-weight 700
            color #333
          &:last-child
            border-none()
</style>

