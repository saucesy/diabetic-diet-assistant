<template>
  <div class="relations-search">
    <div class="relations-search__header">
      <!-- uses element-ui input -->
      <el-input prefix-icon="el-icon-search" :placeholder="$t('relations.searchUser')" clearable v-model="searchValue" size="small"/>
    </div>
    <div class="relations-search__content">
      <relations-users :users="users">
        <template #default="{user}">
          <div class="friends" v-if="user.relationship.status === 1">
            <i class="el-icon-pie-chart" @click="$emit('jump', `/charts/${user.id}`)"></i>
            <i class="el-icon-date" @click="$emit('jump', `/calender/${user.id}`)"></i>
          </div>
          <div class="new-friends" v-else>
            <template v-if="user.relationship.relative">
              <!-- waiting -->
              <div class="applicant" v-if="user.relationship['applicant']">
                <el-link :underline="false" type="info">{{ $t('relations.waitingFor') }}</el-link>
              </div>
              <!-- options -->
              <div class="not-applicant" v-else>
                <!-- uses element-ui button -->
                <el-button plain size="small" type="danger" @click="$emit('refuse', user.relationship.id)">{{ $t('relations.refuse') }}</el-button>
                <el-button plain size="small" @click="$emit('agree', user.relationship.id)">{{ $t('relations.agree') }}</el-button>
              </div>
            </template>
            <template v-else>
              <!-- uses element-ui button -->
              <el-button plain size="small" @click="onAdd(user)">{{ $t('relations.add') }}</el-button>
            </template>
          </div>
        </template>
      </relations-users>
      <!-- uses element-ui empty -->
      <el-empty :description="$t('relations.noData')" v-if="!users.length"/>
    </div>
  </div>
</template>

<script>
import {searchByEmail} from '@/api/user'
import RelationsUsers from '@/views/relations/child/users'
import {addRelation} from '@/api/relationship'
import {i18n} from "@/i18n";

export default {
  name: 'RelationsSearch',
  components: {
    RelationsUsers,
  },
  data() {
    return {
      users: [],
      timer: null,
      searchValue: '',
    }
  },
  watch: {
    searchValue(newValue, oldValue) {
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.timer = null
        this.onSearchUser(newValue)
      }, 200)
    },
  },
  methods: {
    onSearchUser(value) {
      if(!value.trim()) return this.users = []
      searchByEmail(value).then((res) => this.users = res.data)
    },

    onAdd(user) {
      addRelation({invitee_id: user.id}).then(() => {
        // uses element-ui notify
        this.$notify.success(i18n.t('message.applySuccess'))
        user.relationship.relative = true
        user.relationship['applicant'] = true
      })
    },
  },
}
</script>

<style lang="scss">
.relations-search {
  width: 40%;

  &__header {
    position: sticky;
    top: 15px;
    z-index: 10;
    height: 60px;
    line-height: 60px;
    padding: 0 15px;
    background-color: #fff;
    border-bottom: 1px solid #ecf0f3;
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