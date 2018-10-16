/*过滤器*/
import Vue from 'vue'

import moment from 'moment'

Vue.filter('time-format', function(value , type = 'YYYY-MM-DD HH:mm:ss'){
  return moment(value).format(type)
})

/*过滤器类似mock  不需要向外暴露什么  只需执行一遍*/
