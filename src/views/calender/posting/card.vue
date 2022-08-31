<template>
  <div class="calender-posting-card">
    <div class="calender-posting-card__hd">
      <div class="time">
        <i class="el-icon-time"/>
        <span>{{ time }}</span>
      </div>
      <div class="label"> <span>{{ title }}</span> </div>
    </div>
    <div class="calender-posting-card__bd">
      <slot></slot>
    </div>
    <div class="calender-posting-card__ft">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calenderPostingCard',
  props: {
    time: String,
    title: String,
    subTitle: String,
  },
}
</script>

<style lang="scss">
@import "~@/assets/styles/variable.scss";

.calender-posting-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;

  @media (max-width: 768px) {
    border-top: 1px solid #ecf0f3;
  }

  &__hd {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    padding: 0 15px;
    color: #fff;
    font-size: 20px;
    background-color: $themeColor;

    @media (max-width: 768px) {
      height: 60px;
      justify-content: space-between;
    }

    .time {
      float: left;
      font-weight: 600;

      i {
        margin-right: 10px;
      }
    }
  }

  &__bd {
    flex: 1;
    position: relative;
    padding: 15px;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__ft {
    padding: 10px 15px;
  }
}
</style>