<template>
  <div class="markdown">
    <div v-html="markdownHtml"></div>
  </div>
</template>

<script>
import 'assets/HyperDown/markdown.css'
export default {
  name: 'Markdown',
  props: {
    markdown: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      markdownHtml: '',
    }
  },
  created() {
    this.makeHtml(this.markdown)
  },
  // watch: {
  //   markdown: function (_markdown) {
  //     this.makeHtml(_markdown);
  //   }
  // },
  methods: {
    makeHtml(_markdown) {
      // resolve markdown
      this.markdownHtml = this.HyperDown.makeHtml(_markdown)

      // highlight
      const _this = this
      setTimeout(function () {
        _this.Prism.highlightAll()
      }, 10)
    },
  },
}
</script>

<style scoped></style>
