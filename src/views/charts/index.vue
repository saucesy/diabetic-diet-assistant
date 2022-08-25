<template>
  <div class="charts">
    <!-- date -->
    <div class="charts-card top">
      <!-- header -->
      <div class="top-header">
        <span v-for="(item, index) in options"
              :key="item.label"
              :class="{ active: index === current }"
              @click="onOptionClick(index, item)">
          {{ item.label }}
        </span>
      </div>

      <!-- info -->
      <div class="top-info">
        <div class="title">Blood glucose at 8 o'clock</div>
        <div class="note">Note: Please add the diet in detail before displaying the data.</div>
      </div>
    </div>

    <!-- charts -->
    <div class="charts-card bottom">


    </div>
  </div>
</template>

<script>
export default {
  name: 'Charts',
  data() {
    return {
      // options
      current: 0,
      options: [
        {
          label: 'Last 7 days',
          days: 7
        },
        {
          label: 'Last 14 days',
          days: 7
        },
        {
          label: 'Last 3 months',
          days: 7
        }
      ]
    };
  },
  methods: {
    // choose option
    onOptionClick(index, item) {
      this.current = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.charts {
  display: flex;
  flex-direction: column;

  .charts-card {
    background-color: #FFF;
    width: 100%;

    &.top {
    }

    &.bottom {
    }
  }

  .top-header {
    background-color: #5EC8A4;
    padding: 2rem 2rem 1rem;

    span {
      margin: 0 1rem 1rem 0;
      display: inline-block;
      background-color: #59BC9F;
      color: #E3FEF6;
      cursor: pointer;
      border-radius: 2rem;
      padding: .25rem .75rem;
      user-select: none;

      &.active {
        background-color: #3F8B71;
      }

      @media (min-width: 1000px) {
        padding: .5rem 1rem;
      }
    }
  }

  @media (min-width: 1000px) {
    flex-direction: row;
  }
}
</style>