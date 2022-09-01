<template>
  <div class="sidebar-logo-container">
    <!-- mobile -->
    <template v-if="isMobile">
      <!-- uses element-ui dropdown -->
      <el-dropdown class="sidebar-logo-container-outer" trigger="click">
        <img class="logo" :src="logo" alt="logo" :style="style"/>

        <el-dropdown-menu slot="dropdown">
          <!-- login -->
          <template v-if="isLogin">
            <el-dropdown-item class="clearfix" disabled>
              {{ username }}
            </el-dropdown-item>
            <el-dropdown-item class="clearfix" @click.native="toProfile">
              Profile
            </el-dropdown-item>
            <el-dropdown-item class="clearfix" @click.native="logout">
              Logout
            </el-dropdown-item>
          </template>

          <!-- not login -->
          <template v-else>
            <el-dropdown-item class="clearfix" @click.native="toLogin">
              Login
            </el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </template>

    <!-- desktop -->
    <template v-else>
      <img class="logo" :src="logo" alt="logo" :style="style" @click="toProfile"/>

      <div class="username">
        <!-- username -->
        <span class="name">{{ username }}</span>

        <!-- logout -->
        <icon v-if="isLogin" class="icon" name="logout.svg" @click="logout"/>
      </div>
    </template>
  </div>
</template>

<script>
import {logout} from '@/api/user';
import {removeToken} from '@/utils/auth';
import Icon from '@/components/Icon';

export default {
  name: 'Logo',
  components: {
    Icon
  },
  data() {
    return {};
  },
  computed: {
    /**
     * logo style
     *
     * @returns {{}|{transform: string}}
     */
    style() {
      if (!this.$store.getters?.profile?.avatar_url) return {
        'transform': 'rotate(-45deg)'
      };
      return {};
    },
    /**
     * logo
     *
     * @returns {*}
     */
    logo() {
      return this.$store.getters?.profile?.avatar_url ?? require('@/assets/images/logo.png');
    },
    /**
     * username
     *
     * @returns {*|string}
     */
    username() {
      return this.$store.getters?.profile?.username ?? 'guest';
    },
    /**
     * isMobile
     *
     * @returns {boolean}
     */
    isMobile() {
      return this.$store.getters.device === 'mobile';
    },
    /**
     * isLogin
     *
     * @returns {boolean}
     */
    isLogin() {
      return !!this.$store.getters.token;
    }
  },
  methods: {
    /**
     * to profile
     */
    toProfile() {
      if (this.$route.path !== '/profile') {
        this.$router.push('/profile');
      }
    },

    /**
     * to login
     */
    toLogin() {
      this.$router.push('/login');
    },

    /**
     * logout
     */
    logout() {
      logout();
      removeToken();
      // uses element-ui message
      this.$message.success('Logout success');
      setTimeout(() => location.reload(), 2000);
    }
  }
};
</script>

<style lang="scss">
.sidebar-logo-container {
  position: relative;
  padding: 10px 0;
  text-align: center;

  .logo {
    display: inline-block;
    width: 40px;
    height: 40px;
    //transform: rotate(-45deg);
    cursor: pointer;
    border-radius: 40px;
  }

  .username {
    color: white;
    word-break: break-all;
    padding: .5rem 1rem;
    user-select: none;
    cursor: default;

    .name {
      display: block;
      font-size: 15px;
      margin: 0 auto;
    }

    .icon {
      display: block;
      margin: .5rem auto 0;
      vertical-align: middle;
    }
  }

  //&::before {
  //  position: absolute;
  //  content: '';
  //  bottom: 0;
  //  left: 50%;
  //  width: 70%;
  //  height: 2px;
  //  background-color: #6485e3;
  //  transform: translateX(-50%);
  //}
}
</style>