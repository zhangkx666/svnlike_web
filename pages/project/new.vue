<template>
  <div>
    <Row :space-x="50">
      <Cell :xl="7" :md="24" class="m-b-20">
        <h2>Create a new project</h2>
        <p>
          <nuxt-link to="/project" class="color-color">
            Projects
          </nuxt-link>
          allow you to manage and collaborate across multiple repositories. You can manage code, document, or other
          things in one project.
        </p>
        <p>
          You can manage the relationship of repositories and members more easily by combining them in one project.
        </p>
        <p>
          Repositories that belong to a project are prefixed with the project namespace.
        </p>
      </Cell>

      <Cell :xl="17" :md="24">
        <form @submit.prevent="submitProject">
          <div class="m-t-5 m-b-10">
            <label for="name"><b>Project name</b></label>
          </div>
          <Row>
            <Cell :xl="14" :md="14" :sm="18" :xs="24">
              <input
                id="name"
                v-model="project.name"
                type="text"
                placeholder="Project name"
                class="w-p100"
                autocomplete="off"
                autofocus
                @blur="checkName"
                @input="typeUrlName"
              />
            </Cell>
          </Row>
          <div v-if="nameNotAvailable" class="field-error">
            Please fill in a descriptive name for your project
          </div>

          <div class="m-t-20 m-b-10">
            <label for="urlName"><b>Project URL</b></label>
          </div>
          <Row>
            <Cell :xl="14" :md="14" :sm="18" :xs="24">
              <div class="h-input-group">
                <span class="h-input-addon">http://demo.svnlike.com/</span>
                <input
                  id="urlName"
                  v-model="project.urlName"
                  type="text"
                  placeholder="project_url"
                  autocomplete="off"
                  class="w-p100"
                  @blur="checkUrl"
                />
              </div>
            </Cell>
          </Row>
          <div v-if="urlNotAvailable" class="field-error">
            Please fill in a project URL with no special characters
          </div>

          <div class="m-t-20 m-b-10">
            <label for="desc">
              <b>Project description</b>
              <span class="optional">(optional)</span>
            </label>
          </div>
          <Row>
            <Cell :xl="22" :md="24">
              <div class="relative">
                <textarea
                  id="desc"
                  v-model="project.description"
                  rows="4"
                  placeholder="Project description"
                  class="w-p100"
                />
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
                  <Radio v-model="project.visibility" value="2">
                    <span class="radio-title">Private</span> <br />
                    <span class="radio-desc">
                      Only Members can see this project
                    </span>
                  </Radio>
                </div>
                <div class="m-t-10">
                  <Radio v-model="project.visibility" value="1">
                    <span class="radio-title">Public</span> <br />
                    <span class="radio-desc">
                      Everyone on the internet can see this project
                    </span>
                  </Radio>
                </div>
              </div>
            </Cell>
          </Row>

          <div class="m-t-40">
            <h-button type="submit" size="l" class="x-btn" :loading="isLoading" :disabled="buttonDisabled">
              Create project
            </h-button>
          </div>
        </form>
      </Cell>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      project: {
        name: '',
        urlName: '',
        icon: '',
        description: '',
        visibility: 2,
      },
      isLoading: false,
      nameNotAvailable: false,
      urlNotAvailable: false,
    }
  },
  computed: {
    buttonDisabled() {
      return this.project.name === '' || !/^[a-z0-9_]+$/.test(this.project.urlName)
    },
  },
  methods: {
    checkName() {
      this.nameNotAvailable = this.project.name === ''
    },
    checkUrl() {
      this.urlNotAvailable = !/^[a-z0-9_]+$/.test(this.project.urlName)
    },
    typeUrlName() {
      if (
        (this.project.urlName === '' || this.project.name.startsWith(this.project.urlName)) &&
        /^[a-z0-9]+$/.test(this.project.name)
      ) {
        this.project.urlName = this.project.name
        this.checkUrl()
      }
    },
    submitProject() {
      this.isLoading = true
      this.$axios
        .$post('project', this.project)
        .then((res) => {
          this.$message.success(res.message)
          this.$router.push({
            name: 'project',
            params: { project: this.project.urlName },
          })
        })
        .catch((error) => {
          this.$flash.error(error.message)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
}
</script>
