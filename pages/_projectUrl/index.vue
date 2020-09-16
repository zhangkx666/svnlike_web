<template>
  <div>
    <Skeleton :loading="showCardSkeleton" :rows="2" :avatar-size="80" avatar-shape="square" avatar active class="m-b-20">
      <project-card v-if="project" :project="project" :liked="likedProjectIds.includes(project.id)" />
    </Skeleton>
    <Tabs v-model="selectedTab" :datas="tabs" class="m-b-20" />

    <div v-if="selectedTab === 'Repositories'">
      <template v-if="repositoryList">
        <div v-if="repositoryList.length > 0">
          <Row class="m-b-10">
            <Cell :xl="16">
              <span>Total {{ repositoryList.length }} repositories</span>
            </Cell>
            <Cell :xl="8">
              <div class="align-right">
                <h-button type="submit" class="x-btn light" @click="gotoNewRepository">New repository</h-button>
              </div>
            </Cell>
          </Row>
          <div class="m-t-20">
            <repository-card v-for="repo in repositoryList" :key="repo.urlName" :repo="repo" class="m-b-20" />
          </div>
        </div>
        <div v-else class="m-t-10">
          <div class="m-b-15">No repository found in this project. Click the button below to create a new repository.</div>
          <h-button type="submit" class="x-btn" @click="gotoNewRepository">New repository</h-button>
        </div>
      </template>
      <Loading :loading="repoLoading" />
    </div>

    <div v-if="selectedTab === 'Members'">
      <Tabs v-model="selectedMemberTab" :datas="memberTabs" class="m-b-20" />
      <div class="m-b-40">
        This is the default member group for this project. You can create some other groups to manage the relationship between project and repositories.
      </div>
      <div class="m-b-40">
        <h5 class="sub-title m-b-15">Repository access</h5>
        <div>
          <span class="h-tag h-tag-yellow">Api document</span>
          <span class="h-tag h-tag-gray">Design</span>
          <span class="h-tag h-tag-gray"><i class="icon" title="private" style="font-size: 13px">&#xe7c0;</i> Admin</span>
        </div>
      </div>
      <div>
        <h5 class="sub-title m-b-20">Members</h5>
        <Avatar
          v-for="idx in 20"
          :key="idx"
          no-info
          :src="'https://secure.gravatar.com/avatar/2572c114125cd3999426d5fd61f25ec6?s=80&d=identicon'"
          class="m-r-15 m-b-15"
        ></Avatar>
      </div>
    </div>

    <div v-if="selectedTab === 'Settings'" class="p-t-15">
      <Row :space-x="30" :space-y="25">
        <Cell :xl="10" :xs="24">
          <div class="m-b-10">
            <label for="name"><b>Project name</b></label>
          </div>
          <div>
            <input id="name" ref="projectName" v-model="project.name" type="text" placeholder="Project name" class="w-p100" autocomplete="off" autofocus />
          </div>
        </Cell>
        <Cell :xl="4" :xs="8">
          <div class="m-b-10">
            <label for="id"><b>Project ID</b></label>
          </div>
          <div>
            <input id="id" :value="project.id" type="text" autocomplete="off" disabled />
          </div>
        </Cell>
      </Row>

      <div class="m-t-20 m-b-10">
        <label for="urlName"><b>Project URL</b></label>
      </div>
      <Row :space-x="30">
        <Cell :xl="10" :xs="24">
          <div class="h-input-group">
            <span class="h-input-addon">http://demo.svnlike.com/</span>
            <input id="urlName" v-model="project.urlName" type="text" placeholder="project_url" autocomplete="off" class="w-p100" />
          </div>
        </Cell>
      </Row>

      <div class="m-t-25 m-b-10">
        <label for="desc">
          <b>Project description</b>
          <span class="optional">(optional)</span>
        </label>
      </div>
      <Row>
        <Cell :xl="16" :sm="24">
          <div class="relative">
            <textarea id="desc" v-model="project.description" rows="4" placeholder="Project description" class="w-p100" />
          </div>
        </Cell>
      </Row>

      <div class="m-t-25">
        <label><b>Visibility</b></label>
      </div>
      <div class="relative">
        <div class="m-t-5">
          <Radio v-model="project.visibility" :value="2">
            <span class="radio-title">Private</span> <br />
            <span class="radio-desc">Only Members can see this project</span>
          </Radio>
        </div>
        <div class="m-t-10">
          <Radio v-model="project.visibility" :value="1">
            <span class="radio-title">Public</span> <br />
            <span class="radio-desc">Everyone on the internet can see this project</span>
          </Radio>
        </div>
      </div>

      <div class="m-t-40">
        <h-button type="submit" size="l" class="x-btn" :loading="isLoading">Save changes</h-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectHome',
  data() {
    return {
      tabs: ['Repositories', 'Members', 'Settings'],
      selectedTab: 'Repositories',
      memberTabs: ['Default', 'Group Leader', 'Group PG', 'Group Test', 'Intern'],
      selectedMemberTab: 'Default',
      projectUrl: '',
      project: null,
      repositoryList: null,
      likedProjectIds: [],
      showCardSkeleton: true,
    }
  },
  computed: {
    repoLoading() {
      return this.repositoryList == null
    },
  },
  created() {
    this.projectUrl = this.$route.params.projectUrl
    if (this.projectUrl) {
      this.getLikedProjectIds()
      this.getProject()
    }
  },
  methods: {
    // get project by url name
    getProject() {
      this.$axios
        .$get('project/' + this.projectUrl)
        .then((data) => {
          this.project = data
          this.showCardSkeleton = false

          this.getRepositories()
        })
        .catch((error) => {
          this.$message.error(error.message)
        })
    },
    // get repository
    getRepositories() {
      this.$axios.$get('project/' + this.project.id + '/repository').then((data) => {
        this.repositoryList = data
      })
    },
    // get liked project ids
    getLikedProjectIds() {
      this.$axios.$get('project/likedIds').then((data) => {
        this.likedProjectIds = data
      })
    },
    // go to new repository  page
    gotoNewRepository() {
      this.$store.commit('project/setCurrent', {
        id: this.project.id,
        urlName: this.project.urlName,
        visibility: this.project.visibility,
      })
      this.$router.push({ name: 'repository-new' })
    },
  },
}
</script>

<style scoped lang="less"></style>
