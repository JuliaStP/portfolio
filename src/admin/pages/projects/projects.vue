<template lang="pug">
  .works-section
    .container
      .header
        h2.title Блок «Работы»
    .works
      .container.container--phone
        .project-row(v-if="emptyFormVisible")
          add-work(
            :project='project'
            :currentProject='currentProject'
            @cancel="emptyFormVisible = false"
            @handleSubmit="emptyFormVisible = false"
            )
        .project-row
          ul.works
            li.works__item
              button.add-button(
              @click="emptyFormVisible = true")
                .add-button__icon
                .add-button__text Добавить работу
            li.works__item(v-for="project in projects" :key='project.id') 
              card-work(
                :project='project'
                :currentProject='currentProject'
                @remove-project='removeProject(project.id)'
                @open-project='openProject(project)'
                @edit-project='editProject(project.id)'
                )
</template>

<script>
import addWork from '../../components/addWork';
import cardWork from '../../components/cardWork';
import { mapActions, mapState } from 'vuex';

export default {
  props: {
    project: {
      type: Object,
      default: () => {}
    },
    currentProject: {
      type: Object
    },
  },
  components: {
    cardWork,
    addWork
  },
  data() {
    return {
      emptyFormVisible: false,
      editMode: false,
      // project: {
      //   title: '',
      //   link: '',
      //   description: '',
      //   techs: '',
      //   photo: ''
      // }
    }
  },
  computed: {
    ...mapState("projects", {
      projects: (state) => state.data,
    }),
  },
  methods: {
    ...mapActions({
      showTooltip: 'tooltips/show',
      fetchProjects: "projects/fetch",
      removeProjectAction: "projects/remove",
      editProjectAction: "projects/edit"
    }),

    removeProject(projectId) {
      this.removeProjectAction(projectId);
      this.showTooltip({
        text: 'Проект удален',
        type: "error"
      });
    },
    openProject(projectId) {
      this.emptyFormVisible = true;

      console.log(projectId);
    },
    async editProject(projectId, projectTitle, projectLink, projectDescription, projectText) {
      const newPro = {
        id: projectId,
        title: projectTitle,
        link: projectLink,
        description: projectDescription,
        text: projectText,
      }
      await this.editProjectAction(newPro);
    }
  },
  mounted() {
    this.fetchProjects();
  },
};
  
</script>

<style lang="pcss" scoped src='./projects.pcss'></style>