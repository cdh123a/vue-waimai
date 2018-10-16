<template>
  <div>
    B1组件
  </div>
</template>
<script>
  export default {
    /*非路由组件 使用这种
    mounted () {
      this.intervalId = setInterval(() => {
        console.log('做些事件...')
      }, 1000)
    },

    beforeDestroy() {
      clearInterval(this.intervalId)
    },*/

    //组件对象跳转死亡 可以死，设置keep-alive，就可以不死，因此使用route的回调效果更好一点
    // 当前组件对象将要更新前调用, 可以访问this
    beforeRouteEnter (to, from, next) {
      next(component => {
        component.intervalId = setInterval(() => {
          console.log('做些事件...')
        }, 1000)
      })
    },
    // 在当前组件离开前调用, 可以访问this
    beforeRouteLeave (to, from, next) {
      clearInterval(this.intervalId)
      next()
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
