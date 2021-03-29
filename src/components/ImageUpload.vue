<template>
  <div>
    <Header />

    <main class="app-content">
      <div class="app-title">
        <div>
          <h1><i class="fa fa-dashboard"></i>Renk Oluştur</h1>
        </div>
        <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item"><a href="/anasayfa">anasayfa</a></li>
        </ul>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="tile">
            <h3 class="tile-title">Renk Oluştur</h3>
            <div class="tile-body">
              <form>
                <div class="form-group">
                  <label class="control-label">Kategori giriniz:</label>
                  <select @change="onChange($event)" name="deneme" id="deneme">
                    <option selected="true" value="0">Seçiniz</option>
                    <option
                      v-for="(item, index) in category"
                      :key="index"
                      :value="item.category_id"
                    >
                      {{ item.category_name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="control-label">Alt Kategori giriniz:</label>
                  <select
                    @change="onChangeSub($event)"
                    name="deneme"
                    id="deneme2"
                  >
                    <option selected="true">Seçiniz</option>
                    <option
                      v-for="(item, index) in sub_category"
                      :key="index"
                      :value="item.subcategory_id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                       <label class="control-label">Renk Adı: </label>   
                 <input type="text" id="colorname" >

                </div>
                <div class="form-group row">
                  <label class="control-label col-md-3">Resim Yükleme</label>
                  <div class="col-md-8">
                    <div
                      class="fileupload fileupload-new"
                      data-provides="fileupload"
                    >
                      <p style="color: red">{{ fileWarn }}</p>
                      <div class="row">
                        <div class="col-md-4">
                          <div
                            class="fileupload-preview fileupload-exists thumbnail"
                            style="
                              max-width: 200px;
                              max-height: 150px;
                              line-height: 20px;
                            "
                          ></div>
                        </div>
                      </div>
                      <div>
                        <span class="btn btn-theme02 btn-file">
                          <input
                            id="file"
                            type="file"
                            ref="file"
                            class="default"
                          />
                        </span>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </form>
            </div>
            <div class="tile-footer">
              <div class="row">
                <div class="col-md-8 col-md-offset-3">
                  <button
                    @click="uploadFile()"
                    class="btn btn-primary"
                    type="button"
                  >
                    <i class="fa fa-fw fa-lg fa-check-circle"></i>Kaydet</button
                  >&nbsp;&nbsp;&nbsp;
                </div>
              </div>
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
        category_id: "",
        img_url: "",
        color_name:"",
        subcategory_id: "",
      },

      subValue: "",
      category: {},
      sub_category: {},
      file: "",
      file2: "",
      fileWarn: "",
    };
  },

  mounted() {
    let dataUrl = store.state.base_url + "Category/getAllCategory.php?key=123";
    axios
      .get(dataUrl)
      .then((response) => {
        //conso.log(response);
        this.category = response.data.categories;
        //console.log(this.category)
      })
      .catch((err) => {
        //conso.log(err.response);
      });
  },

  methods: {
    reload: function () {
      location.reload();
    },
    onChangeSub(event) {
      this.subValue = event.target.value;
    },
    onChange(event) {
      let dataUrl =
        store.state.base_url +
        "Category/getAllSubCategoryCategoryId.php?key=123";

      var datas = {
        category_id: event.target.value,
      };

      axios
        .post(dataUrl, JSON.stringify(datas))
        .then((response) => {
          this.sub_category = response.data.data;
          // console.log(this.sub_category);
        })
        .catch((err) => {
          //conso.log(err.response);
        });
    },
    uploadFile: function () {
      this.file = this.$refs.file.files[0];

      var result = this.result;
      var uploadFile2 = this.uploadFile2;

      //conso.log(this.file);
      /*if (this.file.size > 1500000) {
         this.fileWarn = "Yükleyeceğiniz Dosya Boyutu 1.5 Mb'yi Aşamaz!  " +" Dosya Boyutunuz : "+ this.file.size/1000000 +"Mb" ;
        //conso.log("dosya boyutu büyük");
        return;
      }*/
      //console.log(this.file);
      let formData = new FormData();
      formData.append("file", this.file);
      var password = "root";
      var query =
        store.state.img_upload_url +
        "admin_upload_img.php?password=" +
        password;

      axios
        .post(query, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          //console.log(response);

          if (response.data.result) {
            // console.log("işlem başarılı");

            result.img_url = response.data.data;
            //console.log(result.img_url);

            uploadFile2();
            // console.log("uploadfile2");
          } else {
            //conso.log("işlem başarısız");
          }
        })
        .catch(function (error) {
          //conso.log(error);
        });
    },

    uploadFile2: function () {
      this.file2 = this.$refs.file2.files[0];

      var result = this.result;
      var sendData = this.sendData;
      //console.log("file2")
      //console.log(this.file2);

      //conso.log(this.file);
      /*if (this.file2.size > 1500000) {
        //conso.log("dosya boyutu büyük");
        return;
      }*/

      let formData = new FormData();
      formData.append("file", this.file2);
      var password = "root";
      var query =
        store.state.img_upload_url +
        "admin_upload_img_color.php?password=" +
        password;

      axios
        .post(query, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          // console.log(response);
        })
        .catch(function (error) {
          //conso.log(error);
        });
    },

    sendData: function () {
      var url = store.state.img_base_url + "createimage.php?key=123";

      var datas = {
        subcategory_id: this.subValue,
        img_url: this.result.img_url,
        color_name:this.result.color_name
      };

      axios
        .post(url, JSON.stringify(datas))
        .then((response) => {
          if (response.data.result == true) {
            location.reload();
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