<template>
  <div class="calender">
    <div class="hd">
      <div class="title"> {{ title }}</div>
      <date-picker mode="date" style="width: 200px" @onchange="onPickerChange"/>
    </div>
    <div class="bd">
      <time-line :list="diet['meal'] || []" :food-list="foodList" @onupdate="onUpdate"/>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import DatePicker from "@/components/DatePicker"
import TimeLine from "@/views/calender/TimeLine"

import {getByDate, update} from "@/api/diet"
import {getList} from "@/api/food";

export default {
  name: "calender",
  components: {
    Icon,
    TimeLine,
    DatePicker
  },
  data() {
    return {
      diet: {},
      foodList: []
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

  methods: {
    init() {
      getByDate(this.formatDate()).then((res) => {
        this.diet = res.data
      })

      getList().then((res) => {
        this.foodList = res.data
      })
    },

    // format date to xxxx-xx-xx
    formatDate(date = Date.now()) {
      return new Date(date).toLocaleDateString().replace(/\//g, '-')
    },

    onUpdate() {
      update(this.diet).then(() => {
        this.$message.success('operation success!')
      })
    },

    onPickerChange(value) {
      getByDate(this.formatDate(value)).then((res) => {
        this.diet = res.data
      })
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/styles/variable.scss';

.calender {
  height: 100%;

  .hd {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 0 20px;
    background-color: #fff;

    .title {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .bd {
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  }
}
</style>