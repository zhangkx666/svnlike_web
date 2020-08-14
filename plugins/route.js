export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    // clear flash message
    store.commit('flashMessage', null)

    // check token
    next()
  })
}
