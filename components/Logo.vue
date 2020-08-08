<template>
  <div class="logo">
    <a href="/">
      <i class="icon icon-icon color-contrast">&#xf4c2;</i>
      <i class="icon icon-svn color-contrast">&#xe63d;</i>
      <i class="icon icon-like color-color">&#xe636;</i>
    </a>
  </div>
</template>

<style lang="less">
.logo {
  a {
    display: block;

    .icon-icon {
      font-size: 24px;
      position: relative;

      &:hover {
        display: inline-block;
        transform: rotate(2000deg);
        transition: 20s;
      }

      //background: #5cb85c;
    }

    .icon-svn,
    .icon-like {
      font-size: 60px;
      -webkit-text-stroke-width: 0;
    }

    .icon-like {
      margin-left: -6px;
    }
  }
}
</style>
