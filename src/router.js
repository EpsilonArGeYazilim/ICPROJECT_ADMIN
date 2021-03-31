import Vue from "vue";
import VueRouter from "vue-router";

import Login from "./components/Login.vue";
import Homepage from "./components/Homepage.vue";
import Category from "./components/Category.vue";
import CreateColor from "./components/CreateColor.vue";
import CreateImage from "./components/CreateImage.vue";

import store from "./store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "anasayfa",
    component: Homepage,

    beforeEnter(to, from, next) {
      if (store.getters.isLogin) {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/anasayfa",
    name: "anasayfa",
    component: Homepage,

    beforeEnter(to, from, next) {
      if (store.getters.isLogin) {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter(to, from, next) {
      if (store.getters.isLogin) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: "/category",
    name: "category",
    component: Category
  },
  {
    path: "/renk_olustur",
    name: "renk_olustur",
    component: CreateColor
  },
  {
    path: "/resim_yukle",
    name: "resim_yukle",
    component: CreateImage
  }
];
export const router = new VueRouter({
  mode: "hash",
  base: "/",
  routes
});
