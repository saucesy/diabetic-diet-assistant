<template>
  <div class="calender">
    <!--  post  -->
    <calender-post :post-list="meals" @change="onPickerChange" @edit="onEdit" v-if="token"/>
    <!--  posting  -->
    <calender-posting :food-list="foods" :meal="meal" @post="onPosting" @update="onUpdate" :style="{'width': !token && '100%'}"/>
  </div>
</template>

<script>
import CalenderPost from '@/views/calender/post'
import CalenderPosting from '@/views/calender/posting'

import {mapGetters} from 'vuex'
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
  computed: {
    ...mapGetters(['token']),
  },
  methods: {
    init() {
      this.othersID = this.$route.params.othersID ?? null
      this.meal = createMealModel()
      getMealByDate(this.othersID || this.token, createDate()).then((res) => this.meals = res.data)
      getList().then((res) => this.foods = res.data.map((food) => (food.amount = food.default_amount, food)))
    },

    onPosting(value) {
      addMeal(value).then(() => this.$notify.success('added!') && this.init())
    },

    onUpdate(value) {
      updateMeal(value).then(() => this.$notify.success('updated!') && this.init())
    },

    onEdit(value) {
      this.meal = createMealModel(value)
    },

    onPickerChange(value) {
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