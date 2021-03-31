<template>
  <div>
    <Header />

    <main class="app-content">
      <div class="app-title">
        <div>
          <h1><i class="fa fa-dashboard"></i> ANASAYFA</h1>
        </div>
        
            <a href="/login" @click.prevent="logout"
              ><i class="fa fa-sign-out fa-lg"></i> Çıkış</a>
         
      </div>        

      <div class="row">
        <li class="btn btn-primary btn-block">
          <router-link class="app-menu__item" to="/category" tag="a">
            <span class="app-menu__label">Kategori Oluştur</span>
          </router-link>
        </li>
        <li class="btn btn-primary btn-block">
          <router-link class="app-menu__item" to="/renk_olustur" tag="a">
            <span class="app-menu__label">Renk Oluştur</span>
          </router-link>
        </li>
        <li class="btn btn-primary btn-block">
          <router-link class="app-menu__item" to="/resim_yukle" tag="a">
            <span class="app-menu__label">Resim Yükle</span>
          </router-link>
        </li>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
export default {
  data() {
    return {
      result: {
        categories: {},
        company_references: {},
        gallery: {},
        news: {},
        notices: {},
        our_projects: {},
        our_projects_images: {},
        products: {},
        product_images: {},
        slider: {},
        team: {},
        users: {},
      },
    };
  },
  methods: {
            logout() {
                this.$store.dispatch("logout")
            }
        },
  onSubmit() {
    this.$store.dispatch("login", { ...this.user }).then((response) => {
      if (this.$store.state.loginResult) {
        this.result = "";
        location.reload();
      } else {
        this.result = "hatalı giriş bilgileri!!!";
      }
    });
  },
};
</script>