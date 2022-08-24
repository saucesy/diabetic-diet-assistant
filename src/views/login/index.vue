<template>
  <div class="login">
    <b-container>
      <b-row class="justify-content-center align-items-center min-vh-100">
        <b-col lg="6" md="9">
          <b-card no-body class="border-0 shadow-lg my-5 login-card">
            <TransitionGroup name="fade-move" mode="out-in" tag="div">
              <!-- login -->
              <div v-show="current == 0" key="login">
                <b-card-body class="p-5">
                  <h3 class="text-center mb-4 fw-normal">Welcome Back!</h3>

                  <!-- form -->
                  <b-form class="py-2">
                    <!-- Username -->
                    <b-input
                      class="rounded-pill fs-6"
                      v-model="username"
                      trim
                      placeholder="Username"
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
                        Username must be 4-12 characters long
                      </b-form-invalid-feedback>
                    </div>

                    <!-- Password -->
                    <b-input
                      class="rounded-pill fs-6"
                      v-model="password"
                      trim
                      placeholder="Password"
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
                        The password cannot be empty
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
                      Remember Me
                    </b-form-checkbox>
                  </b-form>

                  <!-- Confirm -->
                  <b-button
                    block
                    variant="primary"
                    pill
                    class="mt-2 w-100 d-block"
                    @click="login"
                    >Login</b-button
                  >

                  <!-- Link -->
                  <div class="text-center mt-3">
                    <b-link
                      class="text-secondary option-link"
                      @click="changeTab(1)"
                      >Create an Account</b-link
                    >
                  </div>
                </b-card-body>
              </div>

              <!-- register -->
              <div v-show="current == 1" key="register">
                <b-card-body class="p-5">
                  <h3 class="text-center mb-4 fw-normal">Create an Account!</h3>

                  <!-- form -->
                  <b-form class="py-2">
                    <!-- Username -->
                    <b-input
                      class="rounded-pill fs-6"
                      v-model="username"
                      trim
                      placeholder="Username"
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
                        Username must be 4-12 characters long
                      </b-form-invalid-feedback>
                    </div>

                    <!-- Email -->
                    <b-input
                      class="rounded-pill fs-6"
                      v-model="email"
                      trim
                      placeholder="Email"
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
                        Email format is incorrect
                      </b-form-invalid-feedback>
                    </div>

                    <!-- Password -->
                    <b-input
                      class="rounded-pill fs-6"
                      v-model="password"
                      trim
                      placeholder="Password"
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
                        Password must be 6-20 characters long
                      </b-form-invalid-feedback>
                    </div>

                    <!-- Policy -->
                    <b-form-checkbox
                      v-model="policy"
                      class="
                        text-secondary
                        ms-1
                        user-select-none
                        login-checkbox
                      "
                    >
                      I've read and agreed to
                      <b-link class="option-link">Privacy Policy</b-link>
                      .
                    </b-form-checkbox>
                    <!--<div class="validate-line">
                      <b-form-invalid-feedback :state="false"
                                               :class="{ 'invisible': !showError.policy || policy }">
                        Agree to Terms Privacy Policy first
                      </b-form-invalid-feedback>
                    </div>-->
                  </b-form>

                  <!-- Confirm -->
                  <b-button
                    block
                    variant="primary"
                    pill
                    class="mt-2 w-100 d-block"
                    @click="register"
                    >Register Account
                  </b-button>

                  <!-- Link -->
                  <div class="text-center mt-3">
                    <b-link
                      class="text-secondary option-link"
                      @click="changeTab(0)"
                      >Already have an account? Login!
                    </b-link>
                  </div>
                </b-card-body>
              </div>

              <!-- profile -->
              <div v-show="current == 2" key="profile">
                <b-card-body class="p-5">
                  <h3 class="text-center mb-4 fw-normal">Complete Profile!</h3>

                  <!-- form -->
                  <b-form class="py-2">
                    <!-- Gender -->
                    <b-form-group label="Gender:">
                      <b-radio-group
                        class="d-flex"
                        v-model="profile.gender"
                        size="lg"
                      >
                        <b-radio
                          class="flex-grow-1 text-secondary fs-6 login-checkbox"
                          v-for="item in sexOptions"
                          :value="item.value"
                        >
                          {{ item.label }}
                        </b-radio>
                      </b-radio-group>
                    </b-form-group>

                    <!-- Timepicker -->
                    <b-datepicker
                      class="rounded-pill fs-6 mt-3"
                      v-model="profile.birthday"
                      locale="en"
                      size="lg"
                    ></b-datepicker>

                    <!-- Height -->
                    <b-input
                      class="rounded-pill fs-6 mt-4"
                      v-model.number="profile.height"
                      trim
                      placeholder="Height(cm)"
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
                      placeholder="Weight(kg)"
                      type="number"
                      required
                      size="lg"
                    >
                    </b-input>
                  </b-form>

                  <!-- Confirm -->
                  <b-button
                    block
                    variant="primary"
                    pill
                    class="mt-4 w-100 d-block"
                    @click="updateProfile"
                    >Update
                  </b-button>
                  <b-button
                    block
                    variant="primary"
                    pill
                    class="mt-4 w-100 d-block"
                    @click="skipProfile"
                    >Skip</b-button
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

