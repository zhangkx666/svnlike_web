<template>
  <div v-if="repo" class="card">
    <div class="avatar">
      <nuxt-link :to="repo.urlName">
        <div v-if="repo.avatar" class="avatar-inner" :style="{ backgroundImage: 'url(' + repo.avatar + ')' }" />
        <div v-else class="no-avatar color-color" :class="{ two: repo.avatarWord && repo.avatarWord.length > 1 }" :style="{ color: repo.avatarColor }">
          {{ repo.avatarWord || repo.name.substr(0, 1).toUpperCase() }}
        </div>
      </nuxt-link>
    </div>
    <div class="content">
      <h4>
        <nuxt-link :to="repo.urlName" class="color-hover">{{ repo.name }}</nuxt-link>
        <i v-if="repo.visibility === 2" class="icon icon-16px" title="private">&#xe7c0;</i>
      </h4>
      <p class="desc">{{ repo.description }}</p>
    </div>
    <div class="like">
      <i class="icon icon-like" :class="{ liked: likedInner }" @click="likeRepo(repo.id)">&#xe9a4;</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RepositoryCard',
  props: {
    repo: {
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
          visibility: 0,
        }
      },
    },
  },
}
</script>

<style scoped lang="less">
.card {
  //background: #f8f8f8;
  padding: 12px 12px 15px 5px;
  //margin-bottom: 30px;
  position: relative;
  //min-height: 112px;
  border-bottom: 1px solid #e5e5e5;

  &:hover {
    background: #f8f8f8;
    //box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  }

  .avatar {
    position: absolute;
    width: 48px;
    height: 48px;
    border: 3px solid #e5e5e5;
    border-radius: 3px;
    text-align: center;
    overflow: hidden;

    .avatar-inner {
      width: 40px;
      height: 40px;
      background-size: cover;
      background-clip: padding-box;
    }

    .no-avatar {
      font-size: 36px;
    }
  }

  .content {
    margin-left: 60px;
    margin-right: 20px;

    h4 {
      margin-top: -6px;
    }

    .desc {
      margin-top: 8px;
      white-space: pre-wrap;
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
