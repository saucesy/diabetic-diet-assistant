<template>
  <div class="relations-friend">
    <!--  nav  -->
    <nav class="relations-friend__nav">
      <div class="item"
           v-for="(_, key) of navList"
           @click="currentNavKey = key"
           :class="{'active': currentNavKey === key}"
           :key="key">
        <span class="single-omit">{{ key }}</span>
      </div>
    </nav>
    <!--  content  -->
    <div class="relations-friend__content">
      <relations-users :users="navList[currentNavKey]">
        <template #default="{ user }">
          <div class="friends" v-if="currentNavKey === 'Friends'">
            <i class="el-icon-pie-chart" @click="$emit('jump', `/charts/${user.id}`)"></i>
            <i class="el-icon-date" @click="$emit('jump', `/calender/${user.id}`)"></i>
          </div>
          <div class="new-friends" v-else>
            <div class="applicant" v-if="user.relationship['applicant']">
              <el-link :underline="false" type="info"> Waiting for validation</el-link>
            </div>
            <div class="not-applicant" v-else>
              <el-button plain size="small" @click="$emit('agree', user.relationship.id)"> Agree</el-button>
              <el-button plain size="small" type="danger" @click="$emit('refuse', user.relationship.id)"> Refuse</el-button>
            </div>
          </div>
        </template>
      </relations-users>
      <el-empty v-if="!navList[currentNavKey].length" description="No data."/>
    </div>
  </div>
</template>

<script>
import RelationsUsers from '@/views/relations/child/users'

const navList = {
  'Friends': [],
  'New Friends': [],
}
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
      navList,
      currentNavKey: 'Friends',
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
      this.navList.Friends = this.relations.filter((el) => el.relationship.status === 1)
      this.navList['New Friends'] = this.relations.filter((el) => el.relationship.status === 0)
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