<template>
  <div>
    <!-- logo -->
    <logo/>

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
  }
};
</script>
