import Vue from "vue";
import axios from 'axios';

const previews = {
  props: ['projects', 'currentProject'],
  template: '#projects-previews',
}

const btns = {
  template: '#projects-btns',
  methods: {
    slide(direction) {
      this.$emit('slide', direction);
    },
  },
};

const tags = {
  props: ['tags'],
  template: '#projects-tags',
}

const description = {
  props: ['currentProject'],
  template: '#projects-content',
  components: {tags},
  computed: {
    tagsAll() {
      return this.currentProject.techs.split(',');
    }
  }
}

const display = {
  props: ['currentProject', 'projects', 'currentNumber'],
  template: '#projects-display',
  components: {previews, btns},
  computed: {
    limitSliderLength() {
      const projects = [...this.projects];
      return projects.slice(0, 4);
    }
  }
};

new Vue({
  el: '#projects-component',
  template: '#projects-container',
  components: {display, description},
  data() {
    return {
      projects: [],
      currentNumber: 0
    }
  },
  computed: {
    currentProject() {
      return this.projects[0];
    },
  },
  watch: {
    currentNumber(value) {
      this.makeLoop(value);
    },
  },
  methods: {
    makeLoop(index) {
      const projectNumber = this.projects.length - 1;
      if (index < 0) this.currentNumber = projectNumber;
      if (index > projectNumber) this.currentNumber = 0;
    },
    getImages(data) {
      return data.map(item => {
        const gottenImages = require(`../images/content/${item.img}`).default;
        item.img = gottenImages;
        return item
      }) ;
    },
    slide(direction) {
      const lastSlide = this.projects[this.projects.length - 1];
      switch (direction) {
        case 'next':
          this.projects.push(this.projects[0]);
          this.projects.shift();
          this.currentNumber++;
          break;
        case 'prev':
          this.projects.unshift(lastSlide);
          this.projects.pop();
          this.currentNumber--;
          break;
      }
    },
  },
  created() {
    const data = require('../data/projects.json');
    this.projects = this.getImages(data);
  }

  // async created() {
  //   try {
  //     const response = await axios.get('https://webdev-api.loftschool.com/works/369');
  //     this.projects = response.data;
  //   } catch(error) {
  //     console.log('ошибка')
  //   }
  // }
})