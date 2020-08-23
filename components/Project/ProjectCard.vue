<template>
  <div v-if="project" class="card">
    <div class="avatar">
      <nuxt-link :to="'/project/' + project.urlName" class="color-color">
        <el-image :src="project.avatar || ''" fit="contain" style="width: 74px; height: 74px;">
          <div
            slot="error"
            class="no-avatar color-color"
            :class="{ two: project.avatarWord && project.avatarWord.length > 1 }"
            :style="{ color: project.avatarColor ? project.avatarColor + ' !important' : '' }"
          >
            {{ project.avatarWord || project.name.substr(0, 1).toUpperCase() }}
          </div>
        </el-image>
      </nuxt-link>
    </div>
    <div class="content">
      <h2>
        <nuxt-link :to="'/project/' + project.urlName" class="color-hover">{{ project.name }}</nuxt-link>
      </h2>
      <div class="desc">{{ project.description }}</div>
    </div>
    <div class="like">
      <i class="icon icon-like" :class="{ liked: likedInner }" @click="likeProject(project.id)">&#xe9a4;</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true,
      default() {
        return {
          id: '',
          name: '',
          urlName: '',
          description: '',
          avatar: '',
          avatarWord: '',
          avatarColor: '',
        }
      },
    },
    liked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      likedInner: false,
    }
  },
  created() {
    this.likedInner = this.liked
  },
  methods: {
    // like or unlike a project
    likeProject(pid) {
      const url = 'project/' + pid + (this.likedInner ? '/unlike' : '/like')
      this.$axios
        .$post(url)
        .then((res) => {
          this.$message.success(res.message)
          this.likedInner = !this.likedInner
          this.$emit('refreshLiked', {
            pid,
            isLike: this.likedInner,
          })
        })
        .catch((error) => {
          this.$message.error(error.data.message)
        })
    },
  },
}
</script>

<style scoped lang="less">
.card {
  background: #f8f8f8;
  padding: 12px;
  //margin-bottom: 30px;
  position: relative;
  min-height: 112px;

  &:hover {
    background: #f5f5f5;
    //box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }

  .avatar {
    position: absolute;
    width: 80px;
    height: 80px;
    border: 3px solid #fff;
    text-align: center;
  }

  .content {
    margin-left: 100px;
    margin-right: 20px;

    h2 {
      margin-top: -2px;
    }

    .desc {
      margin-top: 15px;
    }
  }

  .like {
    position: absolute;
    top: 4px;
    right: 8px;

    .icon-like {
      color: #e3e3e3;
      font-size: 18px;
      cursor: pointer;

      &.liked {
        color: #ff5257;
      }

      &:hover {
        color: #ff5257;
      }
    }
  }
}
</style>
