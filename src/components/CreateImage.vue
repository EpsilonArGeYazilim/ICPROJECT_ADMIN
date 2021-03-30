<template>
  <div>
    <Header />

    <main class="app-content">
      <div class="app-title">
        <div>
          <h1><i class="fa fa-dashboard"></i>Resim Oluştur</h1>
        </div>
        <ul class="app-breadcrumb breadcrumb">
          <li class="breadcrumb-item"><i class="fa fa-home fa-lg"></i></li>
          <li class="breadcrumb-item"><a href="/anasayfa">anasayfa</a></li>
        </ul>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="tile">
            <h3 class="tile-title">Resim Oluştur</h3>
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
                  <label class="control-label">
                    Alt Kategori :
                      {{ this.sub1_name }}
                      </label>   
                </div>
                <div class="form-group">
                  <label class="control-label">Color1 Renkleri:</label>
                  <select
                     @change="onChangeSub1($event)"
                    name="deneme"
                    id="deneme2"
                  >
                    <option selected="true">Seçiniz</option>
                    <option
                      v-for="(item, index) in color1"
                      :key="index"
                      :value="item.color1_id"
                    >
                      {{ item.color1_name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="control-label">
                    Alt Kategori :
                      {{ this.sub2_name }}
                      </label>   
                </div>
                <div class="form-group">
                  <label class="control-label">Color2 Renkleri:</label>
                  <select
                     @change="onChangeSub2($event)"
                    name="deneme"
                    id="deneme2"
                  >
                    <option selected="true">Seçiniz</option>
                    <option
                      v-for="(item, index) in color2"
                      :key="index"
                      :value="item.color2_id"
                    >
                      {{ item.color2_name }}
                    </option>
                  </select>
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
        img_url: "",
        
      },
      category_id: "",
      color1:"",
      color2:"",
      color1_id:"",
      color2_id:"",
      sub1_name:"",
      sub2_name:"",
      subValue: "",
      category: {},
      file: "",
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
    onChangeSub1(event) {
      this.color1_id = event.target.value;
    },
    onChangeSub2(event) {
      this.color2_id = event.target.value;
    },
    onChange(event) {
      let dataUrl =
        store.state.base_url +
        "Category/getByIdCategoryAllDatas.php?key=123";
      var datas = {
        category_id: event.target.value
      };
      this.category_id=datas.category_id;
      console.log(this.category_id);
      this.sub1_name= this.category[datas.category_id].sub1_name
      this.sub2_name= this.category[datas.category_id].sub2_name
      
      axios
        .post(dataUrl, JSON.stringify(datas))
        .then((response) => {
          this.color1 = response.data.color1datas;
          this.color1_name =this.color1.color1_name;

          this.color2 = response.data.color2datas;
          this.color2_name =this.color2.color2_name;
        })
        .catch((err) => {
          //conso.log(err.response);
        });
    },
    uploadFile: function () {
      this.file = this.$refs.file.files[0];
      var sendData = this.sendData;
      var result = this.result;
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

            sendData();
            // console.log("uploadfile2");
          } else {
            //conso.log("işlem başarısız");
          }
        })
        .catch(function (error) {
          //conso.log(error);
        });
    },


    sendData: function () {
      var url = store.state.base_url + "Category/createImages.php?key=123";
      var datas = {
        color1_id: this.color1_id,
        color2_id:this.color2_id,
        img_url: this.result.img_url,
        category_id: this.category_id
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