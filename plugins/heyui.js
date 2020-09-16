import Vue from 'vue'
import Heyui from 'heyui'
import en from 'heyui/dist/locale/en-US'

Vue.use(Heyui, { locale: en })

Vue.prototype.$message = {
  error(message) {
    Heyui.$Message({ type: 'error', text: message })
  },
  success(message) {
    Heyui.$Message({ type: 'success', text: message })
  },
  warning(message) {
    Heyui.$Message({ type: 'warning', text: message })
  },
  info(message) {
    Heyui.$Message({ type: 'info', text: message })
  },
}
