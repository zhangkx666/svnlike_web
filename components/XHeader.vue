<template>
  <div>
    <div class="header-line color-color-bg"></div>
    <div class="header">
      <x-logo />
      <div class="left">
        <div class="search-box">
          <!--          <a-input v-model="searchText" class="dark-no-border" placeholder="Project, Repository, Team, User">-->
          <!--            <i slot="suffix" class="icon">&#xe634;</i>-->
          <!--          </a-input>-->
          <el-input v-model="searchText" placeholder="Project, Repository, Team, User">
            <i slot="suffix" class="icon">&#xe634;</i>
          </el-input>
        </div>
        <div class="header-menu">
          <a-dropdown
            class="btn-add"
            :trigger="['click']"
            :get-popup-container="(triggerNode) => triggerNode.parentNode"
          >
            <a-menu slot="overlay">
              <a-menu-item key="1" class="menu-item">
                <nuxt-link to="/project/new">
                  <i class="icon">&#xe64a;</i>
                  <span class="m-l-5">New project</span>
                </nuxt-link>
              </a-menu-item>
              <a-menu-item key="2" class="menu-item">
                <nuxt-link to="/repository/new">
                  <i class="icon">&#xe656;</i>
                  <span class="m-l-5">New repository</span>
                </nuxt-link>
              </a-menu-item>
              <!--              <a-menu-divider />-->
              <!--              <a-menu-item key="3" class="menu-item">-->
              <!--                <i class="icon">&#xe65c;</i>-->
              <!--                <span class="m-l-5">新建wiki</span>-->
              <!--              </a-menu-item>-->
            </a-menu>
            <a-button>
              <i class="icon icon-18px">&#xe8d6;</i>
            </a-button>
          </a-dropdown>
        </div>
      </div>
      <div class="right">
        <div class="user fl-l">
          <a-dropdown
            :trigger="['click']"
            placement="bottomRight"
            :get-popup-container="(triggerNode) => triggerNode.parentNode"
          >
            <a class="ant-dropdown-link color-contrast" style="display: block;" @click="(e) => e.preventDefault()">
              <a-avatar
                size="small"
                class="m-r-5"
                src="https://secure.gravatar.com/avatar/2572c114125cd3999426d5fd61f25ec6?s=80&d=identicon"
              />
              zhangkx
              <i class="icon m-l-5 f12px">&#xe658;</i>
              <!--              <a-icon type="down"/>-->
            </a>
            <a-menu slot="overlay">
              <a-menu-item key="0" class="p-r-30 menu-item">
                <i class="icon m-r-5">&#xe649;</i>
                Profile
              </a-menu-item>
              <a-menu-item key="1" class="menu-item">
                <i class="icon m-r-5">&#xe6ae;</i>
                Settings
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="2" class="menu-item">
                <i class="icon m-r-5">&#xe6c2;</i>
                Sign out
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3" class="menu-item">
                <a class="color-color" href="http://www.svnlike.com" target="_blank">
                  <i class="icon m-r-5">&#xebee;</i>
                  www.svnlike.com
                </a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        <div class="fl-l" style="display: none;">
          <a-dropdown
            :trigger="['click']"
            placement="bottomRight"
            :get-popup-container="(triggerNode) => triggerNode.parentNode"
          >
            <a class="ant-dropdown-link color-contrast" style="display: block;" @click="(e) => e.preventDefault()">
              <i class="icon m-l-10 icon-16px">&#xe654;</i>
            </a>
            <a-menu slot="overlay">
              <a-menu-item
                key="0"
                class="p-r-30 menu-item"
                :class="{ active: $store.state.lang === 'en' }"
                @click="$store.commit('changeLang', 'en')"
              >
                English
              </a-menu-item>
              <a-menu-item
                key="1"
                class="menu-item"
                :class="{ active: $store.state.lang === 'zh-CN' }"
                @click="$store.commit('changeLang', 'zh-CN')"
              >
                简体中文
              </a-menu-item>
              <a-menu-item
                key="2"
                class="menu-item"
                :class="{ active: $store.state.lang === 'zh-TW' }"
                @click="$store.commit('changeLang', 'zh-TW')"
              >
                繁体中文
              </a-menu-item>
              <a-menu-item
                key="3"
                class="menu-item"
                :class="{ active: $store.state.lang === 'ja-JP' }"
                @click="$store.commit('changeLang', 'ja-JP')"
              >
                日本語
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        <div class="fl-l" style="display: block;">
          <a-dropdown
            :trigger="['click']"
            placement="bottomRight"
            :get-popup-container="(triggerNode) => triggerNode.parentNode"
          >
            <a class="ant-dropdown-link color-contrast" style="display: block;" @click="(e) => e.preventDefault()">
              <i class="icon m-l-10 icon-16px">&#xe6a2;</i>
            </a>
            <a-menu slot="overlay">
              <a-menu-item key="0" class="menu-item color-picker">
                <div>
                  <span
                    class="blue"
                    :class="{ selected: $store.state.themeColor === 'blue' }"
                    @click.stop="$store.commit('changeColor', 'blue')"
                  />
                  <span
                    class="green"
                    :class="{ selected: $store.state.themeColor === 'green' }"
                    @click.stop="$store.commit('changeColor', 'green')"
                  />
                  <span
                    class="orange"
                    :class="{ selected: $store.state.themeColor === 'orange' }"
                    @click.stop="$store.commit('changeColor', 'orange')"
                  />
                  <span
                    class="purple"
                    :class="{ selected: $store.state.themeColor === 'purple' }"
                    @click.stop="$store.commit('changeColor', 'purple')"
                  />
                </div>

                <div class="m-t-10">
                  <a-switch
                    checked-children="Dark"
                    un-checked-children="Light"
                    :checked="$store.state.theme === 'dark'"
                    @click="changeTheme"
                  />
                </div>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Avatar, Dropdown, Menu, Switch, Input } from 'ant-design-vue'

