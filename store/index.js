export const state = () => ({
  // current theme
  theme: localStorage.getItem('theme') || 'light',

  // current color
  themeColor: localStorage.getItem('theme-color') || 'orange',

  // language
  lang: localStorage.getItem('lang') || 'en',
})

export const mutations = {
  changeTheme(state, theme) {
    state.theme = theme
    localStorage.setItem('theme', theme)
  },
  changeColor(state, color) {
    state.themeColor = color
    localStorage.setItem('theme-color', color)
  },
  changeLang(state, lang) {
    state.lang = lang
    localStorage.setItem('lang', lang)
  },
}
