export default function ({ $axios, store }) {
  $axios.onError((error) => {
    // const response = error.response
    // if (response) {
    //   const message = response.data.message
    //
    //   switch (message.displayType) {
    //     case 'message':
    //       window.$nuxt.$message.error(message.message)
    //       break
    //     case 'flash':
    //       window.$nuxt.$flash.error(message.message || response.status + ' ' + response.statusText)
    //   }
    // }
    const response = error.response
    const data = {
      status: response.status,
      statusText: response.statusText,
      errorCode: response.data.code,
      message: response.data.message || response.status + ' ' + response.statusText,
    }
    return Promise.reject(data)
  })
}
