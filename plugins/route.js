export default function ({ app, store }) {
  app.router.beforeEach((to, from, next) => {
    // clear flash message
    if (store.state.flash.message) {
      store.commit('flash/clear')
    }
    // console.log(from)
    // console.log(to)
    // check token
    next()
  })
}
