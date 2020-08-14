<template>
  <div class="logo">
    <nuxt-link to="/">
      <!--      <i class="icon icon-icon color-contrast">&#xf4c2;</i>-->
      <span class="logo-icon">
        <i class="icon icon-svn color-contrast">&#xe63d;</i>
        <i class="icon icon-like color-color">&#xe636;</i>
      </span>
    </nuxt-link>
  </div>
</template>

<style lang="less">
.logo {
  a {
    display: block;

    .logo-icon {
      position: relative;
      top: -2px;

      //&:before {
      //  font-family: 'iconfont';
      //  content: '\f4c2';
      //  font-size: 24px;
      //  top: 3px;
      //  position: relative;
      //  right: 5px;
      //}
      //
      //&:hover::before {
      //  display: inline-block;
      //  transform: rotate(20000deg);
      //  transition: 100s;
      //}

      .icon-svn,
      .icon-like {
        font-size: 56px;
        -webkit-text-stroke-width: 0;
      }

      .icon-like {
        margin-left: -6px;
      }
    }
  }
}
</style>
