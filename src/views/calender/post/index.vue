<template>
  <div class="calender-post">
    <div class="calender-post__head">
      <div class="title"> Calender </div>
      <date-picker mode="date" style="width: 200px" @change="onPickerChange"/>
    </div>
    <div class="calender-post__content">
      <template v-for="post of postList">
        <calender-post-item
            :post="post"
            :rating-list="ratingList"
            :key="post.id"
            @edit="$emit('edit', $event)"
            @feedback="onFeedBack"/>
      </template>
      <el-empty description="There's no record of this date." v-if="!postList.length"/>
    </div>
  </div>
</template>

<script>
import DatePicker from '@/components/DatePicker'
import CalenderPostItem from '@/views/calender/post/item'
import {mealFeedback} from '@/api/diet'

const ratingList = []
for (let i = 0; i < 5; i++) {
  ratingList.push(require(`@/assets/images/face-${i}.svg`))
}

export default {
  name: 'CalenderPost',
  props: {
    postList: Array,
  },
  components: {
    DatePicker,
    CalenderPostItem,
  },
  data() {
    return {
      ratingList,
    }
  },
  methods: {
    onPickerChange(value) {
      this.$emit('change', value)
    },
    onFeedBack(value) {
      mealFeedback(value).then(() => this.$notify.success('operation success'))
    },
  },
}
</script>

<style lang="scss">
.calender-post {
  order: 2;
  flex: 1;
  display: flex;
  flex-direction: column;

  &__head {
    position: sticky;
    top: 15px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 68px;
    padding: 0 15px;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .1);

    .title {
      font-size: 18px;
    }
  }

  &__content {
    flex: 1;
    background-color: #fff;
  }
}
</style>