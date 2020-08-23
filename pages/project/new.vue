<template>
  <div>
    <el-row :gutter="50">
      <el-col :lg="7" class="m-b-20">
        <h2>Create a new project</h2>
        <p>
          <nuxt-link to="/project" class="color-color">
            Projects
          </nuxt-link>
          allow you to manage and collaborate across multiple repositories. Members of a project have access to all of
          all of its repositories.
        </p>
        <p>
          Repositories that belong to a project are prefixed with the project namespace.
        </p>
      </el-col>
      <el-col :lg="17">
        <form @submit.prevent="submitProject">
          <el-row>
            <el-col :lg="24">
              <div class="m-t-5 m-b-10"><label class="label">Project name</label></div>
            </el-col>
            <el-col :lg="14">
              <el-input
                v-model.trim="project.name"
                placeholder="Project Name"
                autofocus
                @blur="checkName"
                @input="typeUrlName"
              />
              <!-- <a-input v-model.trim="project.name" placeholder="Project Name" @blur="checkName" @change="typeUrlName" />-->
            </el-col>
            <el-col :lg="24">
              <div v-if="projectNameIsNotAvailable" class="color-danger field-error">
                Please fill in a descriptive name for your project.
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :lg="24">
              <div class="m-b-10" style="margin-top: 22px;"><label class="label">Project URL</label></div>
            </el-col>
            <el-col :lg="14">
              <el-input v-model="project.urlName" placeholder="project_url" @blur="checkUrl">
                <template slot="prepend">http://svn.svnlike.com/</template>
              </el-input>
            </el-col>
            <el-col :lg="24">
              <div v-if="projectUrlIsNotAvailable" class="color-danger field-error">
                Please choose a project URL with no special characters.
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :lg="24">
              <div class="m-t-20 m-b-10">
                <label class="label"> Project description <span class="optional">(optional)</span> </label>
              </div>
            </el-col>
            <el-col :lg="22">
              <el-input v-model="project.description" type="textarea" :rows="8" placeholder="Project Description">
              </el-input>
              <!--              <a-textarea v-model.trim="project.description" :rows="8" allow-clear placeholder="Project Description" />-->
            </el-col>
          </el-row>

          <div class="m-t-40">
            <el-button
              class="x-btn"
              native-type="submit"
              type="primary"
              :loading="isLoading"
              :disabled="checkButtonDisabled"
            >
              Create project
            </el-button>
          </div>
        </form>
      </el-col>
    </el-row>
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
        this.checkUrl()
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
        .then((res) => {
          this.$message.success(res.message)
          this.$router.push({ name: 'project-urlName', params: { urlName: this.project.urlName } })
        })
        .catch((error) => {
          console.log(error)
          this.$flash.error(error.message)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
}
</script>

<style scoped lang="less">
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
</style>
