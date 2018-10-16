<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header ">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:isOn}" @click="isOn=true">短信登录</a>
          <a href="javascript:;" :class="{on:!isOn}" @click="isOn=false">密码登录</a>
        </div>
      </div>
      <div class="login_content" >
        <form>
          <div :class="{on:isOn}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phoneNumber">
              <button :disabled="!isPhoneNumber || countTime>0"
                      class="get_verification"
                      :class="{right_phone_number:isPhoneNumber&&countTime===0}" @click.prevent="sendCode">
                {{countTime>0 ? `已发送(${countTime}s)`: '获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="6" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!isOn}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="12" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type=" isText? 'text': 'password'" maxlength="12" placeholder="密码" v-model="pwd">
                <div class="switch_button" :class=" isText ? 'on': 'off'"
                     @click="isText=!isText">
                  <div class="switch_circle" :class="{right:isText}"></div>
                  <span class="switch_text">
                    {{ isText? '显示': '...'}}
                  </span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="4" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="captchaOne" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click.prevent="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script>
  import { Toast ,MessageBox} from 'mint-ui';
  import { reqMsgCode ,reqMsgLogin ,reqPwdLogin } from '../../api'
  export default {
    data () {
      return {
        isOn: true , //true为短信登录 false为密码登录
        phoneNumber: '',   //输入的手机号
        code : '' ,     //输入的验证码
        countTime : 0  ,    //倒计时
        name : '' ,      //输入的用户名
        captcha : '',    //输入的验证码
        pwd : '',    //输入的密码
        isText : false   //用来给自己添加on off类名，并且给input判断type为text或者password
      }
    },

    computed : {
      //根据phoneNumber的值来判断是不是电话号码
      // 从而判断 发送验证码button 显不显示right_phone_number这个类名
      isPhoneNumber () {
        const NumberReg= new RegExp(/^1\d{10}$/);
        //返回true 或者 false
        return NumberReg.test(this.phoneNumber)
      }
    },

    methods : {
      //点击发送验证码按钮
      async sendCode () {
        //点击的回调  两种情况下点击不会触发：1.正在倒计时
        //                                    2.输入的手机号不符合正则表达式
        //disabled属性 为true 所有的操作都被禁止(Dom操作)
        // 因此这两种情况 打不过disabled为true时就无法触发  动态判断disabled为true或者false
        //!isPhoneNumber \\ countTime>0 就是上面两种情况 因此这两种情况取反就能进入这个回调函数
        this.countTime= 30 ;
        const setInterId = setInterval( () => {
          if(this.countTime === 0){
            clearInterval(setInterId);
            return
          }
          this.countTime -- ;
        },1000)

        //发送验证码请求
        const result = await reqMsgCode(this.phoneNumber);
        if(result.code === 0){
          //验证码发送成功   返回响应
          MessageBox.confirm('验证码发送成功')
            .then( action => {
             console.log('-----OK')
          });
        }else{
          // 失败   mint-ui的组件函数
          Toast('手机号或验证码输入有误');
          //关闭倒计时 可以重新点击
          this.countTime = 0
        }

      } ,

      //请求一次性验证码
      captchaOne () {
        //这个请求网址直接返回一张图片  不需要参数
        this.$refs.captcha.src = 'http://localhost:4000/captcha?time='+ Date.now()
      },


       /* 登录逻辑： 1.表单验证
                  * 2.发送请求
                  * 3.成功后跳转路由*/
      async login () {
        const {phoneNumber,code,name,captcha,pwd} = this ;
        let result ;
        //判断登录的类型  根据isOn
        if(this.isOn){
          //true为短信登录
          //表单验证
          if(!/^1\d{10}$/.test(phoneNumber)){
            Toast('手机号输入有误')
            return ;
          }else if(!/^\d{6}$/.test(code)) {
            Toast('验证码输入有误')
            return ;
          }
          //发送请求
         result = await reqMsgLogin({phone:phoneNumber,code})
          //关闭倒计时 可以重新点击
          this.countTime = 0

        }else{
          //密码登录   还要七天免登录的
          //表单验证
          if(!/^.{12}$/.test(name)){
            Toast('用户名输入有误')
            this.captchaOne();
            this.name = '';
            this.pwd = '';
            this.captcha = '';
            return ;
          }else if(!/^.{12}$/.test(pwd)){
            Toast('密码输入有误')
            this.captchaOne()
            this.name = '';
            this.pwd = '';
            this.captcha = ''
            return ;
          }else if(!/^.{4}$/.test(captcha)){
            Toast('验证码输入有误')
            this.captchaOne()
            this.name = '';
            this.pwd = '';
            this.captcha = ''
            return ;
          }

          //发送请求
          result = await reqPwdLogin({name,pwd,captcha})
          //每次发送请求都要更新图形验证码
          this.captchaOne()

        }


        //响应数据 判断
        if(result.code === 0){
          //数据成功返回  保存user到state  跳转路由
           //1.保存user到state
          const user = result.data;
          this.$store.dispatch('saveUser',user)

          this.$router.replace('/profile')
          //2.跳转路由
        }else{
          Toast(result.msg)
        }

      }

    },


    beforeRouteEnter (to,form,next) {
      //路由前置守卫
      // beforeRouteEnter这个回调在组件创建前就调用  this为undefined
      //next传入回调函数  在组件对象创建后自动调用 ，会将组件对象传入，因此参数为component
      next( (component) => {
        if(component.$store.state.user._id){
          //登录了的用户无法跳转到登录路由 直接跳转到profile
          next('/profile')
        }else{
          //没有登录的用户允许通过
          next()
        }
      })

    }
  }
</script>

<style type="text/stylus" lang="stylus" rel="stylesheet/stylus">
  .loginContainer
    width 100%
    position absolute
    top 0
    bottom 0
    background #fff
    overflow hidden
    .loginInner
      padding-top 60px
      width 80%
      height 100%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
