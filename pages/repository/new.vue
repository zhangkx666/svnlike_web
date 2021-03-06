<template>
  <div>
    <flash :message.sync="errorMessage" type="error" />
    <Row :space-x="50">
      <Cell :xl="7" :md="24" class="m-b-20">
        <h1 class="m-b-15">Create a new repository</h1>
        <p>Create a blank repository to house your codes, documents, or other files</p>
        <p class="m-t-5">A repository contains all project files, including the revision history</p>
      </Cell>
      <Cell :xl="17" :md="24">
        <form @submit.prevent="submitRepository">
          <div class="m-t-5 m-b-10">
            <label for="name"><b>Repository name</b></label>
          </div>
          <Row>
            <Cell :xl="18" :xs="24">
              <input
                id="name"
                ref="repoName"
                v-model="repo.name"
                type="text"
                placeholder="Repository name"
                class="w-p100"
                autocomplete="off"
                autofocus
                @blur="checkName"
                @input="typeUrlName"
              />
            </Cell>
          </Row>
          <div v-if="nameNotAvailable" class="field-error">Please fill in a descriptive name for your repository</div>

          <div class="m-t-20 m-b-10">
            <label for="urlName"><b>Repository URL</b></label>
          </div>
          <Row>
            <Cell :xl="18" :xs="24">
              <div class="h-input-group">
                <span class="h-input-addon">http://demo.svnlike.com/</span>
                <Select
                  v-model="repo.projectId"
                  :datas="projects"
                  :deletable="false"
                  :filterable="false"
                  :disabled="projectIdDisabled"
                  key-name="id"
                  title-name="urlName"
                  placeholder="Select project"
                  @change="selectProjectChange"
                >
                  <template slot="item" slot-scope="{ item }">
                    <i v-if="item.visibility === 2" class="icon m-r-5">&#xe7c0;</i>
                    <span :title="item.name">{{ item.name }}</span>
                  </template>
                </Select>
                <span class="h-input-addon">/</span>
                <input id="urlName" v-model="repo.urlName" type="text" placeholder="repository_url" @blur="checkUrl" />
              </div>
            </Cell>
          </Row>
          <div v-if="projectIdNotSelected" class="field-error">
            Please select a project, or
            <nuxt-link to="/project/new" class="color-color"> click to create a new project </nuxt-link>
          </div>
          <div v-if="urlNotAvailable" class="field-error">Please fill in a repository URL with no special characters</div>

          <div class="m-t-20 m-b-10">
            <label for="desc">
              <b>Repository description</b>
              <span class="optional">(optional)</span>
            </label>
          </div>
          <Row>
            <Cell :xl="22" :md="24">
              <div class="relative">
                <textarea id="desc" v-model="repo.description" rows="4" placeholder="Repository description" class="w-p100" />
              </div>
            </Cell>
          </Row>

          <div class="m-t-25">
            <label><b>Visibility</b></label>
          </div>
          <Row>
            <Cell :xl="22" :md="24">
              <div class="relative">
                <div class="m-t-5">
                  <Radio v-model="repo.visibility" :value="2">
                    <span class="radio-title">Authorized by subversion</span><br />
                    <span class="radio-desc"> Members who have authority can access to the repository by this website or any svn client tools </span>
                  </Radio>
                </div>
                <div class="m-t-10">
                  <Radio v-model="repo.visibility" :value="3">
                    <span class="radio-title">Website only</span><br />
                    <span class="radio-desc">
                      Members who have authority can only visit the repository on the website
                      <a href="http://wiki.svnlike.com/authority#website_only" target="_blank" class="color-color">
                        <i class="h-icon-help-solid"></i>
                      </a>
                    </span>
                  </Radio>
                </div>
                <div class="m-t-10">
                  <Radio v-model="repo.visibility" :value="1">
                    <span class="radio-title">Public</span> <br />
                    <span class="radio-desc"> Everyone on the internet can see this project (readonly) </span>
                  </Radio>
                </div>
              </div>
            </Cell>
          </Row>

          <div class="m-t-30">
            <Checkbox v-model="repo.initWithTrunk">
              <span class="m-l-5">
                <b>Initialize repository with trunk, branches, tags</b>
                <a href="http://wiki.svnlike.com/svn#branch" target="_blank" class="color-color">
                  <i class="h-icon-help-solid"></i>
                </a>
              </span>
            </Checkbox>
          </div>

          <div class="m-t-40">
            <h-button type="submit" size="l" class="x-btn" :loading="isLoading" :disabled="buttonDisabled"> Create repository </h-button>
          </div>
        </form>
      </Cell>
    </Row>
  </div>
</template>

<script>
const urlPattern = /^[a-z0-9_-]+$/
export default {
  data() {
    return {
      errorMessage: null,
      projects: [],
      project: {},
      repo: {
        name: '',
        projectId: '',
        projectUrlName: '',
        urlName: '',
        description: '',
        visibility: 2,
        initWithTrunk: false,
      },
      isLoading: false,
      nameNotAvailable: false,
      urlNotAvailable: false,
      projectIdNotSelected: false,
      projectIdDisabled: false,
    }
  },
  computed: {
    buttonDisabled() {
      return !this.repo.name || !this.repo.projectId || !urlPattern.test(this.repo.urlName)
    },
  },
  created() {
    // set current project
    const currentProject = this.$store.state.project.currentProject
    if (currentProject) {
      this.projects = [currentProject]
      this.project = currentProject
      this.repo.projectId = currentProject.id
      this.projectIdDisabled = true
      this.$store.commit('project/setCurrent', null)
    } else {
      // get projects for select list
      this.getProjectsFromApi()
    }

    // set name focus
    this.$nextTick(() => {
      if (this.$refs.repoName) {
        this.$refs.repoName.focus()
      }
    })
  },
  methods: {
    checkName() {
      this.nameNotAvailable = this.repo.name === ''
    },
    checkUrl() {
      this.urlNotAvailable = !urlPattern.test(this.repo.urlName)
    },
    // when project select change
    selectProjectChange() {
      const pid = this.repo.projectId
      this.projectIdNotSelected = pid == null
      if (pid != null) {
        this.project = this.projects.filter((project) => {
          return project.id === pid
        })[0]

        // // if project is 2:private and repo is 3:public, change to
        // if (this.project.visibility !== 1 && this.repo.visibility === 3) {
        //   this.repo.visibility = 2 // 2: Authorized by subversion
        // }
      }
    },
    // edit url name
    typeUrlName() {
      // if ((this.repo.urlName === '' || this.repo.name.startsWith(this.repo.urlName)) && urlPattern.test(this.repo.name)) {
      //   this.repo.urlName = this.repo.name
      //   this.checkUrl()
      // }
    },
    getProjectsFromApi() {
      this.$axios.$get('project?forSelect=1&orderBy=name').then((data) => {
        this.projects = data
      })
    },
    submitRepository() {
      this.repo.projectId = this.project.id
      this.repo.projectUrlName = this.project.urlName
      this.isLoading = true
      this.$axios
        .$post('repository', this.repo)
        .then((res) => {
          this.$message.success(res.message)
          this.$router.push({
            name: 'projectUrl-repositoryUrl',
            params: {
              projectUrl: this.repo.projectUrlName,
              repositoryUrl: this.repo.urlName,
            },
          })
        })
        .catch((error) => {
          this.errorMessage = error.message
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
}
</script>
