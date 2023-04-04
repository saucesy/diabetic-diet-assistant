<template>
  <div class="relations">
    <relations-friend
        :relations="relations"
        @agree="onAgree"
        @refuse="onRefuse"
        @jump="onJump"
    />
    <relations-search
        @agree="onAgree"
        @refuse="onRefuse"
        @jump="onJump"
    />
  </div>
</template>

<script>
import RelationsFriend from './friend'
import RelationsSearch from './search'
import {agree, getList, refuse} from '@/api/relationship'
import {i18n} from "@/i18n";

export default {
  name: 'Relations',
  components: {
    RelationsFriend,
    RelationsSearch,
  },
  data() {
    return {
      relations: [],
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getList().then((res) => this.relations = res.data)
    },

    onJump(value) {
      this.$router.push(value)
    },

    /**
     * refuse apply
     *
     * @param value
     */
    onRefuse(value) {
      // uses element-ui notify
      refuse(value).then(() => this.$notify.success(i18n.t('message.operationSuccess')) && this.init())
    },

    /**
     * agree apply
     *
     * @param value
     */
    onAgree(value) {
      // uses element-ui notify
      agree({id: value}).then(() => this.$notify.success(i18n.t('message.operationSuccess')) && this.init())
    },
  },
}
</script>

<style lang="scss">
.relations {
  display: flex;
  height: calc(100vh - 30px);

  .relations-friend {
    margin-right: 15px;
  }

  @media (max-width: 768px) {
    & {
      min-height: 100vh;
    }

    .relations-search {
      display: none;
    }

    .relations-friend {
      margin-right: 0;
      font-size: 14px;

      &__nav {
        position: static;
        top: 0;
        display: flex;

        .item {
          flex: 1;
          text-align: center;
          padding: 0;
        }
      }
    }
  }
}
</style>