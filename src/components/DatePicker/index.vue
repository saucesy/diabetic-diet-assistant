<template>
  <div class="date-picker">
    <icon name="arrow-left-bold.png" @click="onPickerChange('pre')"/>
    <span style="margin: 0 10px">{{ value }}</span>
    <icon name="arrow-right-bold.png" @click="onPickerChange('next')"/>
  </div>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  name: "DatePicker",
  data() {
    return {
      date: new Date(),
      value: ''
    }
  },
  components: {Icon},

  mounted() {
    this.value = this.getDate()
  },

  methods: {
    getDate(value = 0) {
      let date = new Date(this.date)
      date = this.date = new Date(date.setDate(date.getDate() + value))
      const y = date.getFullYear()
      const m = date.getMonth() + 1
      const d = date.getDate()
      return `${d < 10 ? '0' + d : d} / ${m < 10 ? '0' + m : m} / ${y}`
    },

    onPickerChange(type) {
      this.value = this.getDate(type === 'pre' ? -1 : 1)
      this.$emit('change', this.date)
    }
  }
}
</script>

<style lang="scss">
.date-picker {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    white-space: nowrap;
  }
}
</style>