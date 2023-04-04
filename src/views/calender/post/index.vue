<template>
  <!-- right post -->
  <div class="calender-post" :class="{'display': !isOther}">
    <div class="calender-post__head">
      <div class="title">{{ $t('functions.calender') }}</div>
      <date-picker mode="date" style="width: 200px" @change="$emit('change', $event)"/>
    </div>
    <!-- post list -->
    <div class="calender-post__content">
      <template v-for="(post, index) of postList">
        <calender-post-item
            :post="post"
            :rating-list="ratingList"
            :key="post.id"
            @edit="$emit('edit', $event)"
            @delete="onDelete($event, index)"
            @feedback="onFeedBack"
        />
      </template>
      <!-- uses element-ui empty -->
      <el-empty description="There's no record of this date." v-if="!postList.length"/>
    </div>
  </div>
</template>

<script>
import DatePicker from '@/components/DatePicker';
import CalenderPostItem from '@/views/calender/post/item';
import {deleteMeal, mealFeedback} from '@/api/diet';
import {i18n} from "@/i18n";

const ratingList = [];
for (let i = 0; i < 5; i++) {
  ratingList.push(require(`@/assets/images/face-${i}.svg`));
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
    };
  },
  computed: {
    isOther() {
      return this.$parent.othersID;
    },
  },
  methods: {
    /**
     * feedback diet
     *
     * @param value
     */
    onFeedBack(value) {
      // uses element-ui notify
      mealFeedback(value)
          .then(() => this.$notify.success(i18n.t('message.saveSuccess')))
          .catch(() => this.$notify.error(i18n.t('message.networkAnomaly')));
    },
    /**
     * delete dirt
     *
     * @param id
     * @param index
     */
    onDelete(id, index) {
      // uses element-ui notify
      deleteMeal(id).then(() => this.postList.splice(index, 1)).catch(() => this.$notify.error('network anomaly.'));
    },
  },
};
</script>

<style lang="scss">
.calender-post {
  order: 2;
  flex: 1;
  display: flex;
  flex-direction: column;

  &.display {
    @media (max-width: 768px) {
      display: none;
    }
  }

  &__head {
    position: sticky;
    top: 15px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 68px;
    padding: 0 15px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .1);

    .title {
      font-size: 18px;
    }
  }

  &__content {
    flex: 1;
    background-color: #FFFFFF;
  }
}
</style>