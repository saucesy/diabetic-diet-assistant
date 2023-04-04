<template>
  <div class="relations-friend">
    <!-- nav -->
    <nav class="relations-friend__nav">
      <div class="item"
           v-for="(item, key) of navs"
           @click="currentNavKey = key"
           :class="{'active': currentNavKey === key}"
           :key="key">
        <span class="single-omit">{{ item.title }}</span>
      </div>
    </nav>
    <!--  content  -->
    <div class="relations-friend__content">
      <relations-users :users="navs[currentNavKey].data">
        <template #default="{ user }">
          <div class="friends" v-if="currentNavKey === Object.keys(navs)[0]">
            <i class="el-icon-pie-chart" @click="$emit('jump', `/charts/${user.id}`)"></i>
            <i class="el-icon-date" @click="$emit('jump', `/calender/${user.id}`)"></i>
          </div>
          <div class="new-friends" v-else>
            <div class="applicant" v-if="user.relationship['applicant']">
              <!-- uses element-ui link -->
              <el-link :underline="false" type="info">{{ $t('relations.waitingFor') }}</el-link>
            </div>
            <div class="not-applicant" v-else>
              <!-- uses element-ui button -->
              <el-button plain size="small" type="danger" @click="$emit('refuse', user.relationship.id)">{{ $t('relations.refuse') }}</el-button>
              <el-button plain size="small" @click="$emit('agree', user.relationship.id)">{{ $t('relations.agree') }}</el-button>
            </div>
          </div>
        </template>
      </relations-users>
      <!-- uses element-ui empty -->
      <el-empty v-if="!navs[currentNavKey].data.length" :description="$t('relations.noData')"/>
    </div>
  </div>
</template>

<script>
import RelationsUsers from '@/views/relations/child/users'
import {i18n} from "@/i18n";

export default {
  name: 'RelationsFriend',
  props: {
    relations: Array,
  },
  components: {
    RelationsUsers,
  },
  data() {
    return {
      navs: {
        friends: {
          title: i18n.t('relations.friends'),
          data: [],
        },
        newFriends: {
          title: i18n.t('relations.newFriends'),
          data: [],
        },
      },
      currentNavKey: 'friends',
    }
  },
  watch: {
    currentNavKey(newValue, oldValue) {
      newValue !== oldValue && this.group()
    },
    relations(value) {
      Object.assign(this.relations, value) && this.group()
    }
  },
  methods: {
    group() {
      this.navs.friends.data = this.relations.filter((el) => el.relationship.status === 1)
      this.navs.newFriends.data = this.relations.filter((el) => el.relationship.status === 0)
    }
  },
}
</script>

<style lang="scss">
.relations-friend {
  flex: 1;
  min-height: inherit;

  &__nav {
    position: sticky;
    top: 15px;
    z-index: 10;
    display: flex;
    align-items: center;
    height: 60px;
    background-color: #ecf0f3;

    .item {
      height: 100%;
      padding: 0 20px;
      color: #999;
      line-height: 60px;
      cursor: pointer;
      transition: all .3s;

      &.active {
        color: #333;
        background-color: #fff;
      }
    }
  }

  &__content {
    height: calc(100% - 60px);
    background-color: #fff;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    .relations-users {
      .friends {
        i {
          font-size: 22px;
          color: #999;
          cursor: pointer;
          margin-right: 15px;

          &:hover {
            color: #333;
          }
        }
      }
    }
  }
}
</style>