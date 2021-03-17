<template>
  <div v-if="repository">
    <h5>
      <nuxt-link :to="'/' + repository.projectUrlName" class="color-hover">{{ repository.projectName }}</nuxt-link> /
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
            <th width="150" class="align-right">Size</th>
            <th width="120" class="align-right">Revision</th>
            <th width="150">Author</th>
            <th width="150">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <svg-icon icon="folder" />
              trunk
            </td>
            <td class="align-right">-</td>
            <td class="align-right">1</td>
            <td class="align-center">zhangkx</td>
            <td class="align-center">2020-01-01 12:30:12</td>
          </tr>
          <tr>
            <td>
              <svg-icon icon="folder" />
              branches
            </td>
            <td class="align-right">-</td>
            <td class="align-right">2</td>
            <td class="align-center">zhangkx</td>
            <td class="align-center">2020-01-01 12:31:22</td>
          </tr>
          <tr>
            <td>
              <svg-icon icon="folder" />
              tags
            </td>
            <td class="align-right">-</td>
            <td class="align-right">3</td>
            <td class="align-center">zhangkx</td>
            <td class="align-center">2020-01-01 12:33:12</td>
          </tr>
          <tr>
            <td>
              <file-icon extension="vue" />
              index.vue
            </td>
            <td class="align-right">12 kb</td>
            <td class="align-right">3</td>
            <td class="align-center">zhangkx</td>
            <td class="align-center">2020-01-01 12:33:12</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div></div>
  </div>
</template>

<script>
import SvgIcon from '@/components/common/SvgIcon'
import FileIcon from '@/components/common/FileIcon'
export default {
  name: 'Index',
  components: { FileIcon, SvgIcon },
  data() {
    return {
      projectUrl: '',
      repositoryUrl: '',
      repository: null,
    }
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
        })
        .catch((error) => {
          this.$message.error(error.message)
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
</style>
