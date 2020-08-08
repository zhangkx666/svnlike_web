<template>
  <div>
    <div class="header-line color-color-bg"></div>
    <div class="header">
      <div class="left">
        <logo />
        <div class="search-box">
          <a-input
            ref="userNameInput"
            v-model="searchText"
            class="dark-no-border"
            placeholder="Project, Repository, Team, User"
          >
            <i slot="suffix" class="icon">&#xe634;</i>
          </a-input>
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
              Zhang, Robbie Kunxiang <i class="icon m-l-5 f12px">&#xe658;</i>
              <!--              <a-icon type="down"/>-->
            </a>
            <a-menu slot="overlay">
              <a-menu-item key="0" class="p-r-30 menu-item">
                <i class="icon m-r-5">&#xe649;</i>
                个人中心
              </a-menu-item>
              <a-menu-item key="1" class="menu-item">
                <i class="icon m-r-5">&#xe6ae;</i>
                个人设置
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="2" class="menu-item">
                <i class="icon m-r-5">&#xe6c2;</i>
                退出
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="3" class="menu-item">
                <a class="color-color" href="http://www.marssvn.com" target="_blank">
                  <i class="icon m-r-5">&#xebee;</i>
                  www.svnlike.com
                </a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        <div class="fl-l">
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
        <div class="fl-l">
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

                <div class="m-t-10">
                  <a-switch
                    checked-children="深色"
                    un-checked-children="浅色"
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

<style scoped lang="less">
.header-line {
  height: 4px;
}

.header {
  height: 48px;
  line-height: 48px;
  overflow: hidden;
  clear: both;

  .left {
    float: left;
    height: 48px;
    line-height: 48px;
    clear: both;

    .logo {
      float: left;
      height: 48px;
      line-height: 48px;
      margin-left: 20px;
      padding-top: 2px;
    }

    .search-box {
      float: left;
      height: 48px;
      line-height: 48px;
      width: 320px;
      margin-left: 20px;
    }
  }

  .right {
    float: right;
    height: 48px;
    line-height: 48px;
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

        span {
          display: inline-block;
          width: 28px !important;
          height: 28px !important;
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