export default {
  name: 'login',
  data() {
    return {
      // sex options
      sexOptions: sexOptions,

      current: 0,

      // login info
      username: '',
      password: '',
      email: '',
      remember: false,
      policy: false,

      profile: {
        gender: 0,
        height: 0,
        weight: 0,
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
    validation() {
      return {
        username: this.username.length >= 4 && this.username.length <= 12,
        password: !!this.password.trim(),
        password2: this.password.length >= 6 && this.password.length <= 20,
        email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.email)
      }
    }
  },
  methods: {
    changeTab(index) {
      this.current = index
      if (index <= 1) {
        this.email = ''
        this.password = ''
        this.remember = false
        this.policy = false
        this.doValidate(false)
        this.profile = {
          gender: 0,
          height: 0,
          weight: 0,
          birthday: null
        }
      }
    },

    doValidate(show = true) {
      for (const key in this.showError) {
        this.showError[key] = show
      }
    },

    alertComplete() {
      this.$message.warning('Please complete the form')
    },

    login() {
      this.doValidate()

      if (!this.validation.username || !this.validation.password) {
        this.alertComplete()
      } else {
        store
          .dispatch('login', {
            username: this.username,
            password: md5(this.password).toString(),
            remember: this.remember
          })
          .then(() => {
            this.$message.success('Login success')
            setTimeout(() => this.$router.push({path: '/'}), 1000);
          })
      }
    },

    register() {
      this.doValidate()

      if (
        !this.validation.username ||
        !this.validation.password2 ||
        !this.validation.email
      ) {
        this.alertComplete()
      } else if (!this.policy) {
        this.$message.warning('Agree to Terms Privacy Policy first')
      } else {
        store
          .dispatch('register', {
            username: this.username,
            password: md5(this.password).toString(),
            email: this.email
          })
          .then((res) => {
            this.userID = res.data
            this.$message.success('Register success')
            setTimeout(() => this.changeTab(2), 1000)
          })
      }
    },

    updateProfile() {
      if (this.profile.height < 0) {
        this.$message.error('Height must be greater than 0')
      } else if (this.profile.weight < 0) {
        this.$message.error('Weight must be greater than 0')
      } else {
        updateProfile(this.profile, {
          Authorization: this.userID
        })
          .then((res) => {
            this.$message.success('Update success')
            setTimeout(() => this.changeTab(0), 1000)
          })
          .catch((res) => {
            this.$message.error(res.msg)
          })
      }
    },

    skipProfile() {
      this.changeTab(0)
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  min-height: 100vh;
  /*background-image: url(../../assets/images/health-background.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right;*/
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