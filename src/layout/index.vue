<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar
        :class="{'sidebar-container': true,
        'show-menu': isToggle && $store.getters.device === 'mobile'}"
        @toggle="toggleMenu"
    />
    <div class="main-container">
      <app-main/>
    </div>
  </div>
</template>

<script>
import {Sidebar, AppMain} from './components'

const WIDTH = 992
const {body} = document

export default {
  name: "Layout",
  components: {
    Sidebar,
    AppMain
  },
  data() {
    return {
      isToggle: false
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.onResizeHandler, false)
  },
  beforeDestroy() {
    window.addEventListener('resize', this.onResizeHandler, false)
  },
  mounted() {
    this.onResizeHandler()
  },
  computed: {
    classObj() {
      const {device} = this.$store.getters
      return {
        mobile: device === 'mobile',
        desktop: device === 'desktop'
      }
    }
  },
  watch: {
    '$route.path'() {
      this.$store.getters.device === 'mobile' && this.toggleMenu()
    }
  },
  methods: {
    onResizeHandler() {
      if (!document.hidden) {
        const rect = body.getBoundingClientRect()
        const isMobile = rect.width - 1 < WIDTH
        this.$store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop')
      }
    },

    toggleMenu() {
      this.isToggle = !this.isToggle
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/styles/variable.scss";

.mobile {
  .sidebar-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    padding: 0 20px;
    z-index: 10;

    display: flex;
    align-items: center;
    justify-content: space-between;

    &.show-menu {
      .menu {
        .menu-items {
          height: 150px;
        }
      }
    }

    .menu {
      position: relative;

      .toggle {
        cursor: pointer;
      }

      .menu-items {
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        background-color: $themeColor;
        transition: all .3s;

        height: 0;
        overflow: hidden;

        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          padding: 0 25px;
          height: 50px;

          img {
            width: 20px;
            height: 20px;
            margin-bottom: 5px;
          }

          span {
            color: #dbdbdb;
            font-size: 18px;
          }

          &.active {
            span {
              color: #fff;
            }
          }
        }
      }
    }
  }

  .main-container {
    padding-top: 60px;
    background-color: #ecf0f3;
  }
}

.desktop {
  .sidebar-container {
    left: 0;
    bottom: 0;
    width: $sideBarWidth;

    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      padding: 15px 0;

      img {
        width: 20px;
        height: 20px;
        margin-bottom: 5px;
      }

      span {
        color: #dbdbdb;
        font-size: 12px;
      }

      &.active {
        span {
          color: #fff;
        }
      }
    }
  }

  .main-container {
    margin-left: $sideBarWidth;
    padding: 15px;
  }
}

.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .sidebar-container {
    position: fixed;
    top: 0;
    z-index: 10;
    background-color: $themeColor;
  }

  .main-container {
    position: relative;
    min-height: 100%;
    background-color: #ecf0f3;

    .app-main {
      height: 100%;
    }
  }
}
</style>