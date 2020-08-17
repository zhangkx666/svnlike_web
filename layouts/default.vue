<template>
  <div :class="[$store.state.theme, $store.state.themeColor]">
    <x-header />
    <!--    <x-menu />-->
    <!--    <x-breadcrumb />-->

    <transition name="layout">
      <div class="main-body">
        <x-flash :flash="$store.state.flash" />
        <Nuxt class="content" />
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
.main-body {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px 4%;
  //height: 600px;
  //background: #f5f5f5;
}
</style>
