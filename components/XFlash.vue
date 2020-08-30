<template>
  <div v-if="flash !== null" class="alert" :class="'alert-' + flash.type">
    <div v-if="displayIcon" class="alert-icon">
      <i class="icon-pre" :class="iconClass"></i>
    </div>
    <div class="alert-message">
      <ul>
        <li v-for="(message, idx) in messageList" :key="idx" :class="{ decimal: messageList.length > 1 }">
          {{ message }}
        </li>
      </ul>
    </div>
    <div v-if="closable" class="alert-close" @click="flash = null">
      <i class="h-icon-close"></i>
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
    closable: {
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
      timeOutId: 0,
    }
  },
  computed: {
    iconClass() {
      const icons = {
        error: 'h-icon-error',
        warning: 'h-icon-warn',
        info: 'h-icon-info',
        success: 'h-icon-success',
      }
      return icons[this.flash.type]
    },
    messageList() {
      return this.flash.message.split('\n')
    },
  },
  watch: {
    flash(newVal, oldVal) {
      if (this.duration > 0) {
        clearTimeout(this.timeOutId)
        const _this = this
        this.timeOutId = setTimeout(function () {
          _this.flash = null
        }, this.duration * 1000)
      }
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
  top: 12px;

  .icon-pre {
    font-size: 20px;
  }
}

.alert-message {
  margin-left: 40px;
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
