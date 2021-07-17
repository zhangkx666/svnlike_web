<template>
  <div v-if="repository">
    <h5>
      <nuxt-link :to="'/' + repository.projectUrlName" class="color-hover">{{ repository.projectName }}</nuxt-link>
      /
      <nuxt-link :to="repository.urlName" class="color-hover">
        {{ repository.name }}
        <i v-if="repository.visibility === 2" class="icon icon-16px" title="private">&#xe7c0;</i>
      </nuxt-link>
    </h5>
    <div class="desc">{{ repository.description }}</div>
    <div class="m-t-20">
      <div class="h-input-group">
        <span class="h-input-addon" style="border-right: 1px solid #dcdfe6">
          <i class="icon icon-16px">&#xe6d3;</i>
        </span>
        <span class="h-input-addon">
          <nuxt-link :to="repository.urlName" class="color-hover"> {{ repository.projectUrlName }}/{{ repository.urlName }}/ </nuxt-link>
        </span>
        <input type="text" placeholder="Type to find a file or folder..." />
        <span class="h-input-addon">Copy</span>
      </div>
    </div>
    <div class="m-t-20" style="border: 1px solid #dcdfe6; border-radius: 4px">
      <table class="table table-list">
        <thead>
          <tr>
            <th class="align-left">Name</th>
            <th width="120" class="align-right">Size</th>
            <th width="120" class="align-right">Revision</th>
            <th width="150">Author</th>
            <th width="150">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="path !== ''">
            <td class="no-padding-top-bottom" colspan="5">
              <div class="go-upper" title="返回上级目录">
                <b>. .</b>
              </div>
            </td>
          </tr>
          <template v-if="tree">
            <tr v-for="item in tree" :key="item.name">
              <td>
                <template v-if="item.kind === 'dir'">
                  <svg-icon icon="folder" />
                  <nuxt-link :to="'?path=' + item.name" class="color-hover"> {{ item.name }}</nuxt-link>
                </template>
                <template v-else>
                  <file-icon :extension="item.ext" />
                  {{ item.name }}
                </template>
                <svg-icon v-if="item.lock" icon="lock" />
                <span v-if="item.lock" class="lock" :title="'locked by ' + item.lock.owner + ' @ ' + item.lock.createdAt + '\n' + item.lock.comment">
                  {{ item.lock.owner }}
                </span>
              </td>
              <td class="align-right">
                <span v-if="item.size > 0">{{ item.size | formatSize }}</span>
              </td>
              <td class="align-right">{{ item.rev }}</td>
              <td class="align-center">{{ item.author }}</td>
              <td class="align-center">{{ item.commitDate }}</td>
            </tr>
          </template>
        </tbody>
      </table>
      <Loading :loading="loading"></Loading>
    </div>

    <file-box v-if="readmeFile" :file="readmeFile" :display-in-file="false" class="m-t-30 m-b-30">
      <markdown v-if="readmeFile.ext === 'md'" :markdown="readmeFile.content" />
    </file-box>
  </div>
</template>

<script>
import SvgIcon from '@/components/common/SvgIcon'
import FileIcon from '@/components/common/FileIcon'
import FileBox from '@/components/repository/FileBox'
import Markdown from '@/components/common/Markdown'

export default {
  name: 'Index',
  components: {
    Markdown,
    FileBox,
    FileIcon,
    SvgIcon,
  },
  data() {
    return {
      path: '',
      projectUrl: '',
      repositoryUrl: '',
      repository: null,
      tree: [],
      loading: true,
      showReadme: false,
      readmeFile: null,
    }
  },
  watch: {
    $route: 'getTree',
  },
  created() {
    this.projectUrl = this.$route.params.projectUrl
    this.repositoryUrl = this.$route.params.repositoryUrl
    this.getRepository()
  },
  methods: {
    // get repository
    getRepository() {
      this.$axios
        .$get('repository/' + this.projectUrl + '/' + this.repositoryUrl)
        .then((data) => {
          this.repository = data
          if (this.repository) {
            this.getTree()
          }
        })
        .catch((error) => {
          this.$message.error(error.message)
        })
    },
    // get tree
    getTree() {
      this.loading = true
      this.path = this.$route.query.path
      if (this.path === undefined) this.path = ''
      this.$axios
        .$get('repository/' + this.repository.id + '/tree?path=' + this.path)
        .then((data) => {
          this.tree = data
          this.loading = false

          // show readme.md
          this.showReadme = false
          this.isMarkdownReadme = false
          this.readmeFile = null
          const _this = this
          const _ = this._
          _.each(this.tree, (item) => {
            if (item.kind === 'file') {
              const fileName = item.name.toLowerCase()
              if (_.startsWith(fileName, 'readme')) {
                _this.showReadme = true
                _this.getReadmeContent((_this.path ? _this.path + '/' : '') + fileName)
                return false
              }
            }
          })
        })
        .catch((error) => {
          this.$message.error(error.message)
        })
    },
    getReadmeContent(path) {
      this.$axios.get('repository/' + this.repository.id + '/file?path=' + path).then((res) => {
        this.readmeFile = res.data
      })
    },
  },
}
</script>

<style scoped>
.desc {
  color: #999999;
  margin-top: 5px;
  white-space: pre-wrap;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 5px;
}
.go-upper {
  cursor: pointer;
  display: inline-block;
  width: 100%;
  line-height: 40px;
  padding-left: 6px;
}
.lock {
  color: #999999;
  float: right;
}
</style>
