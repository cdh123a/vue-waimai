
<template>
  <div>
    <router-view/>
    <FooterGuide v-show="$route.meta.show"/>
  </div>
</template>

<script>
  import FooterGuide from './components/footer-guide/footer-guide.vue';
  import {reqPosition} from './api'
  export default {
    mounted () {
      this.$store.dispatch('getPosition');
      this.$store.dispatch('getShops');
      this.$store.dispatch('getCategorys');

      //免登录  需要请求userinfo路由
      this.$store.dispatch('getUser')
    },
    data () {
      return {

      }
    },

    components : {
      FooterGuide
    }
  }
</script>
<!--告诉webpack使用stylus解析-->
<style type="text/css" lang="stylus" rel="stylesheet/stylus">

</style>
