<template>
  <div class="login">
    <div class="login-bg"></div>
    <!-- uses bootstrap container -->
    <b-container>
      <!-- uses bootstrap grid system -->
      <b-row class="justify-content-center align-items-center min-vh-100">
        <b-col lg="6" md="9">
          <b-card no-body class="border-0 shadow-lg my-5 login-card">
            <!-- uses vue transition-group -->
            <TransitionGroup name="fade-move" mode="out-in" tag="div">
              <!-- login -->
              <div v-show="current === 0" key="login">
                <!-- uses bootstrap card -->
                <b-card-body class="p-5">
                  <h3 class="text-center mb-4 fw-normal">{{ $t('sign.loginTitle') }}</h3>

                  <!-- form -->
                  <!-- uses bootstrap form -->
                  <b-form class="py-2">
                    <!-- Username -->
                    <b-input
                        class="rounded-pill fs-6"
                        v-model="username"
                        trim
                        :placeholder="$t('profile.username')"
                        required
                        @blur="showError.username = true"
                        size="lg"
                    >
                    </b-input>
                    <div class="validate-line">
                      <b-form-invalid-feedback
                          :state="false"
                          :class="{
                          invisible: !showError.username || validation.username
                        }"
                      >
                        {{ $t('validator.username') }}
                      </b-form-invalid-feedback>
                    </div>

                    <!-- Password -->
                    <b-input
                        class="rounded-pill fs-6"
                        v-model="password"
                        trim
                        :placeholder="$t('profile.password')"
                        type="password"
                        required
                        @blur="showError.password = true"
                        size="lg"
                    >
                    </b-input>
                    <div class="validate-line">
                      <b-form-invalid-feedback
                          :state="false"
                          :class="{
                          invisible: !showError.password || validation.password
                        }"
                      >
                        {{ $t('validator.password') }}
                      </b-form-invalid-feedback>
                    </div>

                    <!-- Remember -->
                    <b-form-checkbox
                        v-model="remember"
                        class="
                        text-secondary
                        ms-1
                        user-select-none
                        login-checkbox
                      "
                    >
                      {{ $t('sign.remember') }}
                    </b-form-checkbox>
                  </b-form>

                  <!-- Confirm -->
                  <!-- uses bootstrap button -->
                  <b-button
                      block
                      variant="primary"
                      pill
                      class="mt-2 w-100 d-block"
                      @click="login"
                  >{{ $t('sign.login') }}</b-button
                  >

                  <!-- Link -->
                  <div class="text-center mt-3">
                    <!-- uses bootstrap link -->
                    <b-link
                        class="text-secondary option-link"
                        @click="changeTab(1)"
                    >{{ $t('sign.toRegister') }}</b-link
                    >
                  </div>
                </b-card-body>
              </div>

              <!-- register -->
              <div v-show="current == 1" key="register">
                <!-- uses bootstrap card -->
                <b-card-body class="p-5">
                  <h3 class="text-center mb-4 fw-normal">{{ $t('sign.registerTitle') }}</h3>

                  <!-- form -->
                  <!-- uses bootstrap form -->
                  <b-form class="py-2">
                    <!-- Username -->
                    <b-input
                        class="rounded-pill fs-6"
                        v-model="username"
                        trim
                        :placeholder="$t('profile.username')"
                        required
                        @blur="showError.username = true"
                        size="lg"
                    >
                    </b-input>
                    <div class="validate-line">
                      <b-form-invalid-feedback
                          :state="false"
                          :class="{
                          invisible: !showError.username || validation.username
                        }"
                      >
                        {{ $t('validator.username') }}
                      </b-form-invalid-feedback>
                    </div>

                    <!-- Email -->
                    <b-input
                        class="rounded-pill fs-6"
                        v-model="email"
                        trim
                        :placeholder="$t('profile.email')"
                        type="email"
                        required
                        @blur="showError.email = true"
                        size="lg"
                    >
                    </b-input>
                    <div class="validate-line">
                      <b-form-invalid-feedback
                          :state="false"
                          :class="{
                          invisible: !showError.email || validation.email
                        }"
                      >
                        {{ $t('validator.email') }}
                      </b-form-invalid-feedback>
                    </div>

                    <!-- Password -->
                    <b-input
                        class="rounded-pill fs-6"
                        v-model="password"
                        trim
                        :placeholder="$t('profile.password')"
                        type="password"
                        required
                        @blur="showError.password = true"
                        size="lg"
                    >
                    </b-input>
                    <div class="validate-line">
                      <b-form-invalid-feedback
                          :state="false"
                          :class="{
                          invisible: !showError.password || validation.password2
                        }"
                      >
                        {{ $t('validator.password') }}
                      </b-form-invalid-feedback>
                    </div>

                    <!-- Policy -->
                    <b-form-checkbox
                        v-model="policy"
                        class="text-secondary ms-1 user-select-none login-checkbox"
                    >
                      {{ $t('sign.policyStart') }}
                      <b-link class="option-link">{{ $t('sign.policy') }}</b-link>
                      {{ $t('sign.policyEnd') }}
                    </b-form-checkbox>
                    <!--<div class="validate-line">
                      <b-form-invalid-feedback :state="false"
                                               :class="{ 'invisible': !showError.policy || policy }">
                        Agree to Terms Privacy Policy first
                      </b-form-invalid-feedback>
                    </div>-->
                  </b-form>

                  <!-- Confirm -->
                  <!-- uses bootstrap button -->
                  <b-button
                      block
                      variant="primary"
                      pill
                      class="mt-2 w-100 d-block"
                      @click="register"
                  >{{ $t('sign.register') }}
                  </b-button>

                  <!-- Link -->
                  <div class="text-center mt-3">
                    <!-- uses bootstrap link -->
                    <b-link
                        class="text-secondary option-link"
                        @click="changeTab(0)"
                    >{{ $t('sign.toLogin') }}
                    </b-link>
                  </div>
                </b-card-body>
              </div>

              <!-- profile -->
              <div v-show="current == 2" key="profile">
                <!-- uses bootstrap card -->
                <b-card-body class="p-5">
                  <h3 class="text-center mb-4 fw-normal">{{ $t('sign.completeTitle') }}</h3>

                  <!-- form -->
                  <!-- uses bootstrap form -->
                  <b-form class="py-2">
                    <!-- Gender -->
                    <b-input
                        class="rounded-pill fs-6"
                        v-model="profile.gender"
                        trim
                        :placeholder="$t('profile.gender')"
                        type="text"
                        required
                        size="lg"
                    >
                    </b-input>

                    <!-- Timepicker -->
                    <b-datepicker
                        class="rounded-pill fs-6 mt-3"
                        v-model="profile.birthday"
                        :placeholder="$t('profile.birthday')"
                        :locale="$store.getters.locale"
                        size="lg"
                    ></b-datepicker>

                    <!-- Height -->
                    <b-input
                        class="rounded-pill fs-6 mt-4"
                        v-model.number="profile.height"
                        trim
                        :placeholder="`${$t('profile.height')}(cm)`"
                        type="number"
                        required
                        size="lg"
                    >
                    </b-input>

                    <!-- Weight -->
                    <b-input
                        class="rounded-pill fs-6 mt-4"
                        v-model.number="profile.weight"
                        trim
                        :placeholder="`${$t('profile.weight')}(kg)`"
                        type="number"
                        required
                        size="lg"
                    >
                    </b-input>
                  </b-form>

                  <!-- Confirm -->
                  <!-- uses bootstrap button -->
                  <b-button
                      block
                      variant="primary"
                      pill
                      class="mt-4 w-100 d-block"
                      @click="updateProfile"
                  >{{ $t('sign.update') }}
                  </b-button>
                  <b-button
                      block
                      variant="primary"
                      pill
                      class="mt-4 w-100 d-block"
                      @click="changeTab(0)"
                  >{{ $t('sign.skip') }}</b-button
                  >
                </b-card-body>
              </div>
            </TransitionGroup>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import store from '@/store'