export default {
  name: 'XHeader',
  // components: {
  //   'a-avatar': Avatar,
  //   'a-dropdown': Dropdown,
  //   'a-menu': Menu,
  //   'a-menu-item': Menu.Item,
  //   'a-menu-divider': Menu.Divider,
  //   'a-switch': Switch,
  //   'a-input': Input
  // },
  data() {
    return {
      searchText: '',
    }
  },
  methods: {
    changeTheme(checked, e) {
      e.stopPropagation()
      this.$store.commit('changeTheme', checked ? 'dark' : 'light')
    },
  },
}
</script>
<style lang="less">
.el-input__inner {
  height: 32px !important;
}
</style>
<style scoped lang="less">
.header-line {
  height: 4px;
}

.header {
  height: 48px;
  line-height: 48px;
  overflow: hidden;
  clear: both;

  .logo {
    float: left;
    width: 150px;
    text-align: center;
    padding-top: 2px;
  }

  .left {
    float: left;

    .search-box {
      float: left;
      width: 320px;
    }

    .header-menu {
      float: left;
      margin-left: 10px;

      .btn-add {
        position: relative;
        top: -1px;
        padding: 2px 8px 0;
      }
    }
  }

  .right {
    float: right;
    overflow: hidden;
    padding-right: 15px;

    .user {
      display: inline-block;
      color: white;
      padding: 0 10px;

      .dark &:hover {
        background: #484d58;
      }

      .avatar-with-border {
        //border: 1px solid #dbdbdb;
        width: 26px;
        height: 26px;
      }
    }

    // drop down menu-item
    .menu-item {
      //font-size: 13px;

      &.color-picker {
        cursor: auto;
        transition: none !important;
        -webkit-backface-visibility: hidden;
        -webkit-transform-style: preserve-3d;

        span {
          display: inline-block;
          width: 28px;
          height: 28px;
          margin: 3px;
          cursor: pointer;

          &.selected {
            position: relative;
            //top: -14px;

            &:before {
              font-family: iconfont;
              content: '\e7bd';
              color: white;
              font-size: 18px;
              position: absolute;
              top: 4px;
              left: 5px;
            }
          }
        }

        background-color: #ffffff;

        &:hover {
          background-color: #ffffff !important;
        }
      }
    }
  }
}
</style>
