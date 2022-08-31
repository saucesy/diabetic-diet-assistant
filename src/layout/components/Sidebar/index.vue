<template>
  <div>
    <!-- uses element-ui dropdown -->
    <el-dropdown class="sidebar-logo-container-outer"
                 :trigger="$store.getters.device === 'mobile' ? 'click' : 'hover'">
      <logo/>

      <el-dropdown-menu slot="dropdown">
        <!-- login -->
        <template v-if="$store.getters.profile">
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

    <div class="menu">
      <div v-if="$store.getters.device === 'mobile'" @click="$emit('toggle')" class="toggle">
        <img src="~@/assets/images/menu.png" alt="menu">
      </div>
      <div class="menu-items">
        <template v-for="(route, index) of routes">
          <item :key="index" :data="route"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Item from './Item.vue';
import Logo from './Logo.vue';
import {logout} from '@/api/user';
import {removeToken} from '@/utils/auth';

export default {
  name: 'Sidebar',
  components: {
    Item,
    Logo
  },
  computed: {
    routes() {
      return this.$router.options.routes.filter(r => !r['hidden']);
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
