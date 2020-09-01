<template lang="pug">
  .works-section
    .container
      h2.title Блок «Работы»
    .works-container
      .container.container--mobile
        add-work
        ul.works
          li.works__item
            button.add-button
              .add-button__icon
              .add-button__text Добавить работу
          li.works__item(v-for="project in projects") 
            card-work(:project='project')
</template>

<script>
import addWork from '../../components/addWork';
import cardWork from '../../components/cardWork';

export default {
  components: {
    cardWork,
    addWork
  },
  data() {
    return {
      projects: []
    }
  },
  methods : {
    requirePhotos() {
      this.projects = this.projects.map(project => {
        project.img = require(`../../../images/content/${project.img}`);
        return project
      })
    }
  },
  mounted() {
    this.requirePhotos();
  },
  created() {
    this.projects = require('../../../data/projects.json')
  }
}
  
</script>

<style lang="pcss" scoped src='./projects.pcss'></style>