import md5 from 'crypto-js/md5'
import { updateProfile } from '@/api/user'
import {sexOptions} from '@/views/login/props';
import {i18n} from "@/i18n";

export default {
  name: 'login',
  data() {
    return {
      // sex options
      sexOptions: sexOptions,

      // current tab
      current: 0,

      // login info
      username: '',
      password: '',
      email: '',
      remember: false,
      policy: false,

      // update profile
      profile: {
        gender: null,
        height: null,
        weight: null,
        birthday: null
      },

      // register user id
      userID: '',

      // show error
      showError: {
        username: false,
        password: false,
        email: false,
        policy: false
      }
    }
  },
  computed: {
    /**
     * verify whether the input content is legal
     *
     * @returns {{password: boolean, password2: boolean, email: boolean, username: boolean}}
     */
    validation() {
      return {
        username: this.username.length >= 4 && this.username.length <= 12,
        password: !!this.password.trim(),
        password2: this.password.length >= 6 && this.password.length <= 20,
        email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.email)
      }
    }
  },
  created() {
    // get tab
    this.current = parseInt(this.$route.params.tab ?? 0);
  },
  methods: {
    /**
     * change tabs
     *
     * @param index
     */
    changeTab(index) {
      this.current = index
      // reset
      if (index <= 1) {
        this.email = ''
        this.password = ''
        this.remember = false
        this.policy = false
        this.doValidate(false)
        this.profile = {
          gender: null,
          height: null,
          weight: null,
          birthday: null
        }
      }
    },

    /**
     * do validate
     *
     * @param show
     */
    doValidate(show = true) {
      for (const key in this.showError) {
        this.showError[key] = show
      }
    },

    /**
     * alert "Please complete the form"
     */
    alertComplete() {
      // uses element-ui message
      this.$message.warning(i18n.t('message.completeForm'))
    },

    /**
     * do login
     */
    login() {
      // validate
      this.doValidate()

      if (!this.validation.username || !this.validation.password) {
        this.alertComplete()
      }
      // login
      else {
        store
            .dispatch('login', {
              username: this.username,
              password: md5(this.password).toString(),
              remember: this.remember
            })
            .then(() => {
              // uses element-ui message
              this.$message.success(i18n.t('message.loginSuccess'))
              // to home
              setTimeout(() => this.$router.push({path: '/'}), 1000);
            })
      }
    },

    /**
     * do register
     */
    register() {
      // validate
      this.doValidate()

      if (
          !this.validation.username ||
          !this.validation.password2 ||
          !this.validation.email
      ) {
        this.alertComplete()
      } else if (!this.policy) {
        this.$message.warning(i18n.t('message.agreeToPolicyFirst'))
      }
      // register
      else {
        store
            .dispatch('register', {
              username: this.username,
              password: md5(this.password).toString(),
              email: this.email
            })
            .then((res) => {
              this.userID = res.data
              // uses element-ui message
              this.$message.success(i18n.t('message.registerSuccess'))
              // to profile tab
              setTimeout(() => this.changeTab(2), 1000)
            })
      }
    },

    /**
     * update profile
     */
    updateProfile() {
      // validate
      if (typeof this.profile.height === 'number' && this.profile.height < 0) {
        // uses element-ui message
        this.$message.error(i18n.t('message.heightMustGe0'))
      } else if (typeof this.profile.weight === 'number' && this.profile.weight < 0) {
        // uses element-ui message
        this.$message.error(i18n.t('message.weightMustGe0'))
      } else {
        const profile = {}
        for (const key in this.profile) {
          if (this.profile[key] !== null) profile[key] = this.profile[key]
        }
        // no data
        if (Object.keys(profile).length === 0) {
          this.alertComplete()
        }
        // update profile
        else {
          updateProfile(profile, {
            Authorization: this.userID
          })
              .then((res) => {
                // uses element-ui message
                this.$message.success(i18n.t('message.updateSuccess'))
                // to login tab
                setTimeout(() => this.changeTab(0), 1000)
              })
              .catch((res) => {
                // uses element-ui message
                this.$message.error(res.msg)
              })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  min-height: 100vh;
  position: relative;
}

.login-bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(../../assets/images/health-background.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right;
  filter: blur(6px);
  background-color: #80c2d0;
}

.login-card {
  min-height: 500px;
}

.option-link {
  text-decoration: none;
  font-size: 0.875rem;

  &:hover {
    text-decoration: underline;
  }
}

.validate-line {
  height: 1.65rem;
  padding-left: 0.25rem;
  font-size: 0.925rem;
}
</style>

<style lang="scss">
.login {
  .login-checkbox {
    label {
      cursor: pointer;
      font-weight: normal;
      font-size: 0.9rem;
      display: inline;
    }
  }
}
</style>