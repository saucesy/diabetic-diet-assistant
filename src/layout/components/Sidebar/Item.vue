<template>
  <div :class="{ 'item': true, 'active': isActive }" @click="navigateTo">
    <img :src="iconPath" :alt="title">
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