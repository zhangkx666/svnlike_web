export const state = () => ({
  currentProject: null,
})

export const mutations = {
  setCurrent(state, project) {
    state.currentProject = project
  },
}
