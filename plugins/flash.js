// flash
import Vue from 'vue'

Vue.prototype.$flash = {
  error(message) {
    commitFlashMessage('error', message)
  },
  success(message) {
    commitFlashMessage('success', message)
  },
  warning(message) {
    commitFlashMessage('warning', message)
  },
  info(message) {
    commitFlashMessage('info', message)
  },
  clear() {
    window.$nuxt.$store.commit('flashMessage', null)
  },
}

function commitFlashMessage(type, message) {
  window.$nuxt.$store.commit('flashMessage', { type, message })
}
