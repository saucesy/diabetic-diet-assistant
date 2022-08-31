<template>
  <div class="food-item" :class="{'mid': isMidGI(food.gi), 'high': isHighGi(food.gi)}">
    <div class="food-item__label">
      <div class="food-item__image">
        <img :src="food.image" :alt="food.name">
      </div>
      <div class="food-item__name">
        {{ food.name }}
      </div>
    </div>
    <div class="food-item__value">
      <slot :food="food"></slot>
    </div>
  </div>
</template>

<script>
import Food from '@/model/food'

export default {
  name: "FoodItem",
  props: {
    food: Food
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
    transform: translateX(0);
  }
}
</style>

<style lang="scss">
@import "~@/assets/styles/variable.scss";

$height: 45px;

.food-item {
  display: flex;
  height: $height;
  line-height: $height;

  padding: 0 20px;
  margin-bottom: 20px;
  border-radius: 20px;

  color: $low-gi-font;
  background-color: $low-gi-bg;

  opacity: 0;
  transform: translateX(50px);
  animation: fade .3s forwards;

  &.high {
    color: $high-gi-font;
    background-color: $high-gi-bg;
  }

  &.high &__image {
    background-color: $high-gi-font;
  }

  &.mid {
    color: $mid-gi-font;
    background-color: $mid-gi-bg;
  }

  &.mid &__image {
    background-color: $mid-gi-font;
  }

  &__label {
    flex: 1;
    display: flex;
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

    img {
      width: 90%;
      margin: auto;
    }
  }

  &__name {
    flex: 1;
    margin: 0 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__value {
    display: flex;
    align-items: center;
  }
}
</style>