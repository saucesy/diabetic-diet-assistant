<template>
  <div class="profile px-4 pt-4 pt-md-5 pb-4">
    <div class="container" v-if="profile">
      <!-- avatar -->
      <div class="d-flex justify-content-center align-items-center mb-4">
        <b-img v-if="profile.avatar_url" :src="profile.avatar_url" style="object-fit: cover" rounded="circle"
               width="100" height="100"></b-img>
        <b-img v-else :src="require('@/assets/images/logo-blue.png')" rounded="circle" width="100"
               height="100"></b-img>

        <!-- choose avatar -->
        <b-form-file v-model="file" v-show="false" ></b-form-file>
      </div>

      <!-- lines -->
      <template v-for="item in sort">
        <template v-if="item.key in profile">
          <!-- radio -->
          <b-row v-if="item.type === 'radio'" :key="item.key" class="mb-4">
            <b-col sm="3" class="d-inline-flex align-items-center mb-1 mb-md-0">
              <label class="text-capitalize" :for="`type-${item.key}`">{{ item.key }}</label>
            </b-col>
            <b-col sm="9">
              <b-radio-group class="d-flex" v-model="profile[item.key]">
                <b-radio class="flex-grow-1 profile-checkbox" v-for="radio in item.options" :value="radio.value"
                         :disabled="item.disabled ?? false">
                  {{ radio.label }}
                </b-radio>
              </b-radio-group>
            </b-col>
          </b-row>

          <!-- datepicker -->
          <b-row v-else-if="item.type === 'datepicker'" :key="item.key" class="mb-4">
            <b-col sm="3" class="d-inline-flex align-items-center mb-1 mb-md-0">
              <label class="text-capitalize" :for="`type-${item.key}`">{{ item.key }}</label>
            </b-col>
            <b-col sm="9">
              <b-datepicker :id="`type-${item.key}`" locale="en" v-model="profile[item.key]"
                            :disabled="item.disabled ?? false"></b-datepicker>
            </b-col>
          </b-row>

          <!-- input -->
          <b-row v-else :key="item.key" class="mb-4">
            <b-col sm="3" class="d-inline-flex align-items-center mb-1 mb-md-0">
              <label class="text-capitalize" :for="`type-${item.key}`">{{ item.key }}</label>
            </b-col>
            <b-col sm="9">
              <b-form-input :id="`type-${item.key}`" :type="item.type" v-model="profile[item.key]"
                            :disabled="item.disabled ?? false">
              </b-form-input>
            </b-col>
          </b-row>
        </template>
      </template>

      <!-- update -->
      <div class="d-flex justify-content-center align-items-center mt-5">
        <b-button variant="primary" pill @click="updateProfile">Update</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import {sexOptions} from '@/views/login/props';
import {getSelfProfile, updateProfile} from '@/api/user';
import {uploadImage} from '@/api/file';

export default {
  name: 'Profile',
  data() {
    return {
      profile: null,
      // choose avatar
      file: null,
      sort: [
        {
          key: 'username',
          readonly: true,
          type: 'text',
          disabled: true
        },
        {
          key: 'email',
          readonly: false,
          type: 'email'
        },
        {
          key: 'birthday',
          readonly: false,
          type: 'datepicker'
        },
        {
          key: 'height',
          readonly: false,
          type: 'number'
        },
        {
          key: 'weight',
          readonly: false,
          type: 'number'
        },
        {
          key: 'gender',
          readonly: false,
          type: 'radio',
          options: sexOptions
        }
      ]
    };
  },
  mounted() {
    // get profile
    getSelfProfile()
        .then(res => this.profile = res.data)
        .catch(res => this.$message.error(res.msg));
  },
  methods: {
    // update profile
    updateProfile(profile = this.profile) {
      if (profile) {
        updateProfile(profile)
            .then(res => this.$message.success('Update Success'))
            .catch(res => this.$message.error(res.msg));
      }
    }
  },
  watch: {
    // upload avatar
    file(file) {
      if (file) {
        uploadImage(file)
            .then(res => {
              this.profile.avatar_url = res.data.url;
              // update profile
              this.updateProfile({avatar: res.data.upload_url});
            })
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