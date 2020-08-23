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
    <div class="page-content">
      <el-row class="m-t-20 m-b-10">
        <el-col :md="8">
          <div class="search-project">
            <el-input v-model="searchText" placeholder="Project" @keyup.enter.native="getProjectList">
              <i slot="suffix" class="icon icon-search">&#xe634;</i>
            </el-input>
          </div>
        </el-col>
        <el-col :md="16">
          <div class="view">
            <i class="icon" :class="{ 'color-color': viewType === 24 }" @click="changeViewType(24)">&#xe663;</i>
            <i class="icon" :class="{ 'color-color': viewType === 12 }" @click="changeViewType(12)">&#xe7b7;</i>
          </div>
        </el-col>
      </el-row>
      <el-row v-loading="loading" :gutter="20" class="projects">
        <div v-if="showSkeleton">
          <el-col v-for="idx in 4" :key="idx" :lg="viewType">
            <template>
              <a-skeleton :loading="showSkeleton" active :avatar="{ size: 74, shape: 'square' }" class="m-2-30" />
            </template>
          </el-col>
        </div>
        <el-col v-for="project in likedProjects" :key="project.urlName" :lg="viewType" class="m-b-20">
          <project-card :project="project" :liked="true" @refreshLiked="refreshLiked" />
        </el-col>
        <el-col v-for="project in unlikedProjects" :key="project.urlName" :lg="viewType" class="m-b-20">
          <project-card :project="project" :liked="false" @refreshLiked="refreshLiked" />
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
      showSkeleton: true,
      projects: [],
      likedProjectIds: [],
      viewType: 12,
      searchText: '',
    }
  },
  computed: {
    likedProjects() {
      const _this = this
      return this.projects.filter(function (project) {
        return _this.likedProjectIds.includes(project.id)
      })
    },
    unlikedProjects() {
      const _this = this
      return this.projects.filter(function (project) {
        return !_this.likedProjectIds.includes(project.id)
      })
    },
  },
  created() {
    this.viewType = parseInt(localStorage.getItem('svnlike-project-view-type')) || 12
    this.getLikedProjectIds()
    this.getProjectList()
  },
  methods: {
    changeViewType(viewType) {
      this.viewType = viewType
      localStorage.setItem('svnlike-project-view-type', viewType)
    },
    // get repository list
    getProjectList() {
      this.loading = true
      this.$axios
        .$get('project', {
          params: {
            keyword: this.searchText.trim(),
            pageSize: 1000,
            page: 1,
          },
        })
        .then((data) => {
          this.projects = data
          this.loading = false
          this.showSkeleton = false
        })
    },
    // get liked project ids
    getLikedProjectIds() {
      this.$axios.$get('project/likedIds').then((data) => {
        this.likedProjectIds = data
      })
    },
    // refresh liked
    refreshLiked(args) {
      if (args.isLike) {
        this.likedProjectIds.push(args.pid)
      } else {
        this.likedProjectIds.splice(this.likedProjectIds.indexOf(args.pid), 1)
      }
    },
  },
}
</script>

<style scoped lang="less">
.search-project {
  .icon-search {
    position: relative;
    top: 5px;
  }
}

.view {
  margin-top: 5px;
  margin-bottom: 20px;
  text-align: right;

  i {
    font-size: 18px;
    margin-left: 3px;
    cursor: pointer;
  }
}

.page-content {
  .projects {
    min-height: 520px;
  }
}
</style>
