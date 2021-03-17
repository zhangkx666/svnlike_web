<template>
  <span>
    <svg v-if="ext === 'xlsx' || ext === 'xls'" class="icon s13em" aria-hidden="true">
      <use xlink:href="#icon-excel"></use>
    </svg>
    <svg v-if="ext === 'docx' || ext === 'doc'" class="icon s13em" aria-hidden="true">
      <use xlink:href="#icon-word"></use>
    </svg>
    <i v-if="ext === 'png' || ext === 'gif' || ext === 'jpg' || ext === 'jpeg' || ext === 'bmp'" class="icon color-green">&#xe652;</i>
    <i v-if="ext === 'txt'" class="icon color-dark-grey">&#xe712;</i>
    <!--<i class="fas fa-file-code color-dark-grey" style="font-size: 1.2em" v-if="ext === 'java'"></i>-->
    <i v-if="ext === 'java'" class="icon color-dark-grey">&#xe651;</i>
    <i v-if="ext === 'xml'" class="icon">&#xe6cc;</i>
    <i v-if="ext === 'sql'" class="icon color-danger">&#xe621;</i>
    <i v-if="ext === 'json'" class="icon color-dark-grey">&#xe72a;</i>
    <svg v-if="ext === 'vue'" class="icon s13em" aria-hidden="true"><use xlink:href="#icon-vuejs"></use></svg>
    <i v-if="ext === 'properties'" class="icon color-dark-grey">&#xe632;</i>

    <i v-if="ext === 'cmd'" class="icon color-dark-grey">&#xe65b;</i>
    <!--<i class="fab fa-markdown" style="font-size: 1.2em" v-if="ext === 'md'"></i>-->
    <i v-if="ext === 'md'" class="icon color-dark-grey">&#xe6cf;</i>
    <i v-if="ext === '7z' || ext === 'zip' || ext === 'rar'" class="icon color-danger">&#xe62f;</i>
    <svg v-if="ext === 'rb'" class="icon s13em" aria-hidden="true">
      <use xlink:href="#icon-creditlevel"></use>
    </svg>
    <svg v-if="ext === 'css'" class="icon s13em" aria-hidden="true">
      <use xlink:href="#icon-css"></use>
    </svg>
    <svg v-if="ext === 'html'" class="icon s13em" aria-hidden="true">
      <use xlink:href="#icon-html"></use>
    </svg>
    <svg v-if="ext === 'folder'" class="icon s13em" aria-hidden="true">
      <use xlink:href="#icon-folder"></use>
    </svg>
  </span>
</template>

<script>
export default {
  name: 'FileIcon',
  props: {
    extension: {
      type: String,
      required: true,
    },
  },
  computed: {
    ext() {
      return this.extension.toLowerCase()
    },
  },
}
</script>

<style scoped></style>
