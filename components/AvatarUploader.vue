<template>
  <div class="h-uploader h-uploader-image-container relative">
    <div v-if="imgSrc" class="h-uploader-image" @click="clickFileInput">
      <div class="h-uploader-image-background" :style="{ backgroundImage: 'url(' + imgSrc + ')' }"></div>
      <div class="h-uploader-image-operate h-uploader-browse-button">
        <div>Upload</div>
      </div>
    </div>

    <div v-else class="h-uploader-image-empty h-uploader-browse-button" @click="clickFileInput">
      <i class="h-icon-plus"></i>
    </div>

    <div class="h-uploader-image-operate h-uploader-browse-button"><div>Upload</div></div>
    <input ref="avatarFile" type="file" accept=".gif,.jpg,.png" style="display: none" @change="uploadAvatar($event)" />
  </div>
</template>

<script>
export default {
  name: 'AvatarUploader',
  props: {
    avatarType: {
      type: String,
      default: 'user', // user, project, repository, team
    },
    dataId: {
      type: Number,
      required: true,
    },
    avatarSrc: {
      type: String,
      default: null,
    },
    maxSizeM: {
      type: Number,
      default: 5, // 5M
    },
  },
  data() {
    return {
      imgSrc: null,
    }
  },
  mounted() {
    this.imgSrc = this.avatarSrc
  },
  methods: {
    clickFileInput() {
      this.$refs.avatarFile.click()
    },
    uploadAvatar(e) {
      if (e.target.files.length > 0) {
        const avatarFile = e.target.files[0]

        if (avatarFile.size / 1048576 > this.maxSizeM) {
          this.$message.error('Avatar file should be within' + this.maxSizeM + ' mb')
          return
        }

        if (avatarFile.type !== 'image/png' && avatarFile.type !== 'image/gif' && avatarFile.type !== 'image/jpeg') {
          this.$message.error('Avatar file should be jpg,png,gif')
          return
        }

        const formData = new FormData()
        formData.append('type', this.avatarType)
        formData.append('dataId', this.dataId.toString())
        formData.append('avatarFile', avatarFile)

        this.$axios
          .$post('upload/avatar', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((url) => {
            this.imgSrc = url + '?' + this._.now()
            this.$emit('refreshAvatar', {
              avatar: this.imgSrc,
            })
          })
      }
    },
  },
}
</script>

<style scoped lang="less">
.h-uploader-image-container {
  display: block;
}
</style>
