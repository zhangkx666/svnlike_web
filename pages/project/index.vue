<template>
  <div>
    <div class="page-header">
      <div class="fl-l">
        <h1>Projects</h1>
      </div>
      <div class="fl-r">
        <nuxt-link to="/project/new">
          <el-button class="x-btn" native-type="submit" type="primary" size="small">
            Create project
          </el-button>
        </nuxt-link>
      </div>
      <div class="clear"></div>
    </div>
    <div v-loading="loading" class="page-content">
      <el-row :gutter="20">
        <template v-for="idx in 2">
          <a-skeleton :key="idx" :loading="loading" class="m-b-30" active avatar />
        </template>
        <el-col v-for="project in projects" :key="project.name" :lg="24">
          <div class="card">
            <div class="avatar">
              <nuxt-link :to="'/project/' + project.urlName" class="color-color">
                <el-image :src="project.avatar || ''" fit="fill">
                  <div slot="error" class="no-avatar color-color">
                    {{ project.name.substr(0, 1).toUpperCase() }}
                  </div>
                </el-image>
              </nuxt-link>
            </div>
            <div class="content">
              <h2>
                <nuxt-link :to="'/project/' + project.urlName" class="color-color">
                  {{ project.name }}
                </nuxt-link>
              </h2>
              <div class="desc">
                {{ project.description }}
              </div>
            </div>
            <el-dropdown class="more" trigger="click">
              <span class="el-dropdown-link">
                <i class="icon" style="font-size: 18px;">&#xe672;</i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <nuxt-link :to="'/project/' + project.url + '/edit'" class="block">
                    Edit
                  </nuxt-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <nuxt-link :to="'/project/' + project.url + '/members'" class="block">
                    Members
                  </nuxt-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      projects: [],
    }
  },
  created() {
    // get repository list
    this.$axios.get('project').then((res) => {
      this.projects = res.data
      this.loading = false
    })
  },
}
</script>

<style scoped lang="less">
.card {
  background: #f8f8f8;
  padding: 12px;
  margin-bottom: 30px;
  position: relative;
  height: 106px;

  &:hover {
    background: #f5f5f5;
    //box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }

  .avatar {
    position: fixed;
    width: 80px;
    height: 80px;
    border: 3px solid #fff;
    text-align: center;
  }

  .content {
    h2 {
      margin-top: -2px;
    }

    margin-left: 100px;
    margin-right: 20px;
  }

  .more {
    position: absolute;
    top: 2px;
    right: 12px;
  }
}
</style>
