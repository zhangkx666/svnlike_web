<template>
  <div v-if="flash !== null && isShow" class="alert" :class="'alert-' + flash.type">
    <i v-if="displayIcon" class="icon icon-pre" v-html="iconText"></i>
    <span>{{ flash.message }}</span>
    <span class="btn-close" @click="isShow = false">
      <i class="icon">&#xe65f;</i>
    </span>
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
  padding: 15px;
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
    color: #a94442;
    background-color: #f2dede;
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
  line-height: 1.2;
  padding-bottom: 12px;
}

.icon-pre {
  font-size: 20px;
  margin-right: 5px;
}

.btn-close {
  cursor: pointer;
  position: absolute;
  right: 15px;

  .icon {
    font-size: 12px;
  }
}
</style>
