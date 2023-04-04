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
              {{ $t('functions.profile') }}
            </el-dropdown-item>
            <el-dropdown-item class="clearfix" @click.native="logout">
              {{ $t('functions.logout') }}
            </el-dropdown-item>
          </template>

          <!-- not login -->
          <template v-else>
            <el-dropdown-item class="clearfix" @click.native="toLogin(0)">
              {{ $t('functions.login') }}
            </el-dropdown-item>
            <el-dropdown-item class="clearfix" @click.native="toLogin(1)">
              {{ $t('functions.create') }}
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
        <!-- <icon v-if="isLogin" class="icon" name="logout.svg" :size="20" @click="logout"/> -->
        <span v-if="isLogin" class="sign" @click="logout">{{ $t('functions.logout') }}</span>
        <!-- <icon v-else class="icon" name="login.svg" :size="20" @click="toLogin"/> -->
        <template v-else>
          <span class="sign" @click="toLogin(0)">{{ $t('functions.login') }}</span>
          <span class="sign" @click="toLogin(1)">{{ $t('functions.create') }}</span>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import {logout} from '@/api/user';
import {removeToken} from '@/utils/auth';
import Icon from '@/components/Icon';
import {i18n} from "@/i18n";

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
      return this.$store.getters?.profile?.username ?? 'Guest';
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
    toLogin(tab) {
      this.$router.push('/login/' + tab);
    },

    /**
     * logout
     */
    logout() {
      logout();
      removeToken();
      // uses element-ui message
      this.$message.success(i18n.t('message.logoutSuccess'));
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
    object-fit: cover;
  }

  .username {
    color: white;
    word-break: break-all;
    padding: .5rem 1rem;
    user-select: none;
    cursor: default;

    .name {
      text-align: center;
      display: block;
      font-size: 15px;
      margin: 0 auto;
    }

    .sign {
      text-align: center;
      display: inline-block;
      font-size: 12px;
      margin: 6px auto 4px;
      user-select: none;
      padding: 2px 6px;
      cursor: pointer;
      border: 1px solid white;
      border-radius: 6px;
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