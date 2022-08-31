<template>
  <div class="relations-users">
    <div class="relations-users__item" v-for="(user, index) of users" :key="index" :style="{'--delay': 0.1 * index + 's'}">
      <div class="info">
        <div class="avatar" @click="onCheckUserProfile(user.id)">
          <img :src="user.avatar_url || defaultAvatar" alt="avatar">
        </div>
        <div class="nickname">
          <small>{{ user.username }}</small>
          <span>{{ user.relationship.remark }}</span>
        </div>
      </div>
      <div class="operation">
        <slot :user="user"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Users',
  props: {
    users: Array,
  },
  computed: {
    defaultAvatar() {
      return require('@/assets/images/logo-blue.png')
    },
  },
  methods: {
    onCheckUserProfile(id) {
      this.$router.push({path: '/profile/' + id})
    },
  },
}
</script>

<style lang="scss">

@keyframes fade {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.relations-users {
  background-color: #fff;

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    border-bottom: 1px solid #ecf0f3;
    transition: background-color .3s;
    opacity: 0;
    transform: translateX(50px);
    animation: fade .3s forwards;
    animation-delay: var(--delay);

    &:hover {
      background-color: #f9f9f9;
    }

    .info {
      display: flex;
      align-items: center;

      .avatar {
        width: 65px;
        height: 65px;
        margin-right: 10px;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .nickname {
        small {
          display: block;
          color: #999;
        }
      }

      @media (max-width: 768px) {
        .avatar {
          width: 45px;
          height: 45px;
        }
      }
    }
  }
}
</style>