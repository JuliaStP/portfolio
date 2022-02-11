import Vue from "vue";

const skillsItem = {
  props: ['skill'],
  template: '#skill-item',
  methods: {
    createOrangeCircle() {
      const circle = this.$refs['orange-circle'];
      const circleLine = parseInt(
        getComputedStyle(circle).getPropertyValue('stroke-dasharray')
      );

      const percent = (circleLine / 100) * (100 - this.skill.percent);

      circle.style.strokeDashoffset = percent;
    },
  },
  mounted() {
    this.createOrangeCircle();
  },
};

const skillsRow = {
  props: ['category'],
  template: '#skill-row',
  components: {
    skillsItem,
  },
};

new Vue({
  el: '#skills-component',
  template: '#skills-list',
  components: {
    skillsRow,
  },
  data() {
    return {
      skills: []
    }
  },
  created() {
    this.skills = require('../data/skills.json');
  }
});