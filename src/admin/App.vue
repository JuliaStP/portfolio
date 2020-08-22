<template>
  <div class="app-container">
    <headline title="Панель администрирования">
      <user /> 
    </headline>
    <navigation />
    <div class="main-content">
      <div class="container">
        <div class="header">
          <h2 class="title">Блок «Обо мне»</h2>
          <iconed-button 
            type="iconed" 
            v-if="emptyCategoryVisible === false" 
            @click="emptyCategoryVisible = true" 
            title="Добавить группу" />
        </div>
        <ul class="skills">
          <li class="item" v-if="emptyCategoryVisible">
            <category empty 
              @remove='emptyCategoryVisible = false' />
          </li>
          <li class="item" v-for="category in categories" :key='category.id'>
            <category :title="category.name" :skills="category.skills"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import headline from './components/headline';
import user from './components/user';
import navigation from './components/navigation';
import button from './components/button';
import category from './components/category';

export default {
  components: {
    headline,
    user,
    navigation, 
    iconedButton: button,
    category
  },
  data() {
    return {
      categories: [],
      emptyCategoryVisible: false
    }
  },
  created() {
    this.categories = require('./data/categories.json')
  }
};

</script>

<style lang='postcss'>
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');
  @import "normalize.css";
  @import "../styles/mixins.pcss";
  @import "../styles/layout/base.pcss";
</style>

<style lang='postcss' scoped src='./app.pcss'></style>