<template>
  <div>
    <div class="header-line theme-bg"></div>
    <Row class="header">
      <Cell :xl="16" class="left">
        <x-logo />
        <div class="search-box hide-xs">
          <div class="h-input h-input-suffix-icon">
            <input type="text" />
            <i class="h-icon-search"></i>
          </div>
        </div>
      </Cell>
      <Cell :xl="8" class="right">
        <DropdownMenu :datas="userMenus" :toggle-icon="false" placement="bottom-end">
          <span class="pointer">
            <img class="user-avatar" width="28" alt="Z" src="https://secure.gravatar.com/avatar/2572c114125cd3999426d5fd61f25ec6?s=80&d=identicon" />
            <span class="user-name hide-xxs">zhangkx</span>
          </span>
        </DropdownMenu>
      </Cell>
      <div>
        <!--<div class="right">-->
        <!--<div class="user fl-l">-->
        <!--          <a-dropdown-->
        <!--            :trigger="['click']"-->
        <!--            placement="bottomRight"-->
        <!--            :get-popup-container="(triggerNode) => triggerNode.parentNode"-->
        <!--          >-->
        <!--            <a class="ant-dropdown-link color-contrast" style="display: block;" @click="(e) => e.preventDefault()">-->
        <!--              <a-avatar-->
        <!--                size="small"-->
        <!--                class="m-r-5"-->
        <!--                src="https://secure.gravatar.com/avatar/2572c114125cd3999426d5fd61f25ec6?s=80&d=identicon"-->
        <!--              />-->
        <!--              zhangkx-->
        <!--              <i class="icon m-l-5 f12px">&#xe658;</i>-->
        <!--              &lt;!&ndash;              <a-icon type="down"/>&ndash;&gt;-->
        <!--            </a>-->
        <!--            <a-menu slot="overlay">-->
        <!--              <a-menu-item key="0" class="p-r-30 menu-item">-->
        <!--                <i class="icon m-r-5">&#xe649;</i>-->
        <!--                Profile-->
        <!--              </a-menu-item>-->
        <!--              <a-menu-item key="1" class="menu-item">-->
        <!--                <i class="icon m-r-5">&#xe6ae;</i>-->
        <!--                Settings-->
        <!--              </a-menu-item>-->
        <!--              <a-menu-divider />-->
        <!--              <a-menu-item key="2" class="menu-item">-->
        <!--                <i class="icon m-r-5">&#xe6c2;</i>-->
        <!--                Sign out-->
        <!--              </a-menu-item>-->
        <!--              <a-menu-divider />-->
        <!--              <a-menu-item key="3" class="menu-item">-->
        <!--                <a class="color-color" href="http://www.svnlike.com" target="_blank">-->
        <!--                  <i class="icon m-r-5">&#xebee;</i>-->
        <!--                  www.svnlike.com-->
        <!--                </a>-->
        <!--              </a-menu-item>-->
        <!--            </a-menu>-->
        <!--          </a-dropdown>-->
        <!--</div>-->

        <!--        <div class="fl-l hidden-xs-only" style="display: block;">-->
        <!--          <a-dropdown-->
        <!--            :trigger="['click']"-->
        <!--            placement="bottomRight"-->
        <!--            :get-popup-container="(triggerNode) => triggerNode.parentNode"-->
        <!--          >-->
        <!--            <a class="ant-dropdown-link color-contrast" style="display: block;" @click="(e) => e.preventDefault()">-->
        <!--              <i class="icon m-l-10 icon-16px">&#xe6a2;</i>-->
        <!--            </a>-->
        <!--            <a-menu slot="overlay">-->
        <!--              <a-menu-item key="0" class="menu-item color-picker">-->
        <!--                <div>-->
        <!--                  <span-->
        <!--                    class="blue"-->
        <!--                    :class="{ selected: $store.state.themeColor === 'blue' }"-->
        <!--                    @click.stop="$store.commit('changeColor', 'blue')"-->
        <!--                  />-->
        <!--                  <span-->
        <!--                    class="green"-->
        <!--                    :class="{ selected: $store.state.themeColor === 'green' }"-->
        <!--                    @click.stop="$store.commit('changeColor', 'green')"-->
        <!--                  />-->
        <!--                  <span-->
        <!--                    class="orange"-->
        <!--                    :class="{ selected: $store.state.themeColor === 'orange' }"-->
        <!--                    @click.stop="$store.commit('changeColor', 'orange')"-->
        <!--                  />-->
        <!--                  <span-->
        <!--                    class="purple"-->
        <!--                    :class="{ selected: $store.state.themeColor === 'purple' }"-->
        <!--                    @click.stop="$store.commit('changeColor', 'purple')"-->
        <!--                  />-->
        <!--                </div>-->

        <!--                <div class="m-t-10">-->
        <!--                  <a-switch-->
        <!--                    checked-children="Dark"-->
        <!--                    un-checked-children="Light"-->
        <!--                    :checked="$store.state.theme === 'dark'"-->
        <!--                    @click="changeTheme"-->
        <!--                  />-->
        <!--                </div>-->
        <!--              </a-menu-item>-->
        <!--            </a-menu>-->
        <!--          </a-dropdown>-->
        <!--        </div>-->
        <!--      </div>-->
      </div>
    </Row>
  </div>
</template>

<script>
// import { Avatar, Dropdown, Menu, Switch, Input } from 'ant-design-vue'

export default {
  name: 'XHeader',
  data() {
    return {
      searchText: '',
      userMenus: [
        {
          title: 'Profile',
          key: 'profile',
          icon: 'h-icon-user',
        },
        {
          title: 'Settings',
          key: 'settings',
          icon: 'h-icon-setting',
        },
        {
          title: 'Sign out',
          key: 'sign_out',
          icon: 'h-icon-angle-right',
        },
        { divider: true },
        {
          title: 'Github',
          key: 'github',
          icon: 'h-icon-github',
        },
        {
          title: 'www.svnlike.com',
          key: 'svnlike_home',
          icon: 'h-icon-link',
        },
      ],
      // langs: [
      //   {
      //     title: 'English',
      //     key: 'en',
      //   },
      //   {
      //     title: '简体中文',
      //     key: 'zh-CN',
      //   },
      //   {
      //     title: '繁体中文',
      //     key: 'zh-TW',
      //   },
      //   {
      //     title: '日本語',
      //     key: 'ja-JP',
      //   },
      // ],
    }
  },
  methods: {
    // changeTheme(checked, e) {
    //   e.stopPropagation()
    //   this.$store.commit('changeTheme', checked ? 'dark' : 'light')
    // },
  },
}
</script>
<style scoped lang="less">
.header-line {
  height: 3px;
}

.header {
  height: 48px;
  padding: 0 15px;
  overflow: hidden;

  .left {
    position: relative;

    .search-box {
      position: absolute;
      left: 125px;
      top: 8px;
      display: inline-block;

      .h-input {
        line-height: 1.5;
        width: 280px;
      }
    }
  }

  .right {
    text-align: right;
    padding-top: 10px;

    .user-avatar {
      width: 26px;
      height: 26px;
      border-radius: 50%;
    }

    .user-name {
      position: relative;
      top: -8px;
      margin-left: 5px;
    }

    .lang-icon {
      position: relative;
      top: 1px;
      cursor: pointer;
    }
  }
}
</style>
