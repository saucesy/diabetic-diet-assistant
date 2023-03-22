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
          <span class="text">Blood glucose rating</span>
          <div class="images">
            <template v-for="(rate, index) of ratingList">
              <img :src="rate" :alt="rate" v-if="index !== post.rate" @click="onRating(index)">
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="calender-post-item__content">
      <food-item v-for="({amount, ...food}, index) in post.food" :food="food" :key="`${post.id}${index}`">
        <template #default="{food}">
          <span class="gi">gi:{{ food.gi }}</span>
          &nbsp;-&nbsp;
          <span class="carbs">carbs:{{ (food.carbohydrate * amount) | toFixed }}g</span>
        </template>
      </food-item>
    </div>
    <div class="calender-post-item__remark" v-if="isOther === false">
      <textarea placeholder="You can add comments here" v-model="post.remark" @blur="onRemark"/>
      <div class="setting">
        <!-- uses element-ui button -->
        <el-button circle plain size="mini" type="info" @click="onEdit" icon="el-icon-edit"></el-button>
        <!--<el-button circle plain size="mini" type="primary" @click="onFeedBack" icon="el-icon-position"></el-button>-->
        <el-button circle plain size="mini" type="danger" @click="onDelete" icon="el-icon-delete"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import FoodItem from '@/views/calender/child/FoodItem';

export default {
  name: 'calenderPostItem',
  props: {
    post: Object,
    ratingList: Array
  },
  components: {
    FoodItem
  },
  data() {
    return {
      isShowRating: false
    };
  },
  filters: {
    toFixed(value) {
      return Number(value).toFixed(2);
    }
  },
  computed: {
    isOther() {
      return !!this.$parent.$parent.othersID;
    }
  },
  methods: {
    onEdit() {
      this.$emit('edit', this.post);
    },

    /**
     * rate
     *
     * @param index
     */
    onRating(index) {
      this.post.rate = index;
      this.isShowRating = false;
      this.onFeedBack();
    },

    /**
     * edit remark
     */
    onRemark() {
      this.onFeedBack();
    },

    /**
     * delete
     */
    onDelete() {
      this.$emit('delete', this.post.id);
    },

    /**
     * feedback
     */
    onFeedBack() {
      const {id, remark, rate} = this.post;
      this.$emit('feedback', {id, remark, rate});
    }
  }
};
</script>

<style lang="scss">
@import "~@/assets/styles/variable.scss";

.calender-post-item {
  position: relative;
  margin-top: 15px;
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

        width: 0;
        overflow: hidden;
        transition: all .3s;
        text-align: right;

        .images {
          display: flex;
          justify-content: end;
        }

        .text {
          display: inline-block;
          padding-bottom: 6px;
          white-space: nowrap;
          font-size: 15px;
          padding-right: 8px;
        }

        &.show-rating {
          width: 200px;
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
    background-color: #F6F6F6;

    textarea {
      width: 100%;
      padding: 10px 15px;
      border: none;
      outline: none;
      color: #666;
      font-size: 14px;
      background-color: transparent;
      overflow: hidden;

      &::placeholder {
        color: #999;
      }
    }

    .setting {
      text-align: right;
      padding: 0 10px 10px;
    }
  }
}
</style>