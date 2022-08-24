<template>
  <div class="food-select">
    <el-select
        class="food-select__input"
        placeholder="Please select..."
        value=""
        no-data-text="No food"
        multiple
        :multiple-limit="3"
        :class="{'display': isDisplay}"
        @change="$emit('onchange', $event)"
    >
      <el-option v-for="food of foodList" :value="food" :label="food.name" :key="food.id"/>
    </el-select>
    <div class="food-select__btn iconfont icon-add" :class="{'rotate': isDisplay}" :style="{backgroundColor: color}" @click="isDisplay = !isDisplay"/>
  </div>
</template>

<script>
export default {
  name: "FoodSelect",
  props: {
    foodList: {
      type: Array,
      required: true
    },
    color: String
  },
  data() {
    return {
      isDisplay: false,
      selectedFoodList: []
    }
  }
}
</script>

<style lang="scss">
.food-select {
  position: absolute;
  right: 0;
  bottom: 10px;
  width: 100%;
  padding-right: 10px;

  display: flex;
  justify-content: flex-end;

  .food-select__input {
    position: absolute;
    right: 10px;
    top: 0;
    width: 0;
    height: 100%;
    z-index: 0;
    overflow: hidden;
    transition: all .3s;

    &.display {
      width: calc(100% - 20px);
      border-color: #e4e7ed;
    }

    input {
      border-radius: 20px !important;
    }
  }

  .food-select__btn {
    position: relative;
    z-index: 1;
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
    transition: all .3s;

    color: #fff;
    font-size: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      opacity: .8;
    }

    &.rotate {
      transform: rotate(45deg);
    }
  }
}
</style>