import Vue from "vue";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

new Vue({
  el: '#slider-component',
  template: '#slider-container',
  components: {
    Swiper, SwiperSlide
  },
  data() {
    return {
      reviews: [],
      sliderOptions: {
        slidesPerView: 1,
        breakpoints: {
          480: {
            slidesPerView: 2
          }
        },
        loop: true
      }
    } 
  },
  methods: {
    requireImg(data) {
      return data.map((item) => {
        const requiredImg = require(`../images/content/${item.img}`)
          .default;
        item.img = requiredImg;
        return item;
      });
    },
    slide(direction) {
      const slider = this.$refs["slider"].$swiper;
      switch(direction) {
        case 'left':
          slider.slidePrev()
        break;
        case 'right':
          slider.slideNext()
        break;
      }
    },
  },
  created() {
    const data = require('../data/reviews.json');
    this.reviews = this.requireImg(data)
  }
});