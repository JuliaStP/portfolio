<template>
  <div class="about-component">  
    <div class="main-content">
      <div class="container" v-if="categories.length">
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
            <category 
              @remove='emptyCategoryVisible = false'
              @approve='createCategory' 
              empty />
          </li>
          <li class="item" v-for="category in categories" :key='category.id'>
            <category :title="category.name" :skills="category.skills" 
              @create-skill='createSkill'
              @edit-skill='editSkill'
              @remove-skill='removeSkill'/>
          </li>
        </ul>
      </div>
      <div class="container" v-else> Loading, please wait</div>
    </div>
  </div>
</template>

<script>

import button from '../../components/button';
import category from '../../components/category';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    iconedButton: button,
    category
  },
  data() {
    return {
      // categories: [],
      emptyCategoryVisible: false,
    };
  },
  computed: {
    ...mapState("categories",{
      categories: state => state.data
    })
  },
  methods: {
    ...mapActions({
      createCategoryAction: "categories/create",
      fetchCategoryAction: "categories/fetch",
      addSkillAction: "skills/add",
      editSkillAction: "skills/edit",
      removeSkillaction: "skills/remove"
    }),
    createSkill(){
      this.addSkillAction();
    },
    editSkill(){
      this.editSkillAction();
    },
    removeSkill(){
      this.removeSkillAction();
    },
    async createCategory(categoryTitle) {
      try {
        await this.createCategoryAction(categoryTitle);
        this.emptyCategoryVisible = false;
      } catch (error) {
        console.log(error.message);
      }
    }
  },
  created() {
    this.fetchCategoryAction();
    // this.categories = require('../../data/categories.json')
  }
};

</script>

<style lang="postcss" scoped src='./about.pcss'></style>