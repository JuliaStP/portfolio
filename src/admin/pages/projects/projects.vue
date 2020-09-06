<template lang="pug">
  .works-section
    .container
      .header
        h2.title Блок «Работы»
    .works
      .container.container--phone
        add-work(v-if="emptyFormVisible === true" )
        ul.works
          li.works__item
            button.add-button(
            @click="emptyFormVisible = true")
              .add-button__icon
              .add-button__text Добавить работу
          li.works__item(v-for="project in projects" :key='project.id' v-if="emptyFormVisible") 
            card-work(:project='project')
</template>

<script>
import addWork from '../../components/addWork';
import cardWork from '../../components/cardWork';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    cardWork,
    addWork
  },
  data() {
    return {
      emptyFormVisible: false
    }
  },
  computed: {
    ...mapState("projects", {
      projects: (state) => state.data,
    }),
  },
  methods: {
    ...mapActions({
      fetchProjects: "projects/fetch"
    }),
  },
  mounted() {
    this.fetchProjects();
  },
};
  
</script>

<style lang="pcss" scoped src='./projects.pcss'></style>