<template>
  <div class="about-component">
    
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

import button from '../../components/button';
import category from '../../components/category';

export default {
  components: {
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
    this.categories = require('../../data/categories.json')
  }
};

</script>

<style lang="postcss" scoped src='./about.pcss'></style>