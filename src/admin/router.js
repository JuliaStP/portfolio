import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
import header from './components/header';
import about from './pages/about';
import login from './pages/login';
import projects from './pages/projects';
import reviews from './pages/reviews';

const routes = [
  {
    path: '/',
    components: {
      default: about,
      header: header,
    }, 
  },
  {
    path: '/login',
    component: login,
    // meta: { public: true }
  },
  {
    path: '/projects',
    components: {
      default: projects,
      header: header
    }
  },
  {
    path: '/reviews',
    components: {
      default: reviews,
      header: header
    }
  }
];

export default new VueRouter({ routes });

// const baseURL = 
// router.beforeEach((to, from, next) => {
//   const isPublicRoute = to.matched.some(record => record.meta.public)
// })