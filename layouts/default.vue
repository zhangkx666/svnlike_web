<template>
  <div :class="[$store.state.theme, $store.state.themeColor]">
    <x-header class="header" />
    <!--    <x-menu />-->
    <!--    <x-breadcrumb />-->

    <transition name="layout">
      <div class="main">
        <x-flash :flash="$store.state.flash" :duration="1000" />
        <Nuxt />
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  mounted() {
    // this.$store.commit('changeTheme', localStorage.getItem('theme') || 'light')
    // this.$store.commit('changeColor', localStorage.getItem('theme-color') || 'orange')
    // this.$store.commit('changeLang', localStorage.getItem('lang') || 'en')
  },
}
</script>
<style scoped lang="less">
.main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
  //min-height: 600px;
  //background: #f5f5f5;
}
</style>
