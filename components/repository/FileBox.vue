<template>
  <div>
    <div class="file-title">
      <nuxt-link v-if="file.parentPath != null && displayInFile" class="back" :to="'/svn/repository/' + $route.params.name + '/tree?path=' + file.parentPath">
        <i class="icon">&#xe631;</i>
      </nuxt-link>
      <file-icon :extension="file.ext" class="m-r-5" />
      <span class="bold">{{ file.name }}</span>
      <template v-if="displayInFile">
        <span class="color-grey m-l-10">{{ file.size | formatSize }}</span>
        <span class="color-grey m-l-10">Revision: {{ file.rev }}</span>
      </template>
    </div>
    <div class="file-content">
      <slot />
    </div>
  </div>
</template>

<script>
import FileIcon from '@/components/common/FileIcon'
export default {
  name: 'FileBox',
  components: { FileIcon },
  props: {
    file: {
      type: Object,
      required: true,
    },
    displayInFile: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="less" scoped>
.file-title {
  background: #f3f3f3;
  border: 1px solid #e5e5e5;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
}

.file-content {
  border: 1px solid #e5e5e5;
  border-top: none;
  min-height: 100px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  padding: 5px 11px;
}
a.back {
  font-size: 1.2em;
  margin-right: 13px;

  &:hover {
    i {
      color: #666 !important;
    }
    text-decoration: none !important;
  }
  i {
    color: #7f7f7f !important;
    font-size: 1.2em;
  }
}
</style>
