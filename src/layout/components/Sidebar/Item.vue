<template>
  <div :class="{ 'item': true, 'active': isActive }" @click="navigateTo">
    <div class="item-icon">
      <img class="icon" :src="iconPath" :alt="title">
      <span v-if="$store.profile && $store.profile.notification"
            class="badge badge-info">
        {{ $store.profile.notification }}
      </span>
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
    showNotification() {
      return this.data.children[0].meta?.notification && this.$store?.profile?.notification
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

  .badge {
    position: absolute;
    top: -.65rem;
    right: -1rem;
  }
}
</style>