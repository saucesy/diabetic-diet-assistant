<template>
  <div class="sidebar-logo-container">
    <img :src="logo" alt="logo"/>
  </div>
</template>

<script>
export default {
  name: "Logo",
  data() {
    return {
      logo: require('@/assets/images/logo.png')
    }
  }
}
</script>

<style lang="scss">
.sidebar-logo-container {
  position: relative;
  padding: 10px 0;
  text-align: center;
  img {
    display: inline-block;
    width: 40px;
    height: 40px;
    transform: rotate(-45deg);
    cursor: pointer;
  }
  
  //&::before {
  //  position: absolute;
  //  content: '';
  //  bottom: 0;
  //  left: 50%;
  //  width: 70%;
  //  height: 2px;
  //  background-color: #6485e3;
  //  transform: translateX(-50%);
  //}
}
</style>