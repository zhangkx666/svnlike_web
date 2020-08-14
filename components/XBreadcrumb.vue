<template>
  <div class="breadcrumb">
    <ul>
      <!--      <li v-for="breadcrumb in $store.state.breadcrumbs">-->
      <!--        <router-link :to="breadcrumb.link ? breadcrumb.link : ''">-->
      <!--          {{ breadcrumb.title }}-->
      <!--        </router-link>-->
      <!--      </li>-->
      <li>
        <nuxt-link to="/">
          <i class="icon">&#xe656;</i>
          <span>德勤智能Learning管理系统 / 文档</span>
        </nuxt-link>
      </li>
      <!--      <li>-->
      <!--        <nuxt-link to="/task">-->
      <!--          Task-->
      <!--        </nuxt-link>-->
      <!--      </li>-->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'XBreadcrumb',
}
</script>

<style scoped lang="less">
.breadcrumb {
  color: #707070;
  background: #fff;
  position: absolute;
  //left: 211px;
  left: 0;
  right: 0;
  top: 54px;
  z-index: 1002;
  padding: 12px 15px;
  border-bottom: 1px solid #e5e5e5;
  font-size: 13px;

  li {
    float: left;
    margin-right: 5px;

    &:after {
      font-size: 10px;
      margin-left: 5px;
      font-family: iconfont;
      content: '\e602';
    }

    &:last-child:after {
      content: none;
    }
  }
}

@media screen and (max-width: 1200px) {
  .breadcrumb {
    left: 0;
  }
}
</style>
