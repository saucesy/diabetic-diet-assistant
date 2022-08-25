<template>
  <div class="food-list">
    <template v-for="(food, index) of foodList">
      <food-item :food="food" :key="index">
        <i class="iconfont icon-add" style="transform: rotate(45deg); color: #999; font-size: 24px; cursor:pointer;"
           @click="$emit('click', index)"></i>
      </food-item>
    </template>
  </div>
</template>

<script>
import FoodItem from "@/views/calender/children/FoodItem";

export default {
  name: "FoodList",
  props: {
    foodList: {
      type: Array,
      required: true
    }
  },
  components: {FoodItem}
}
</script>