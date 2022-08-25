<template>
  <div class="calender-card">
    <div class="calender-card__hd">
      <div class="calender-card__time">
        <input :value="hour" :disabled="disabled" @change="onTimeChange"></input>
        <span>:</span>
        <input :value="minute" :disabled="disabled" @change="onTimeChange"></input>
      </div>
      <h3 class="calender-card__title">
        <span>{{ time }}</span>
        {{ title }}
      </h3>
    </div>
    <div class="calender-card__bd">
      <slot></slot>
    </div>
    <div class="calender-card__ft">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    time: String,
    title: String,
    subTitle: String,
    disabled: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    hour() {
      return this.time.split(':')[0]
    },
    minute() {
      return this.time.split(':')[1]
    }
  },
  methods: {
    onTimeChange(value) {

    }
  }
}
</script>

<style lang="scss">
$breakfast: #46b8e9;
$lunch: #3ee9d1;
$tea: #ce43eb;
$dinner: #4d92eb;
$snack: #4deb7a;

.calender-card {
  height: 100%;

  &__hd {
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    color: #fff;
    font-weight: 400;
    background-color: $breakfast;

    @media (max-width: 768px) {
      padding: 5px 15px;
      justify-content: space-between;
    }
  }

  &__time {
    display: inline;
    float: left;
    margin-right: 20px;
    padding: 5px 10px;
    font-size: 28px;
    line-height: 35px;
    font-weight: 600;
    background-color: rgba(0, 0, 0, .17);

    input {
      width: 2ch;
      border: none;
      color: #fff;
      background-color: transparent;
    }
  }

  &__title {
    padding: 5px 0;
    font-size: 1.4rem;
    line-height: 1rem;
    font-weight: inherit;

    span {
      display: block;
      font-size: .8rem;
      margin-bottom: 5px;
    }
  }

  &__bd {
    position: relative;
    height: calc(100% - 220px);
    overflow-x: hidden;
    overflow-y: auto;
    padding: 15px;
    background-color: #fff;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__ft {
    background-color: #fff;
  }
}
</style>