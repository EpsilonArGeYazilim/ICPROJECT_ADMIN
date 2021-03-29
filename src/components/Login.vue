<template>
  <div>
    <section class="material-half-bg">
      <div class="cover"></div>
    </section>
    <section class="login-content">
      <div class="logo">
        <h1>Admin Panel</h1>
      </div>
      <div class="login-box">
        <form class="login-form" @submit.prevent="onSubmit">
          <h3 class="login-head">
            <i class="fa fa-lg fa-fw fa-user"></i>Kullanıcı Girişi
          </h3>

          <div class="form-group">
            <label class="control-label">E-MAIL ADRESİNİZ</label>
            <input
              v-model="user.username"
              class="form-control"
              type="text"
              placeholder="E-MAİL ADRESİNİZ"
              autofocus
            />
          </div>
          <div class="form-group">
            <label class="control-label">ŞİFRE</label>
            <input
              v-model="user.password"
              class="form-control"
              type="password"
              placeholder="ŞİFRE"
            />
          </div>

          <div class="form-group btn-container">
            <button type="submit" class="btn btn-primary btn-block">
              <i class="fa fa-sign-in fa-lg fa-fw"></i>GİRİŞ
            </button>
          </div>
          <p style="color: red">{{ result }}</p>
        </form>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  data() {
    return {
      user: {
        username: null,
        password: null,
      },
      result: null,
    };
  },
  methods: {
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
  },
};
</script>