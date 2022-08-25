<template>
  <div :class="['food-button', 'iconfont', `icon-${icon}`, customClass]"
       :style="styleObj">
  </div>
</template>

<script>
export default {
  name: "FoodButton",
  props: {
    icon: String,
    size: {
      type: Number,
      default: 25
    },
    width: {
      type: Number,
      default: 40
    },
    color: String,
    circle: {
      type: Boolean,
      default: true
    },
    customClass: String
  },
  computed: {
    styleObj() {
      return {
        width: this.width + 'px',
        height: this.width + 'px',
        fontSize: this.size + 'px',
        lineHeight: this.width + 'px',
        borderRadius: this.circle && '50%',
        backgroundColor: this.color
      }
    }
  }
}
</script>

<style lang="scss">
.food-button {
  color: #fff;
  text-align: center;
  cursor: pointer;
  transition: opacity .3s;

  &:hover {
    opacity: .8;
  }
}
</style>