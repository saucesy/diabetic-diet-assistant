<template>
  <div class="calender">
    <div class="calender__hd">
      <div class="title"> {{ title }}</div>
      <date-picker mode="date" style="width: 200px" @onchange="onPickerChange"/>
    </div>
    <div class="calender__bd">
      <div class="calender__template">
        <calender-card :time="updatingMeal.time" :title="updatingMeal.name" :disabled="false">
          <template slot="default">
            <food-list :food-list="selectedFoodList" @click="removeFoodBySelectedList"/>
            <food-select
                class="calender__select"
                color="#46b8e9"
                :food-list="foodList"
                @change="onFoodSelectChange"
            />
          </template>
          <template slot="footer">
            <div class="calender__remark">
              <div class="rate">
                <span>Your rate: </span>
                <img v-for="(item, index) of ratingList" :class="{'selected': updatingMeal.feedback.rate === index}"
                     :src="item" :key="item"
                     @click="updatingMeal.feedback.rate = index" :alt="item">
              </div>
              <textarea placeholder="You can enter remarks here." v-model="updatingMeal.feedback.remark"></textarea>
              <food-button icon="jijianfasong-xianxing" :width="45" color="#46b8e9" @click.native="createMeal"/>
            </div>
          </template>
        </calender-card>
      </div>
      <div class="calender__list">
        <template v-for="(item, index) of diet['meal']">
          <div class="item" :key="index">
            <div class="hd">
              <div class="time-nodes">
                <span class="time">{{ item.meal_data.time }}</span>
                <span class="nodes"> {{ item.meal_data.name }} </span>
              </div>
              <div class="rating">
                <img :src="ratingList[item.rate]" alt="mood">
              </div>
            </div>
            <div class="eat-foods">
              <food-item v-for="({food_data, amount}) of item.food" :food="food_data" :key="item.id">
                <template v-slot:default="{food}">
                  <span class="gi">gi: {{ food.gi }}</span>
                  &nbsp;•&nbsp;
                  <span class="carbs">carbs: {{ (food.carbohydrate * amount) | toFixed }}</span>
                </template>
              </food-item>
            </div>
            <div class="remark">
              {{ item.remark || "You don't have any notes..." }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import DatePicker from "@/components/DatePicker"

import CalenderCard from '@/views/calender/children/card'
import FoodItem from "@/views/calender/children/FoodItem";
import FoodList from "@/views/calender/children/FoodList"
import FoodSelect from '@/views/calender/children/FoodSelect'
import FoodButton from "@/views/calender/children/FoodButton"

import {getList} from "@/api/food"
import {getByDate, mealFeedback, update} from "@/api/diet"

const ratingList = []
for (let i = 1; i < 5; i++) {
  ratingList.push(require(`@/assets/images/face-${i}.svg`))
}

const before_dawn = "Before Dawn"
const breakfast = "Breakfast"
const lunch = "Lunch"
const supper = "supper"
const night_snack = "Night Snack"

const getDefaultMealNode = () => {
  let name = ""
  const date = new Date()
  const h = date.getHours()
  if (h >= 0 && h <= 6) {
    name = before_dawn
  } else if (h >= 7 && h <= 11) {
    name = breakfast
  } else if (h >= 12 && h < 17) {
    name = lunch
  } else if (h >= 17 && h < 20) {
    name = supper
  } else {
    name = night_snack
  }
  return {name, time: date.toLocaleTimeString().substring(0, 5)}
}

// backup of Data being updated
const updatingMealBackup = () => (
    {
      food: [],
      feedback: {rate: 3, remark: ""},
      ...getDefaultMealNode()
    }
)

export default {
  name: "calender",
  components: {
    Icon,
    DatePicker,
    FoodItem,
    FoodList,
    FoodButton,
    FoodSelect,
    CalenderCard
  },
  data() {
    return {
      ratingList,
      // Daily meal Data
      diet: {},
      // Data being updated
      updatingMeal: updatingMealBackup(),
      // list of food
      foodList: [],
      selectedFoodList: [],
    }
  },
  created() {
    this.init()
  },
  computed: {
    title() {
      return this.$route.meta['title']
    }
  },
  filters: {
    toFixed(num) {
      return Number(num).toFixed(2)
    }
  },
  methods: {
    init() {
      getByDate(this.formatDate())
          .then((res) => {
            const {meal, ...rest} = res.data
            this.diet = JSON.parse(JSON.stringify(res.data))
            this.updatingMeal = Object.assign(this.updatingMeal, rest)
          })

      getList().then((res) => {
        this.foodList = res.data
      })
    },

    updateForDiet(data) {
      const {feedback, ...meal} = data
      mealFeedback(feedback)
      update(meal).then(() => {
        this.updatingMeal = updatingMealBackup()
        this.$message.success('operation success.')
      })
    },

    // format date to xxxx-xx-xx
    formatDate(date = Date.now()) {
      return new Date(date).toLocaleDateString().replace(/\//g, '-')
    },

    createMeal() {
      this.selectedFoodList.forEach((el) => {
        const {carbohydrate, id, default_amount: amount} = el
        this.updatingMeal.food.push({"food_id": id, amount})
        this.updatingMeal.carbohydrate += carbohydrate * amount
      })
      this.updateForDiet(this.updatingMeal)
    },

    removeFoodBySelectedList(index) {
      this.selectedFoodList.splice(index, 1)
    },

    onFoodSelectChange(value) {
      this.selectedFoodList.push(value)
    },

    onPickerChange(value) {
      getByDate(this.formatDate(value)).then((res) => this.diet = res.data)
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/styles/variable.scss';

.calender {
  height: 100%;

  &__hd {
    position: sticky;
    top: 15px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 0 20px;
    margin-bottom: 15px;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);

    .title {
      font-size: 20px;
      font-weight: bold;
    }

    @media (max-width: 768px) {
      position: static;
      top: 0;
      margin-bottom: 0;
    }
  }

  &__bd {
    height: calc(100% - 70px);
  }

  &__template {
    position: sticky;
    top: 90px;
    float: left;
    width: 40%;
    margin-right: 15px;
    height: calc(100vh - 100px);

    @media (max-width: 768px) {
      float: none;
      width: 100%;
      position: static;
      top: 0;
    }
  }

  &__remark {
    width: 100%;
    padding: 15px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, .03) inset;

    .rate {
      display: flex;
      padding: 0 5px;
      margin-bottom: 10px;

      span {
        color: #333;
        margin-right: 20px;
      }

      img {
        position: relative;
        width: 30px;
        margin-right: 20px;
        transition: all .3s;
        cursor: pointer;
        background-color: transparent;

        &.selected {
          transform: translateY(-8px);
        }
      }
    }

    textarea {
      width: calc(100% - 60px);
      padding: 10px;
      margin-right: 15px;
      color: #333;
      background-color: #eee;
      border: none;
    }

    .food-button {
      float: right;
      margin-top: 10px;
    }
  }

  &__select {
    //margin-bottom: 15px;
  }

  &__list {
    padding: 15px;
    min-height: 100%;
    overflow: hidden;
    background-color: #fff;

    @media (max-width: 768px) {
      display: none;
    }

    .item {
      border-bottom: 2px solid #f6f7f9;

      .hd {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 0 10px;

        .time-nodes {
          span {
            display: block;
          }

          .time {
            color: #999;
            font-size: 12px;
          }

          .nodes {
            font-size: 18px;
          }
        }

        .rating {
          margin-bottom: 5px;

          img {
            width: 30px;
          }
        }
      }

      .eat-foods {
        flex: 1;
        margin-top: 5px;
      }

      .remark {
        padding: 15px;
        margin-bottom: 15px;
        background-color: #efefef;

        color: #999;
      }
    }
  }

}
</style>