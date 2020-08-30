// flash
import Vue from 'vue'

Vue.prototype.$flash = {
  error(message) {
    return { type: 'error', message }
  },
  success(message) {
    return { type: 'success', message }
  },
  warning(message) {
    return { type: 'warning', message }
  },
  info(message) {
    return { type: 'info', message }
  },
}
