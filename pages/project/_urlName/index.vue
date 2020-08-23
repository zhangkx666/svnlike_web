<template>
  <div>
    <template>
      <a-skeleton :loading="showCardSkeleton" class="m-b-20" active :avatar="{ size: 74, shape: 'square' }">
        <project-card v-if="project" :project="project" :liked="likedProjectIds.includes(project.id)" class="m-b-10" />
      </a-skeleton>
    </template>
    <el-tabs value="repository">
      <el-tab-pane label="Repository" name="repository">Repository</el-tab-pane>
      <el-tab-pane label="Users" name="user">User</el-tab-pane>
      <el-tab-pane label="Setting" name="setting">Setting</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Index',
  validate({ params }) {
    return /^[a-z\d_ ]+$/.test(params.urlName)
  },
  data() {
    return {
      project: null,
      likedProjectIds: [],
      showCardSkeleton: true,
    }
  },
  created() {
    this.getLikedProjectIds()
    this.getProject()
  },
  methods: {
    // get project by url name
    getProject() {
      const urlName = this.$route.params.urlName
      this.$axios
        .$get('project/' + urlName)
        .then((data) => {
          this.project = data
          this.showCardSkeleton = false
        })
        .catch((error) => {
          this.$flash.error(error.data.message)
        })
    },
    // get liked project ids
    getLikedProjectIds() {
      this.$axios.$get('project/likedIds').then((data) => {
        this.likedProjectIds = data
      })
    },
  },
}
</script>

<style scoped></style>
