export const state = () => ({
  // current theme
  theme: 'light',

  // current color
  themeColor: 'orange',

  // language
  lang: 'en',
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
