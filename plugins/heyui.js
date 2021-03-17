import Vue from 'vue'
import Heyui from 'heyui'
import en from 'heyui/dist/locale/en-US'
import ColorPicker from 'heyui/src/components/color-picker'

Vue.component('ColorPicker', ColorPicker)
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
