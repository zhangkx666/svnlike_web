export default function ({ $axios, store }) {
  $axios.onError((error) => {
    const response = error.response
    if (response) {
      const data = response.data

      // show alert:error
      // store.commit('showFlash', true)
      store.commit('flashMessage', {
        type: data.type || 'error',
        code: data.code,
        message: data.message || response.status + ' ' + response.statusText,
      })

      // setTimeout(function () {
      //   store.commit('flashMessage', null)
      // }, 10000)
      // window.$nuxt.$message.error(data.message, 5)
    }
    return Promise.resolve(error)
  })
}
