export default function ({ app, store }) {
  app.router.beforeEach((to, from, next) => {
    // clear flash message
    // if (store.state.flash) {
    //   store.commit('flashMessage', null)
    // }
    // console.log(from)
    // console.log(to)
    // check token
    next()
  })
}
