<template>
  <div v-if="flash !== null && isShow" class="alert" :class="'alert-' + flash.type">
    <div class="alert-icon">
      <i v-if="displayIcon" class="icon icon-pre" v-html="iconText"></i>
    </div>
    <div class="alert-message">
      <ul>
        <li v-for="(item, idx) in messageList" :key="idx" :class="{ decimal: messageList.length > 1 }">
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="alert-close" @click="isShow = false">
      <i class="icon">&#xe65f;</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XFlash',
  props: {
    flash: {
      type: Object,
      default: null,
    },
    displayIcon: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 10, // 10s
    },
  },
  data() {
    return {
      isShow: true,
      timeOutId: 0,
    }
  },
  computed: {
    iconText() {
      const icons = {
        error: '&#xe6b4;',
        warning: '&#xe65d;',
        info: '&#xe65e;',
        success: '&#xe65f;',
      }
      return icons[this.flash.type]
    },
    messageList() {
      return this.flash.message.split('\n')
    },
  },
  watch: {
    flash(newVal, oldVal) {
      this.isShow = true
      clearTimeout(this.timeOutId)
      const _this = this
      this.timeOutId = setTimeout(function () {
        _this.isShow = false
      }, this.duration * 1000)
    },
  },
}
</script>

<style lang="less">
.alert {
  font-size: 14px;
  padding: 10px 15px 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;

  &.alert-info {
    color: #31708f;
    background-color: #d9edf7;
    border-color: #bce8f1;
  }

  &.alert-warning {
    color: #8a6d3b;
    background-color: #fcf8e3;
    border-color: #faebcc;
  }

  &.alert-error {
    color: #c42d2a;
    background-color: #ffe3e3;
    border-color: #ebccd1;
  }

  &.alert-success {
    color: #3c763d;
    background-color: #dff0d8;
    border-color: #d6e9c6;
  }
}
</style>
<style scoped lang="less">
.alert {
  position: relative;
  line-height: 1.5;
  padding-bottom: 0;
}

.alert-icon {
  position: absolute;
  left: 15px;
  //top: 10px;

  .icon-pre {
    font-size: 20px;
  }
}

.alert-message {
  margin-left: 50px;
  margin-right: 30px;

  li.decimal {
    list-style: decimal;
  }
}

.alert-close {
  position: absolute;
  right: 15px;
  top: 10px;
  cursor: pointer;

  .icon {
    font-size: 12px;
  }
}
</style>
