<template>
  <section id=timeline>
    <div class="timeline-wrapper">
      <template v-for="(item, index) of list">
        <div :class="['timeline-card', `timeline-card--step${index+1}`]" :style="{'--delay': index * 0.3 + 's'}"
             :key="index">
          <div class="head">
            <div class="number-box">
              <span>{{ item['meal_data'].time }}</span>
            </div>
            <h3><span class="small">{{ item['meal_data'].time }}</span> {{ item['meal_data'].name }}</h3>
          </div>
          <div class="body">
            <template v-for="(food, index) of item.food">
              <food-item :food="food" :key="index" @onchange="$emit('onupdate')"/>
            </template>
            <food-select
                :food-list="foodList"
                :color="['#46b8e9', '#3ee9d1', '#ce43eb', '#4d92eb', '#46b8e9'][index]"
                @onchange="onFoodSelectChange(index, $event)"
            />
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import FoodItem from '../children/FoodItem'
import FoodSelect from '../children/FoodSelect'

export default {
  name: "TimeLine",
  props: {
    list: {
      type: Array,
      required: true
    },
    foodList: {
      type: Array,
      required: true
    }
  },
  components: {
    FoodItem,
    FoodSelect
  },
  methods: {
    onFoodSelectChange(index, value) {
      const {food} = this.list[index]
      const {default_amount: amount, id: food_id} = value
      if (food.some((f) => f['food_id'] === food_id)) {
        this.$message.warning('The food has already been added.')
      } else {
        food.push({amount, food_id, food_data: value})
        this.$emit('onupdate')
      }
    }
  }
}
</script>



<style lang="scss">
@import "~@/assets/styles/variable.scss";

@media (min-width: 1000px) {
  #timeline .timeline-card:nth-child(odd) .head::after,
  #timeline .timeline-card:nth-child(even) .head::after {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
  }

  #timeline .timeline-card:nth-child(odd) .head::before,
  #timeline .timeline-card:nth-child(even) .head::before {
    position: absolute;
    content: "";
    width: 9px;
    height: 9px;
    background-color: #bdbdbd;
    border-radius: 9px;
    box-shadow: 0 0 2px 8px #f7f7f7;
  }
}

/* Some Cool Stuff */
.timeline-card:nth-child(1) {
  order: 1;
}

.timeline-card:nth-child(2) {
  order: 4;
}

.timeline-card:nth-child(3) {
  order: 2;
}

.timeline-card:nth-child(4) {
  order: 5;
}

.timeline-card:nth-child(5) {
  order: 3;
}

.timeline-card:nth-child(6) {
  order: 6;
}

#timeline {
  padding: 50px 0;
  border-top: 1px solid rgba(191, 191, 191, 0.4);
  border-bottom: 1px solid rgba(191, 191, 191, 0.4);
}

#timeline .timeline-wrapper {
  position: relative;
  margin: auto;
}

@media (min-width: 1000px) {
  #timeline .timeline-wrapper {
    display: flex;
    flex-flow: column wrap;
    width: 100%;
    height: 1850px;
    margin: 0 auto;
  }
}

#timeline .timeline-wrapper::after {
  z-index: 1;
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  border-left: 2px solid #e4e7ed;
}

@media (min-width: 1000px) {
  #timeline .timeline-wrapper::after {
    border-left: 2px solid #e4e7ed;
  }
}

#timeline .timeline-card {
  position: relative;
  display: block;
  margin: 10px auto 80px;
  max-width: 94%;
  z-index: 2;
  opacity: 0;
  transform: translateY(50px);
  animation: fade .5s forwards;
  animation-delay: var(--delay);
}

@media (min-width: 480px) {
  #timeline .timeline-card {
    max-width: 80%;
    box-shadow: 0 1px 22px 4px rgba(0, 0, 0, 0.07);
  }
}

@media (min-width: 720px) {
  #timeline .timeline-card {
    max-width: 80%;
  }
}

@media (min-width: 1000px) {
  #timeline .timeline-card {
    width: 400px;
    margin: 45px 90px;
  }

  #timeline .timeline-card:nth-child(odd) {
    right: 36px;
  }

  #timeline .timeline-card:nth-child(odd) .head::after {
    border-left-width: 15px;
    border-left-style: solid;
    left: 100%;
  }

  #timeline .timeline-card:nth-child(odd) .head::before {
    left: 485px;
  }

  #timeline .timeline-card:nth-child(even) {
    right: 32px;
  }

  #timeline .timeline-card:nth-child(even) .head::after {
    border-right-width: 15px;
    border-right-style: solid;
    right: 100%;
  }

  #timeline .timeline-card:nth-child(even) .head::before {
    right: 489.5px;
  }

  #timeline .timeline-card:nth-child(2) {
    margin-top: 280px;
  }
}

#timeline .timeline-card .head {
  position: relative;
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 400;
}

#timeline .timeline-card .head .number-box {
  display: inline;
  float: left;
  margin: 15px;
  padding: 10px;
  font-size: 35px;
  line-height: 35px;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.17);
}

#timeline .timeline-card .head h3 {
  font-size: 1.3rem;
  font-weight: inherit;
  letter-spacing: 2px;
  margin: 0;
  padding-bottom: 6px;
  line-height: 1rem;
}

@media (min-width: 480px) {
  #timeline .timeline-card .head h3 {
    font-size: 165%;
    line-height: 1.2rem;
  }
}

#timeline .timeline-card .head h3 span {
  display: block;
  font-size: 0.6rem;
  margin: 0;
}

@media (min-width: 480px) {
  #timeline .timeline-card .head h3 span {
    font-size: 0.8rem;
  }
}

#timeline .timeline-card .body {
  position: relative;
  background: #fff;
  border: 1px solid rgba(191, 191, 191, 0.4);
  border-top: 0;
  min-height: 100px;
  padding: 15px 15px 60px;
}


@media (min-width: 1000px) {
  #timeline .timeline-card .body {
    min-height: 400px;
  }
}

#timeline .timeline-card--step1,
#timeline .timeline-card--step1 .add-food-btn {
  background-color: #46b8e9;
}

#timeline .timeline-card--step1 .head::after {
  border-color: #46b8e9;
}

#timeline .timeline-card--step2,
#timeline .timeline-card--step2 .add-food-btn {
  background-color: #3ee9d1;
}

#timeline .timeline-card--step2 .head::after {
  border-color: #3ee9d1;
}

#timeline .timeline-card--step3,
#timeline .timeline-card--step3 .add-food-btn {
  background-color: #ce43eb;
}

#timeline .timeline-card--step3 .head::after {
  border-color: #ce43eb;
}

#timeline .timeline-card--step4,
#timeline .timeline-card--step4 .add-food-btn {
  background-color: #4d92eb;
}

#timeline .timeline-card--step4 .head::after {
  border-color: #4d92eb;
}

#timeline .timeline-card--step5,
#timeline .timeline-card--step5 .add-food-btn {
  background-color: #46b8e9;
}

#timeline .timeline-card--step5 .head::after {
  border-color: #46b8e9;
}
</style>