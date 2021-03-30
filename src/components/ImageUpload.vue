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
                    @change="onChangeColor($event)"
                    name="deneme"
                    id="deneme2"
                  >
                  <option selected="true">
                      Seçiniz
                    </option>
                    <option 
                      value="0"
                    >
                      {{ sub1_name }}
                    </option>
                    <option
                      value="1"
                    >
                      {{ sub2_name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                       <label class="control-label" >Renk Adı: </label>
                 <input type="text" id="colorname" v-model="color_name">

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
              color_url:""

        
      },
      sub1_name:"",
      sub2_name:"",
      category_id:"",
      colorValue: "",
      color_name:"",
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
        console.log(response);
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
    
    onChange(event) {
             this.category_id= event.target.value;
             this.sub1_name= this.category[this.category_id].sub1_name;
              this.sub2_name= this.category[this.category_id].sub2_name;
     
    },
    onChangeColor(event) {
             this.colorValue= event.target.value;
             console.log(this.colorValue);             
     
    },

    uploadFile: function () {
      this.file = this.$refs.file.files[0];

      var sendData = this.sendData;

      var result =this.result
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

          if (response.data.result) {

            result.color_url = response.data.data;
            console.log(result.color_url);
            console.log("deneme");
            sendData();
            // console.log("uploadfile2");
          } else {
            //console.log("işlem başarısız");
          }
        })
        .catch(function (error) {
          //conso.log(error);
        });
    },

    

    sendData: function () {
      var datas = {
        color_name: this.color_name,
        color_url: this.result.color_url,
        category_id: this.category_id
      };

      if(this.colorValue == "0"){
        var url = store.state.base_url + "Category/createColor1.php?key=123";

          axios
        .post(url, JSON.stringify(datas))
        .then((response) => {
          if (response.data.result == true) {
            window.location.href='/#/resim_yukle';
          }
          //conso.log(response);
        })
        .catch((error) => {
          //conso.log(error.response);
        });
      }
      else if(this.colorValue == "1"){
        var url = store.state.base_url + "Category/createColor2.php?key=123";

          axios
        .post(url, JSON.stringify(datas))
        .then((response) => {
          if (response.data.result == true) {
            window.location.href='/#/resim_yukle';
          }
          //conso.log(response);
        })
        .catch((error) => {
          //conso.log(error.response);
        });
      }
      else{
        console.log("Tebrikler bunu başardınız");
      }

      
    },
  },
};
</script>