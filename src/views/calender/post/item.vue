<template>
  <div class="calender-post-item">
    <div class="calender-post-item__head">
      <div class="time-nodes">
        <span class="time">{{ post.time }}</span>
        <span class="nodes"> {{ post.name }} </span>
      </div>
      <div class="rating">
        <img :src="ratingList[post.rate]" alt="mood" @click="isShowRating = !isShowRating">
        <div class="rating-inner" :class="{'show-rating': isShowRating && !isOther}">
          <template v-for="(rate, index) of ratingList">
            <img :src="rate" :alt="rate" v-if="index !== post.rate" @click="post.rate = index; isShowRating = false">
          </template>
        </div>
      </div>
    </div>
    <div class="calender-post-item__content">
      <food-item v-for="({amount, ...food}) of post.food" :food="food" :key="post.id">
        <template #default="{food}">
          <span class="gi">{{ food.gi }}gi</span>
          -
          <span class="carbs">{{ (food.carbohydrate * amount) | toFixed }}carbs</span>
        </template>
      </food-item>
    </div>
    <div class="calender-post-item__remark" v-if="isOther === false">
      <textarea placeholder="You can add comments here" v-model="post.remark"/>
      <div class="setting el-icon-setting" @click="isShowSetting = !isShowSetting"
           :class="{'show-setting': isShowSetting}">
        <div class="icons">
          <i @click="onSetting(0)" class="btn-position el-icon-position"></i>
          <i @click="onSetting(1)" class="btn-edit el-icon-edit"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FoodItem from '@/views/calender/child/FoodItem'

export default {
  name: 'calenderPostItem',
  props: {
    post: Object,
    ratingList: Array,
  },
  components: {
    FoodItem,
  },
  data() {
    return {
      isShowRating: false,
      isShowSetting: false,
    }
  },
  filters: {
    toFixed(value) {
      return Number(value).toFixed(2)
    },
  },
  computed: {
    isOther() {
      return !!this.$parent.$parent.othersID
    }
  },
  methods: {
    onSetting(value) {
      if (value) {
        return this.$emit('edit', this.post)
      }
      const {id, remark, rate} = this.post
      this.$emit('feedback', {id, remark, rate})
    },
  },
}
</script>

<style lang="scss">
@import "~@/assets/styles/variable.scss";

.calender-post-item {
  position: relative;
  padding-top: 20px;
  overflow: hidden;
  transition: background-color .3s;

  &__head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 0 15px;

    .time-nodes {
      span {
        display: block;
      }

      .time {
        color: #999;
        font-size: 12px;
      }

      .nodes {
        font-size: 16px;
      }
    }

    .rating {
      position: relative;
      margin-bottom: 5px;

      img {
        width: 30px;
        cursor: pointer;
      }

      .rating-inner {
        position: absolute;
        right: 35px;
        bottom: 0;
        display: flex;

        width: 0;
        overflow: hidden;
        transition: all .3s;

        &.show-rating {
          width: 140px;
        }

        img {
          margin-right: 5px;
        }
      }
    }
  }

  &__content {
    flex: 1;
    margin: 5px 10px 0;
  }

  &__remark {
    background-color: #f6f6f6;

    textarea {
      width: 100%;
      padding: 10px 15px;
      border: none;
      outline: none;
      color: #666;
      font-size: 14px;
      resize: none;
      background-color: transparent;

      &::placeholder {
        color: #999;
      }
    }

    .setting {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 30px;
      height: 30px;
      color: #fff;
      font-size: 18px;
      line-height: 30px;
      text-align: center;
      border-top-left-radius: 50%;
      background-color: $themeColor;
      transition: opacity .3s;
      cursor: pointer;

      .icons {
        i {
          position: absolute;
          right: 0;
          bottom: 0;
          z-index: -1;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          line-height: 30px;
          text-align: center;
          transition: all .3s;

          &:hover {
            opacity: .8;
          }
        }
      }

      &.show-setting {
        i {
          z-index: 1;
        }

        i.btn-position {
          right: 10px;
          bottom: 40px;
          background-color: #85ce61;
        }

        i.btn-edit {
          right: 40px;
          bottom: 10px;
          background-color: #909399;
        }
      }
    }
  }
}
</style>