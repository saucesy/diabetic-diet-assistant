<template>
  <div class="food-item" :class="{'mid': isMidGI(gi), 'high': isHighGi(gi)}">
    <div class="food-item__image">
      <img :src="food.image" :alt="food.name">
    </div>
    <div class="food-item__name">
      {{ food.name }}
    </div>
    <div class="food-item__value">
      <slot :food="food"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "FoodItem",
  props: {
    food: {
      type: Object,
      required: true
    }
  },
  computed: {
    gi() {
      return this.food.food_data ? this.food.food_data.gi : this.food.gi
    },
  },
  methods: {
    isMidGI(gi) {
      return gi > 55 && gi <= 75
    },
    isHighGi(gi) {
      return gi > 75
    },
  }
}
</script>

<style>
@keyframes fade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<style lang="scss">
@import "~@/assets/styles/variable.scss";

.food-item {
  height: 45px;
  padding: 0 20px;
  margin-bottom: 20px;
  line-height: 45px;
  border-radius: 20px;
  opacity: 0;
  transform: translateY(30px);
  animation: fade .3s forwards;
  color: $low-gi-font;
  background-color: $low-gi-bg;

  &.high {
    color: $high-gi-font;
    background-color: $high-gi-bg;
  }

  &.high > &__image {
    background-color: $high-gi-font;
  }

  &.mid {
    color: $mid-gi-font;
    background-color: $mid-gi-bg;
  }

  &.mid > &__image {
    background-color: $mid-gi-font;
  }

  &__image,
  &__name {
    float: left;
  }

  &__image {
    width: 30px;
    height: 30px;
    padding: 6px;
    margin-top: 8px;
    border-radius: 50%;
    background-color: $low-gi-font;

    display: flex;

    img {
      width: 90%;
      margin: auto;
    }
  }

  &__name {
    margin: 0 10px;
  }

  &__value {
    display: flex;
    align-items: center;
    float: right;

    .carbs {
      margin-right: 10px;
    }
  }

  &__menu {
    margin-left: 10px;
    font-size: 18px;
    cursor: pointer;
  }

  &__input {
    width: 150px;
  }
}
</style>