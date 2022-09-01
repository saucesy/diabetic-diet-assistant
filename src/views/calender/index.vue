<template>
  <div class="calender">
    <!--  post  -->
    <calender-post
        :post-list="meals"
        @change="onPickerChange"
        @edit="onEdit"
        v-if="token"
    />
    <!--  posting  -->
    <calender-posting
        :meal="meal"
        :food-list="foods"
        @post="onPosting"
        @update="onUpdate"
        :style="{'width': !token && '100%'}"
    />
  </div>
</template>

<script>
import CalenderPost from '@/views/calender/post'
import CalenderPosting from '@/views/calender/posting'

import {getList} from '@/api/food'
import {addMeal, getMealByDate, updateMeal} from '@/api/diet'
import {createDate, createMealModel} from '@/model/meal'
import {List} from '@/model'

export default {
  name: 'calender',
  components: {
    CalenderPost,
    CalenderPosting,
  },
  data() {
    return {
      meals: List.Meal,
      foods: List.Food,
      meal: createMealModel(),
      othersID: null,
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.othersID = this.$route.params.othersID ?? null
      this.meal = createMealModel()
      this.onPickerChange()
      getList().then((res) => this.foods = res.data.map((food) => (food.amount = food.default_amount, food)))
    },

    onPosting(value) {
      // uses element-ui notify
      addMeal(value).then(() => this.$notify.success('added!') && this.init())
    },

    onUpdate(value) {
      // uses element-ui notify
      updateMeal(value).then(() => this.$notify.success('updated!') && this.init())
    },

    onEdit(value) {
      this.meal = createMealModel(value)
    },

    onPickerChange(value = new Date()) {
      if (!this.token) return
      getMealByDate(this.othersID || this.token, createDate(value)).then((res) => this.meals = res.data)
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/styles/variable.scss';

.calender {
  display: flex;
}
</style>