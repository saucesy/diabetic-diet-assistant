<template>
  <div class="calender">
    <!--  post  -->
    <calender-post :post-list="meals" @change="onPickerChange" @edit="onEdit"/>
    <!--  posting  -->
    <calender-posting :food-list="foods" :meal="meal" @post="onPosting" @update="onUpdate"/>
  </div>
</template>

<script>
import CalenderPost from '@/views/calender/post'
import CalenderPosting from '@/views/calender/posting'

import {mapGetters} from 'vuex'
import {getList} from '@/api/food'
import {addMeal, getMealByDate, updateMeal} from '@/api/diet'
import {createDate, createMealModel} from '@/model/meal'

export default {
  name: 'calender',
  components: {
    CalenderPost,
    CalenderPosting,
  },
  data() {
    return {
      meals: [],
      foods: [],
      meal: createMealModel(),
    }
  },
  created() {
    this.init()
  },
  computed: {
    ...mapGetters(['token']),
  },
  methods: {
    init() {
      this.meal = createMealModel()
      getList().then((res) => this.foods = res.data.map((food) => (food.amount = food.default_amount, food)))
      getMealByDate(this.token, createDate()).then((res) => this.meals = res.data)
    },

    onPosting(value) {
      addMeal(value).then(() => this.$notify.success('added!') && this.init())
    },

    onUpdate(value) {
      updateMeal(value).then(() => this.$notify.success('updated!') && this.init())
    },

    onEdit(value) {
      Object.keys(this.meal).forEach((key) => {
        const v = value[key]
        if (typeof v) {
          this.meal[key] = JSON.parse(JSON.stringify(v))
        } else {
          this.meal[key] = v
        }
      })
    },

    onPickerChange(value) {
      getMealByDate(this.token, createDate(value)).then((res) => this.meals = res.data)
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