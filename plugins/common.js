import Vue from 'vue'
import _ from 'lodash'
import Prism from 'prismjs'
import HyperDown from 'assets/HyperDown/Parser'

// iconfont svg
// import './iconfont'
import 'assets/iconfont/iconfont'

Vue.prototype._ = _
Vue.prototype.Prism = Prism
Vue.prototype.HyperDown = HyperDown

// Vue filters
// format size, byte -> KB, MB, GB
Vue.filter('formatSize', function (size) {
  if (size == null || size === 0) {
    return '0 KB'
  } else if (size < 1024) {
    return '1 KB'
  }
  const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const index = Math.floor(Math.log(size) / Math.log(1024))
  const fileSize = size / Math.pow(1024, index)
  return fileSize.toFixed(0) + ' ' + unitArr[index]
})
