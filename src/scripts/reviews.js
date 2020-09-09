import Vue from "vue";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';
import axios from 'axios';

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
        loop: false,
        breakpoints: {
          480: {
            slidesPerView: 2
          }
        },
      },
      buttons: {
        prev: false,
        next: true
       }
    }; 
  },
  computed: {
    slider() {
      return this.$refs["slider"].$swiper
    }
  },
  methods: {
    // requireImg(data) {
    //   return data.map((item) => {
    //     const requiredImg = require(`../images/content/${item.img}`)
    //       .default;
    //     item.img = requiredImg;
    //     return item;
    //   });
    // },
    changeImagePath(reviews) {
      reviews.map((item) => {
        let newPath = `https://webdev-api.loftschool.com/${item.photo}`
        item.photo = newPath;
        return item;
      });
      return reviews;
    },
    slide(direction) {
      switch(direction) {
        case 'prev':
          this.slider.slidePrev()
        break;
        case 'next':
          this.slider.slideNext()
        break;
      }
    },
  },
  mounted() {
    this.slider.on("slideChange", (swiper) => {
      this.buttons.prev = !swiper.isBeginning;
      this.buttons.next = !swiper.isEnd;
    });
  },
  async created() {
    try {
      const { data } = await axios.get('/reviews/369');
      this.reviews = this.changeImagePath(data)
    } catch(error) {
      console.log('ошибка')
    }
  } 
});