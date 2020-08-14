<template>
  <div class="main">
    <a-row>
      <a-col :lg="6" :offset="1" class="m-b-30">
        <h2>Create a new project</h2>
        <p>
          Projects allow you to manage and collaborate across multiple repositories. Members of a project have access to
          all of its repositories.
        </p>
        <p>
          Repositories that belong to a project are prefixed with the project namespace.
        </p>
      </a-col>
      <a-col :lg="15" :offset="1">
        <form @submit.prevent="submitProject">
          <a-row>
            <a-col :lg="24">
              <div class="m-t-5 m-b-10"><label class="label">Project name</label></div>
            </a-col>
            <a-col :lg="14">
              <a-input v-model.trim="project.name" placeholder="Project Name" @blur="checkName" @change="typeUrlName" />
            </a-col>
            <a-col :lg="24">
              <div v-if="projectNameIsNotAvailable" class="color-danger field-error">
                Please fill in a descriptive name for your project.
              </div>
            </a-col>
          </a-row>

          <a-row>
            <a-col :lg="24">
              <div class="m-t-30 m-b-10"><label class="label">Project URL</label></div>
            </a-col>
            <a-col :lg="14">
              <a-input
                v-model.trim="project.urlName"
                addon-before="http://svn.svnlike.com/"
                placeholder="project_url"
                @blur="checkUrl"
              />
            </a-col>
            <a-col :lg="24">
              <div v-if="projectUrlIsNotAvailable" class="color-danger field-error">
                Please choose a project URL with no special characters.
              </div>
            </a-col>
          </a-row>

          <a-row>
            <a-col :lg="24">
              <div class="m-t-30 m-b-10">
                <label class="label"> Project description <span class="optional">(optional)</span> </label>
              </div>
            </a-col>
            <a-col :lg="22">
              <a-textarea v-model.trim="project.description" :rows="8" allow-clear placeholder="Project Description" />
            </a-col>
          </a-row>

          <div class="m-t-40">
            <a-button type="primary" html-type="submit" :loading="isLoading" :disabled="checkButtonDisabled">
              Create project
            </a-button>
          </div>
        </form>
      </a-col>
    </a-row>
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
      },
      isLoading: false,
      projectNameIsNotAvailable: false,
      projectUrlIsNotAvailable: false,
    }
  },
  computed: {
    checkButtonDisabled() {
      return this.project.name === '' || !/^[a-z0-9_]+$/.test(this.project.urlName)
    },
  },
  methods: {
    checkName() {
      this.projectNameIsNotAvailable = this.project.name === ''
    },
    checkUrl() {
      this.projectUrlIsNotAvailable = !/^[a-z0-9_]+$/.test(this.project.urlName)
    },
    typeUrlName() {
      if (
        (this.project.urlName === '' || this.project.name.startsWith(this.project.urlName)) &&
        /^[a-z0-9]+$/.test(this.project.name)
      ) {
        this.project.urlName = this.project.name
      }
    },
    submitProject() {
      this.isLoading = true
      this.$axios
        .$post('project', {
          name: this.project.name,
          urlName: this.project.urlName,
          description: this.project.description.replace(/[\r\n]/g, '\\n'),
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
}
</script>

<style scoped lang="less">
.main {
  margin-top: 30px;
  margin-right: 4.17%;

  h2 {
    font-size: 22px;
  }

  p {
    color: #303030;
  }

  .label {
    font-weight: bold;
  }

  .field-error {
    margin-top: 2px;
  }

  .optional {
    //font-size: 12px;
    color: #717171;
    font-weight: normal;
  }
}
</style>
