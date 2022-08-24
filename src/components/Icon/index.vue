<template>
  <div
      class="icon"
      :style="{
        width: size + 'px',
        height: size + 'px',
        cursor: cursor
  }"
      @click="$emit('click')">
    <img
        v-if="local"
        :src="require(`@/assets/images/${name}`)"
        :alt="name"
        style="width: 100%; height: 100%"
    >
    <i v-else :class="name"></i>
  </div>
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: String,
    local: {
      type: Boolean,
      default: true
    },
    size: {
      type: Number,
      default: 18
    },
    cursor: {
      type: String,
      default: 'pointer'
    }
  }
}
</script>