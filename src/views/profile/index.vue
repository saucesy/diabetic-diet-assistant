<template>
  <div class="profile px-4 pt-4 pt-md-5 pb-4">
    <div class="container" v-if="profile">
      <!-- avatar -->
      <div class="d-flex justify-content-center align-items-center mb-4">
        <!-- uses bootstrap image -->
        <b-img v-if="profile.avatar_url" :src="profile.avatar_url" style="object-fit: cover; cursor: pointer;"
               class="shadow" rounded="circle" width="100" height="100" @click="onAvatarClick"></b-img>
        <b-img v-else :src="require('@/assets/images/logo-blue.png')" style="cursor: pointer;" class="shadow"
               rounded="circle" width="100" height="100" @click="onAvatarClick"></b-img>

        <!-- choose avatar -->
        <!-- uses bootstrap input file -->
        <b-form-file class="avatar-upload" v-model="file" v-show="false" accept="image/*"></b-form-file>
      </div>

      <!-- lines -->
      <template v-for="item in sort">
        <!-- choose in sort -->
        <template v-if="item.key in profile">
          <!-- radio -->
          <!-- uses bootstrap grid system -->
          <b-row v-if="item.type === 'radio'" :key="item.key" class="mb-4">
            <b-col sm="3" class="d-inline-flex align-items-center mb-1 mb-md-0">
              <label :for="`type-${item.key}`"><span class="text-capitalize">{{ item.label }}</span>{{
                  item?.suffix
                }}</label>
            </b-col>
            <b-col sm="9">
              <!-- uses bootstrap radio group -->
              <b-radio-group class="d-flex" v-model="profile[item.key]">
                <b-radio class="flex-grow-1 profile-checkbox" v-for="radio in item.options" :value="radio.value"
                         :disabled="item.disabled ?? false">
                  {{ radio.label }}
                </b-radio>
              </b-radio-group>
            </b-col>
          </b-row>

          <!-- datepicker -->
          <!-- uses bootstrap grid system -->
          <b-row v-else-if="item.type === 'datepicker'" :key="item.key" class="mb-4">
            <b-col sm="3" class="d-inline-flex align-items-center mb-1 mb-md-0">
              <label :for="`type-${item.key}`"><span class="text-capitalize">{{ item.label }}</span>{{
                  item?.suffix
                }}</label>
            </b-col>
            <b-col sm="9">
              <!-- uses bootstrap datepicker -->
              <b-datepicker :id="`type-${item.key}`" :locale="$store.getters.locale" v-model="profile[item.key]"
                            :disabled="item.disabled ?? false"></b-datepicker>
            </b-col>
          </b-row>

          <!-- input -->
          <!-- uses bootstrap grid system -->
          <b-row v-else :key="item.key" class="mb-4">
            <b-col sm="3" class="d-inline-flex align-items-center mb-1 mb-md-0">
              <label :for="`type-${item.key}`"><span class="text-capitalize">{{ item.label }}</span>{{
                  item?.suffix
                }}</label>
            </b-col>
            <b-col sm="9">
              <!-- uses bootstrap input -->
              <b-form-input :id="`type-${item.key}`" :type="item.type" v-model="profile[item.key]"
                            :disabled="item.disabled ?? false">
              </b-form-input>
            </b-col>
          </b-row>
        </template>
      </template>

      <!-- update profile -->
      <div class="d-flex justify-content-center align-items-center mt-5" v-if="!othersID">
        <!-- uses bootstrap button -->
        <b-button variant="primary" pill @click="updateProfile(profile)">{{ $t('profile.update') }}</b-button>
      </div>

      <!-- update relative's remark -->
      <div class="d-flex justify-content-center align-items-center mt-5" v-else-if="profile.hasOwnProperty('remark')">
        <!-- uses bootstrap button -->
        <b-button variant="primary" pill @click="updateRemark">{{ $t('profile.updateRemark') }}</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import {getSelfProfile, updateProfile, getProfile} from '@/api/user';
import {uploadImage} from '@/api/file';
import {editRemark} from '@/api/relationship';
import {inputSort} from '@/views/profile/props';
import {i18n} from "@/i18n";

export default {
  name: 'Profile',
  data() {
    return {
      // whether show others profile
      othersID: null,
      // relationship data
      relationship: null,
      // profile data
      profile: null,
      // chose avatar
      file: null,
      // input sort
      sort: inputSort
    };
  },
  created() {
    // get show id
    this.othersID = this.$route.params.othersID ?? null;
  },
  mounted() {
    // get others profile
    if (this.othersID) {
      // disable all form
      this.sort.forEach(item => {
        if (item.key !== 'remark') item.disabled = true;
      });
      getProfile(this.othersID).then(res => {
        // show remark when has relationship
        const rela = this.relationship = res.data.relationship;
        if (rela.relative && rela.status === 1) {
          res.data.remark = rela.remark;
        }
        delete res.data.relationship;

        this.profile = res.data;
      }).catch(res => {
        // uses element-ui message
        this.$message.error(res.msg);
      });
    }
    // get self profile
    else {
      getSelfProfile()
          .then(res => this.profile = res.data)
          .catch(res => {
            // uses element-ui message
            this.$message.error(res.msg);
          });
    }
  },
  methods: {
    /**
     * update profile
     *
     * @param profile
     */
    updateProfile(profile = this.profile) {
      if (profile) {
        updateProfile(profile)
            // uses element-ui message
            .then(res => this.$message.success(i18n.t('message.updateSuccess')))
            .catch(res => this.$message.error(res.msg));
      }
    },

    /**
     * update remark
     */
    updateRemark() {
      if (this.profile.remark === null) {
        // uses element-ui message
        this.$message.error('Please input remark');
        return;
      }

      const data = {
        id: this.relationship.id,
        remark: this.profile.remark.trim()
      };

      // uses element-ui message
      editRemark(data).then(res => this.$message.success(i18n.t('message.updateSuccess')));
    },

    /**
     * choose image
     */
    onAvatarClick() {
      if (!this.othersID) {
        document.querySelector('.avatar-upload .custom-file-input').click();
      }
    }
  },
  watch: {
    /**
     * upload avatar when chose
     *
     * @param file
     */
    file(file) {
      if (file) {
        uploadImage(file)
            .then(res => {
              this.profile.avatar_url = res.data.url;
              // update profile
              this.updateProfile({avatar: res.data.upload_url});
            })
            // uses element-ui message
            .catch(res => this.$message.error('Upload error!'));
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.profile {
  min-height: calc(100vh - 60px);
  background-color: #FFF;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);

  & > div {
    max-width: 700px;
  }
}

@media (min-width: 1000px) {
  .profile {
    min-height: calc(100vh - 30px);
  }
}
</style>

<style lang="scss">
.profile-checkbox {
  label {
    cursor: pointer;
    font-weight: normal;
    font-size: 0.9rem;
    display: inline;
  }
}
</style>