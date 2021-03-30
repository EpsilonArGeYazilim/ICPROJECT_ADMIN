import Vue from "vue";
import VueRouter from "vue-router";

import Login from "./components/Login.vue";
import Homepage from "./components/Homepage.vue";
import Category from "./components/Category.vue";
import ImageUpload from "./components/ImageUpload.vue";
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
    path: "/image_upload",
    name: "image_upload",
    component: ImageUpload
  },
  {
    path: "/create_image",
    name: "create_image",
    component: CreateImage
  }
];
export const router = new VueRouter({
  mode: "hash",
  base: "/",
  routes
});
