<template>
  <div class="food-item" :class="{'mid': isMidGI(gi), 'high': isHighGi(gi)}">
    <div class="food-item__image">
      <img :src="food.food_data.image" :alt="food.food_data.name">
    </div>
    <div class="food-item__name">
      {{ food.food_data.name }}
    </div>
    <div class="food-item__value">
      <span>
        {{ (food.food_data['carbohydrate'] * food.amount) | toFixed }}
      </span>
      &nbsp;•&nbsp;
      <span> {{ food.food_data['gi'] }} </span>
      <el-popover
          placement="top"
          trigger="hover"
          @hide="$emit('onpopover')"
      >
        <p>
          gi: {{ food.food_data['gi'] }} <br>
          carbohydrate: {{ food.food_data['carbohydrate'] }}/1
        </p>
        <div>
          <el-input placeholder="Enter amount" size="mini" maxlength="8" v-model="food.amount" @blur="$emit('onchange')">
            <template slot="append">{{ food.food_data.unit }}</template>
          </el-input>
        </div>
        <span slot="reference" class="iconfont icon-youcecaidan food-item__menu"/>
      </el-popover>
    </div>
  </div>
</template>

<script>
let timer = null
export default {
  name: "FoodItem",
  props: {
    food: {
      type: Object,
      required: true
    }
  },
  filters: {
    toFixed(num) {
      return Number(num).toFixed(2)
    }
  },
  computed: {
    gi() {
      return this.food.food_data['gi']
    }
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

<style lang="scss">

// variable
$low-gi-bg: #F1F5FF;
$low-gi-font: #4F80E4;
$mid-gi-bg: #FFF1D1;
$mid-gi-font: #FFC107;
$high-gi-bg: #FEF4F2;
$high-gi-font: #F8A292;

.food-item {
  height: 45px;
  padding: 0 20px;
  margin-bottom: 20px;
  line-height: 45px;
  border-radius: 20px;
  animation: fade .3s forwards;
  color: $low-gi-font;
  background-color: $low-gi-bg;

  &.high {
    color: $high-gi-font;
    background-color: $high-gi-bg;

    .food-item__image {
      background-color: $high-gi-font;
    }
  }

  &.mid {
    color: $mid-gi-font;
    background-color: $mid-gi-bg;

    .food-item__image {
      background-color: $mid-gi-font;
    }
  }

  .food-item__image,
  .food-item__name {
    float: left;
  }

  .food-item__image {
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

  .food-item__name {
    padding-left: 10px;
  }

  .food-item__value {
    display: flex;
    align-items: center;
    float: right;

    .food-item__menu {
      margin-left: 10px;
      font-size: 18px;
      cursor: pointer;
    }
  }
}
</style>