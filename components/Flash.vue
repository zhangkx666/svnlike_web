<template>
  <div v-if="showFlash" class="flash" :class="'flash-' + type">
    <div v-if="showIcon" class="flash-icon">
      <i class="icon-pre" :class="'h-icon-' + type"></i>
    </div>
    <div class="flash-content">
      <ul v-if="messageList" :class="{ many: messageList.length > 1 }">
        <template v-for="(item, idx) in messageList">
          <li v-if="item !== ''" :key="idx">
            {{ item }}
          </li>
        </template>
      </ul>
      <div :class="{ 'flash-slot': messageList.length > 1 }">
        <slot></slot>
      </div>
    </div>
    <div v-if="closable" class="flash-close" @click="close">
      <i class="h-icon-close"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Flash',
  props: {
    type: {
      type: String,
      default: 'info',
    },
    message: {
      type: [String, Array],
      default: null,
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 15, // default 10s
    },
  },
  data() {
    return {
      timeOutId: 0,
    }
  },
  computed: {
    showFlash() {
      return this.message != null
    },
    messageList() {
      if (this._.isArray(this.message)) {
        return this.message
      }
      if (this._.isString(this.message)) {
        return this.message.split('\n')
      }
      return null
    },
  },
  watch: {
    message() {
      if (this.duration > 0) {
        clearTimeout(this.timeOutId)
        const _this = this
        this.timeOutId = setTimeout(function () {
          _this.$emit('update:message', null)
        }, _this.duration * 1000)
      }
    },
  },
  methods: {
    close() {
      this.$emit('update:message', null)
      this.$emit('close')
    },
  },
}
</script>
