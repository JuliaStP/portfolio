<template>
  <div class="login-component">
    <div class="popup-container">
      <form class="form" @submit.prevent="handleSubmit">
        <h4 class="popup-title">Авторизация</h4>
        <div class="popup-row">
          <app-input title="Login" icon="user" v-model="user.name" :errorMessage="validation.firstError('user.name')" />
        </div>
        <div class="popup-row">
          <app-input title="Password" icon="key" type="password" v-model="user.password" :errorMessage="validation.firstError('user.password')" />
        </div>
        <div class="popup-btn">
          <app-button :disabled='isLoginBtnDisabled' title="Отправить" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import{Validator, mixin as ValidatorMixin} from 'simple-vue-validator';
import axios from 'axios';

import appInput from '../../components/input';
import appButton from '../../components/button';

const baseUrl = "https://webdev-api.loftschool.com/";

export default {
  mixins: [ValidatorMixin],
  validators: {
    'user.name': value => {
      return Validator.value(value).required('Введите имя пользователя');
    },
    'user.password': value => {
      return Validator.value(value).required('Введите пароль');
    },
  },
  components: {
    appInput,
    appButton
  },
  data: () => ({
    user: {
      name:'',
      password: ''
    },
    isLoginBtnDisabled: false
  }),
  methods: {
    handleSubmit() {
      this.$validate().then((validated) => {
        if (validated === false) return;

        this.isLoginBtnDisabled = true;

        axios.post("https://webdev-api.loftschool.com/" + '/login', this.user).then(response => {
          const token = response.data.token;
          localStorage.setItem("token", token)
          axios.defaults.headers['Authorization'] = `Bearer ${token}`;
          this.$router.replace('/');
        })
        .catch((error) => console.log(error.response.data.error))
        .finally(() => {
          this.isLoginBtnDisabled = false;
        })
      });
    }
  }
};
</script>

<style lang="postcss" scoped src='./login.pcss'></style>