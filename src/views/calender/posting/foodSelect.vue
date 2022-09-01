<template>
  <div class="food-select" ref="foodSelectRef">
    <div class="food-select__inner" @click="isDisplay = !isDisplay">
      <i class="add iconfont icon-add" :class="{'rotate': isDisplay}"></i>
      <span>Click Add Food...</span>
    </div>
    <div class="food-select__content" :class="{'display': isDisplay, 'reach-bottom': isReachBottom}">
      <div class="option" @click="onSaveFood(food)" v-for="food of foodList" :key="food.id">
        <span class="name">{{ food.name }}</span>
        <div class="tag">
          <!-- uses element-ui tag -->
          <el-tag size="small" :style="getColorByGi(food.gi)">gi:{{ food.gi }}</el-tag>
          <el-tag size="small">carbs:{{ food.carbohydrate }}g</el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calenderPostingFoodSelect',
  props: {
    foodList: Array,
  },
  data() {
    return {
      isDisplay: false,
      isReachBottom: false,
    }
  },
  methods: {
    getColorByGi(gi) {
      if (gi <= 55) {
        return {color: '#F1F5FF', backgroundColor: '#4F80E4'}
      } else if (gi > 55 && gi <= 75) {
        return {color: '#FFF1D1', backgroundColor: '#FFC107'}
      } else {
        return {color: '#FEF4F2', backgroundColor: '#F8A292'}
      }
    },
    onSaveFood(food) {
      this.isDisplay = false
      this.$emit('change', food)
      this.isReachBottom = Math.abs(this.$refs.foodSelectRef.getBoundingClientRect().bottom - document.body.clientHeight) <= 200
    },
  },
}
</script>

<style lang="scss">
.food-select {
  position: relative;
  width: 100%;

  &__inner {
    position: relative;
    z-index: 10;
    height: 45px;
    line-height: 43px;
    padding: 0 10px;
    border-radius: 20px;
    border: 3px dashed #eee;
    cursor: pointer;
    color: #999;
    background-color: #fff;
    transition: all .3s;

    &:hover {
      border-color: #ddd;
    }

    .add {
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-right: 10px;
      text-align: center;
      line-height: 30px;
      font-size: 20px;
      border-radius: 50%;
      background-color: #eee;
      transition: all .3s;

      &.rotate {
        transform: rotate(45deg);
      }
    }
  }

  &__content {
    position: absolute;
    z-index: 9;
    top: 40px;
    left: 5px;
    right: 5px;
    height: 0;
    overflow: auto;
    background-color: #fff;
    transition: height .3s;
    box-shadow: 0 0 10px rgba(0, 0, 0, .15);

    &.display {
      height: 240px;
    }

    &.reach-bottom {
      top: 20px;
      transform: translateY(-100%);

      .option {
        &:first-child {
          padding: 10px;
        }

        &:last-child {
          padding-bottom: 30px;
        }
      }
    }

    &::-webkit-scrollbar {
      display: none;
    }

    .option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      cursor: pointer;
      border-bottom: 1px solid #eee;

      color: #555;
      font-size: 14px;
      transition: background-color .3s;

      &:hover {
        background-color: #f3f1f1;
      }

      &:first-child {
        padding-top: 20px;
      }

      .el-tag {
        margin-right: 10px;
      }
    }
  }
}
</style>