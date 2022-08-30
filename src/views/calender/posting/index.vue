<template>
  <div class="calender-posting" :class="{'shade': isPost}" @click.self="isPost = false">
    <calender-posting-card :time="meal.time" :title="meal.name">
      <template slot="default">
        <template v-for="(food, index) of meal.food">
          <calender-posting-food-item :food="food" :key="index">
            <div class="operation" style="cursor:pointer;">
              <el-popover
                  width="200"
                  trigger="hover"
                  placement="top-start">
                <div slot="default">
                  <el-input v-model="food.amount" size="mini">
                    <template slot="append">
                      <span>{{ food.unit }}</span>
                    </template>
                  </el-input>
                </div>
                <el-link :underline="false" slot="reference" style="margin-right: 20px">
                  {{ food.amount || food.default_amount }}{{ food.unit }}
                </el-link>
              </el-popover>
              <i class="el-icon-close" @click="onRemoveFoodFromSelectedFoodList"/>
            </div>
          </calender-posting-food-item>
        </template>
        <calender-posting-food-select :food-list="foodList" @change="onFoodSelectChange"/>
      </template>
      <template slot="footer">
        <div style="display: flex; align-items: center; justify-content: space-between">
          <span>{{ meal.carbohydrate }} <i style="color: #999"> carbs </i></span>
          <el-button
              icon="el-icon-s-promotion"
              size="medium"
              style="font-size: 20px"
              type="primary"
              :circle="true"
              @click="isPost = true"
          />
        </div>
      </template>
    </calender-posting-card>

    <div class="confirm-info" :class="{'post': isPost}">
      <div class="header">
        <span>confirm info</span>
        <i class="el-icon-close" @click="isPost = false"/>
      </div>
      <div class="confirm-info__item time">
        <span>time</span>
        <el-input size="medium" v-model="meal.time"></el-input>
      </div>
      <div class="confirm-info__item name">
        <span>name</span>
        <el-input size="medium" v-model="meal.name"></el-input>
      </div>
      <div class="confirm-info__btn">
        <el-button size="small" type="default" @click="isPost = false">cancel</el-button>
        <el-button size="small" type="danger" plain @click="onPosting">confirm</el-button>
      </div>
    </div>
  </div>
</template>

<script>

import Card from '@/views/calender/posting/card'
import foodItem from '@/views/calender/child/FoodItem'
import FoodSelect from '@/views/calender/posting/foodSelect'

import {createListOfFoodModel, Meal} from '@/model'

export default {
  name: 'CalenderPosting',
  props: {
    meal: Meal,
    foodList: createListOfFoodModel(),
  },
  components: {
    CalenderPostingCard: Card,
    CalenderPostingFoodItem: foodItem,
    CalenderPostingFoodSelect: FoodSelect,
  },
  data() {
    return {
      isPost: false,
    }
  },
  watch: {
    'meal.food': {
      deep: true,
      handler() {
        this.meal.carbohydrate = this.meal.food.reduce((p, el) => {
          p += (el.amount || el.default_amount) * el.carbohydrate
          return p
        }, 0)
      },
    },
  },
  methods: {
    async onPosting() {
      let meal = this.processMeal(this.meal)
      if (meal.id === -1) {
        delete meal.id
        this.$emit('post', meal)
      } else {
        delete meal.date
        this.$emit('update', meal)
      }
      this.isPost = false
    },

    onFoodSelectChange(food) {
      this.meal.food.push(food)
    },

    onRemoveFoodFromSelectedFoodList(index) {
      this.meal.food.splice(index, 1)
    },

    processMeal(meal) {
      meal = JSON.parse(JSON.stringify(this.meal))
      meal.food = meal.food.map(el => ({id: el.id, amount: Number(el.amount || el.default_amount)}))
      return meal
    },
  },
}
</script>

<style lang="scss">
.calender-posting {
  position: sticky;
  top: 15px;
  order: 1;
  width: 50%;
  height: calc(100vh - 30px);
  margin-right: 15px;
  background-color: #fff;
  overflow: hidden;

  &.shade:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    background-color: rgba(0, 0, 0, .2);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: calc(100vh - 60px);
    margin-right: 0;
  }
}

.confirm-info {
  position: absolute;
  z-index: 20;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 100%);
  transition: all .3s;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;

    i {
      cursor: pointer;
    }
  }

  &.post {
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    margin-bottom: 15px;

    span {
      width: 8ch;
      color: #999;
    }
  }

  &__btn {
    display: flex;
    justify-content: flex-end;
    padding: 0 15px 10px;
  }
}
</style>