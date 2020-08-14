<template>
  <div class="m-l-15 m-t-30">
    <div>
      <div class="title"><label for="repository_name">仓库名：</label></div>
      <div>svn://marssvn.com/<input id="repository_name" v-model="name" class="input" autofocus /></div>
    </div>
    <div class="m-t-10">
      <div class="title"><label for="repository_description">仓库描述：</label></div>
      <div class="m-t-5">
        <textarea id="repository_description" v-model="description" class="textarea textarea-100"></textarea>
      </div>
    </div>
    <div class="m-t-10">
      <input id="repository_autoMakeDir" v-model="autoMakeDir" type="checkbox" />
      <label for="repository_autoMakeDir">自动创建trunk、branches、tags目录</label>
    </div>

    <div class="m-t-30">
      <button class="btn btn-white btn-primary btn-lg" @click="createRepository">创建仓库</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RepositoryForm',
  data() {
    return {
      name: '',
      description: '',
      autoMakeDir: false,
    }
  },
  methods: {
    createRepository() {
      const data = {
        projectId: 1,
        title: 'no title',
        name: this.name,
        description: this.description,
        autoMakeDir: this.autoMakeDir,
      }
      this.$ajax.post('/repository', data).then((res) => {
        this.$router.replace('/svn/repository/' + res.data.id)
      })
    },
  },
}
</script>

<style scoped lang="less">
.textarea-100 {
  width: 600px;
  height: 100px;
}

.title {
  font-weight: bold;
}
</style>
