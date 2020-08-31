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
            <category 
              :category="category"
              :title="category.category" 
              :skills="category.skills"
              
              @remove-category ='removeCategory'
              @create-skill='createSkill($event, category.id)'
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
import skill from '../../components/skill';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    iconedButton: button,
    category,
    skill
  },
  data() {
    return {
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
      editCategoryAction: "categories/edit",
      removeCategoryAction: "categories/remove",
      addSkillAction: "skills/add",
      editSkillAction: "skills/edit",
      removeSkillAction: "skills/remove"
    }),
    async createSkill(skill, categoryId) {
      const newSkill = {
        ...skill,
        category: categoryId
      }
      await this.addSkillAction(newSkill);
      skill.title = '';
      skill.percent = '';
    },
    async editSkill(skill){
      await this.editSkillAction(skill);
      skill.editMode = false;
    },
    removeSkill(skill){
      this.removeSkillAction(skill);
    },
    async createCategory(categoryTitle) {
      try {
        await this.createCategoryAction(categoryTitle);
        this.emptyCategoryVisible = false;
      } catch (error) {
        console.log(error.message);
      }
    },
    // editCategory(category){
    //   console.log('edit');
    // },
    removeCategory(categoryToRemove) {
       this.removeCategoryAction(categoryToRemove);
      // console.log(categoryToRemove);
    }
  },
  created() {
    this.fetchCategoryAction();
  }
};

</script>

<style lang="postcss" scoped src='./about.pcss'></style>