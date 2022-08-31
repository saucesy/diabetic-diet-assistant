<template>
  <div :class="{ 'item': true, 'active': isActive }" @click="navigateTo">
    <div class="item-icon">
      <img class="icon" :src="iconPath" :alt="title">
      <span v-if="showNotification" class="notification"></span>
    </div>
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    data: Object
  },
  computed: {
    title() {
      return this.data.children[0].meta.title
    },
    icon() {
      return this.data.children[0].meta.icon
    },
    path() {
      return this.data.path
    },
    isActive() {
      return this.$route.path === this.path
    },
    iconPath() {
      return require(`@/assets/images/${this.icon}${this.isActive ? '-active' : ''}.png`)
    },
    // is show notification
    showNotification() {
      return this.data.children[0].meta?.notification && this.$store.getters.profile?.notification
    }
  },
  methods: {
    navigateTo() {
      if (this.$route.path !== this.path) {
        this.$router.push(this.path)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item-icon {
  position: relative;

  .notification {
    position: absolute;
    top: -.15rem;
    right: -.5rem;
    display: inline-block;
    background-color: #ff937b;
    width: 6px;
    height: 6px;
    border-radius: 6px;
  }
}
</style>