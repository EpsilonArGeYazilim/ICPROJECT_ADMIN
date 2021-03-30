<template>
  <div>
    <Header />
    <main class="app-content">
      <div class="app-title">
        <div>
          <h1><i class="fa fa-dashboard"></i> Kategori Oluştur</h1>
        </div>
        <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item"><a href="/anasayfa">anasayfa</a></li>
        </ul>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="tile">
            <h3 class="tile-title">Kategori Ekle</h3>
            <div class="tile-body">
              <form>
                <div class="form-group">
                  <label class="control-label">Kategori Adı:</label>
                  <input
                    v-model="result.category_name"
                    class="form-control"
                    type="text"
                    placeholder="Kategori Adı"
                  />
                </div>
                <div class="form-group">
                  <label class="control-label">Alt Kategori Adı:</label>
                  <input
                    v-model="result.sub1_name"
                    class="form-control"
                    type="text"
                    placeholder="Alt Kategori Adı"
                  />
                </div>
                <div class="form-group">
                  <label class="control-label">2.Alt Kategori Adı:</label>
                  <input
                    v-model="result.sub2_name"
                    class="form-control"
                    type="text"
                    placeholder="2.Alt Kategori Adı"
                  />
                </div>
              </form>
            </div>
            <div class="tile-footer">
              <button @click="sendData()" class="btn btn-primary" type="button">
                <i class="fa fa-fw fa-lg fa-check-circle"></i>Kaydet</button
              >&nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </div>
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
        category_name: "",
        sub1_name: "",
        sub2_name: "",
      },
      category: [],
      subcategory: []
    };
  },

 

  methods: {
    reload: function () {
      location.reload();
    },
    sendData: function () {
      var url = store.state.base_url + "Category/createCategory.php?key=123";

      var datas = {
        category_name: this.result.category_name,
        sub1_name: this.result.sub1_name,
        sub2_name: this.result.sub2_name,
      };

      axios
        .post(url, JSON.stringify(datas))
        .then((response) => {
          if (response.data.result == true) {
            window.location.href='/#/renk_olustur';
          }
          //conso.log(response);
        })
        .catch((error) => {
          //conso.log(error.response);
        });
    },
  },
};
</script>