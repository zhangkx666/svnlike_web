<template>
  <div :class="[$store.state.theme, $store.state.themeColor]">
    <x-header />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('changeTheme', localStorage.getItem('theme') || 'light')
    this.$store.commit('changeColor', localStorage.getItem('theme-color') || 'orange')
    this.$store.commit('changeLang', localStorage.getItem('lang') || 'en')
  },
}
</script>

<style></style>
