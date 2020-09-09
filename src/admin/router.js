import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import store from "./store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    components: {
      default: () => import("./pages/about"),
      header: () => import("./components/header")
    },
  },
  {
    path: "/projects",
    components: {
      default: () => import("./pages/projects"),
      header: () => import("./components/header")
    },
  },
  {
    path: "/reviews",
    components: {
      default: () => import("./pages/reviews"),
      header: () => import("./components/header")
    },
  },
  {
    path: "/login",
    component: () => import("./pages/login"),
    meta: {
      public: true
    }
  },
];

const router = new VueRouter({ routes });

const guard = axios.create({
  baseURL: "https://webdev-api.loftschool.com/"
});

router.beforeEach(async (to, from, next) => {
  const isPublicRoute = to.matched.some(route => route.meta.public);
  const isUserLoggedIn = store.getters["user/userIsLoggedIn"];

  // next();
  // return;

  if (isPublicRoute === false && isUserLoggedIn === false) {
    const token = localStorage.getItem("token");

    guard.defaults.headers["Authorization"] = `Bearer ${token}`;

    try {
      const response = await guard.get("/user"); 
      store.dispatch("user/login", await response.data.user)
      next();
    } catch (error) {
      router.replace("/login");
      localStorage.removeItem("token"); 
    }
  } else {
    next();
  }
});

export default router;