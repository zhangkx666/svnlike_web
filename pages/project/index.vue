<template>
  <div>
    <div class="page-header">
      <div class="fl-l">
        <h1>Projects</h1>
      </div>
      <div class="fl-r">
        <nuxt-link to="/project/new">
          <h-button class="x-btn light">Create project</h-button>
        </nuxt-link>
      </div>
      <div class="clear"></div>
    </div>
    <div class="page-content">
      <Row class="m-t-20">
        <Cell :xs="24" :sm="12" :md="10" :xl="8">
          <div class="search-project">
            <Search v-model="searchText" class="w-p100" placeholder="Project" @search="getProjectList" />
          </div>
        </Cell>
        <Cell :xl="16" class="hide-md-and-down">
          <div class="view">
            <i class="icon" :class="{ 'color-color': viewType === 24 }" @click="changeViewType(24)">&#xe663;</i>
            <i class="icon" :class="{ 'color-color': viewType === 12 }" @click="changeViewType(12)">&#xe7b7;</i>
          </div>
        </Cell>
      </Row>
      <Row :space="20" class="projects m-t-40">
        <template v-if="showSkeleton">
          <Cell v-for="idx in 4" :key="idx" :md="24" :xl="viewType">
            <Skeleton :loading="showSkeleton" :rows="2" :avatar-size="80" avatar-shape="square" avatar active></Skeleton>
          </Cell>
        </template>
        <Cell v-for="project in likedProjects" :key="project.urlName" :md="24" :xl="viewType">
          <project-card :project="project" :liked="true" @refreshLiked="refreshLiked" />
        </Cell>
        <Cell v-for="project in unlikedProjects" :key="project.urlName" :md="24" :xl="viewType">
          <project-card :project="project" :liked="false" @refreshLiked="refreshLiked" />
        </Cell>
        <Loading :loading="loading"></Loading>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectIndex',
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
  text-align: right;
  height: 32px;
  overflow: hidden;

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
