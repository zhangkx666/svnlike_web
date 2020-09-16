<template>
  <div id="menu" class="menu-x">
    <ul>
      <li>
        <nuxt-link to="/">
          <i class="icon">&#xebee;</i>
          <span class="menu-text">Home</span>
        </nuxt-link>
      </li>

      <li>
        <nuxt-link to="/task/project">
          <i class="icon">&#xe64a;</i>
          <span class="menu-text">Project</span>
        </nuxt-link>

        <ul class="sub-menu">
          <li>
            <nuxt-link to="/task/project/design">
              <span class="menu-text">svnlike.com</span>
            </nuxt-link>
          </li>

          <li>
            <nuxt-link to="/task/project/coding">
              <span class="menu-text">marssvn.com</span>
            </nuxt-link>
          </li>

          <li>
            <nuxt-link to="/task/project/review">
              <span class="menu-text">某OA管理系统</span>
            </nuxt-link>
          </li>
        </ul>
      </li>

      <li>
        <nuxt-link to="/task/learning"><i class="icon">&#xe628;</i> <span class="menu-text">学习Task</span></nuxt-link>

        <ul class="sub-menu">
          <li>
            <nuxt-link to="/task/learning/coding"> <i class="icon">&#xe6aa;</i> <span class="menu-text">我的任务</span> </nuxt-link>
          </li>

          <li>
            <nuxt-link to="/task/learning/pool"><i class="icon">&#xe6cb;</i> <span class="menu-text">任务池</span> </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'XMenu',
}
</script>

<style lang="less" scoped>
@media screen and (max-width: 1200px) {
  .menu-x {
    display: none;
  }
}

.menu-x {
  z-index: 1001;
  background: #fafafa;
  position: fixed;
  width: 210px;
  transition: left 0.15s;
  top: 54px;
  bottom: 0;
  left: 0;
  box-shadow: inset -1px 0 0 #e5e5e5;
  transform: translate3d(0, 0, 0);
  overflow: auto;

  a:hover {
    text-decoration: none;
  }

  li {
    display: list-item;
    color: #393d49;

    a {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      color: #393d49;

      background: none;

      &.nuxt-link-active {
        color: #333333;
      }

      &.nuxt-link-exact-active {
        border-right-width: 4px;
        border-right-style: solid;
      }

      &.nuxt-link-active,
      &.nuxt-link-active + .sub-menu {
        background: #fcec9e;
      }
    }

    a:hover {
      background: #ebebeb;
      color: #2a2a2a;
    }

    .icon {
      position: relative;
      top: 1px;
    }

    .menu-text {
      margin-left: 10px;
    }

    ul.sub-menu {
      a {
        padding-left: 36px;
      }
    }
  }
}
</style>
