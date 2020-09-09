import Vue from "vue";
import axios from 'axios';

axios.defaults.baseURL = "https://webdev-api.loftschool.com";

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
  async created() {
    try {
      const { data } = await axios.get('/categories/369');
      this.skills = data;
    } catch(error) {
      console.log('ошибка')
    }
  }
});