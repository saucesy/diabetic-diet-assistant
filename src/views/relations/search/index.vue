<template>
  <div class="relations-search">
    <div class="relations-search__header">
      <el-input prefix-icon="el-icon-search" placeholder="search user" clearable v-model="searchValue" size="small"/>
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
              <div class="applicant" v-if="user.relationship['applicant']">
                <el-link :underline="false" type="info"> Waiting for validation</el-link>
              </div>
              <div class="not-applicant" v-else>
                <el-button plain size="small" @click="$emit('agree', user.relationship.id)"> Agree</el-button>
                <el-button plain size="small" type="danger" @click="$emit('refuse', user.relationship.id)"> Refuse
                </el-button>
              </div>
            </template>
            <template v-else>
              <el-button plain size="small" @click="onAdd(user)"> add</el-button>
            </template>
          </div>
        </template>
      </relations-users>
      <el-empty description="No Data..." v-if="!users.length"/>
    </div>
  </div>
</template>

<script>
import {searchByEmail} from '@/api/user'
import RelationsUsers from '@/views/relations/child/users'
import {addRelation} from '@/api/relationship'

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
      addRelation({invitee_id: user.id}).then(() =>
          this.$notify.success('send success！')
          && (user.relationship.relative = true, user.relationship['applicant'] = true),
      )
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