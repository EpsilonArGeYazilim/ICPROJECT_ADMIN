import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import { router } from "./router"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        base_url: "https://imagechanges.epsilonarge.com/api2/",
        img_base_url: "https://imagechanges.epsilonarge.com/api2/Img/",
        img_upload_url: "https://imagechanges.epsilonarge.com/api2/UploadImg/",
        username: "",
        id: "",
        loginResult: false
    },
    mutations: {
        setusername(state, getdata) {
            state.id = getdata.id,
            state.username = getdata.username

        },
        clearusername(state) {
            state.id = "",
            state.username = ""
        }
    },


    actions: {
        login({ commit, dispatch, state }, data) {
            let dataUrl = state.base_url + "User/login.php?key=123"

            var datas = {
                username: data.username,
                password: data.password

            };



            return axios.post(dataUrl, JSON.stringify(datas),

            ).then(response => {


                if (response.data.result) {

                    console.log(response);
                    this.state.loginResult = true;
                   
                    var senddata = {
                        id: response.data.data.id,
                        username: response.data.data.username
                    }

                


                    commit("setusername", senddata)
                    localStorage.setItem("id", response.data.data.id)
                    localStorage.setItem("username", response.data.data.username)

                } else {
                    //conso.log("hatalı giriş");
                }

            }).catch(err => {
                //conso.log(err.response);
            });


        },

        logout({ commit}){

            commit("clearusername")

            localStorage.removeItem("id")
            localStorage.removeItem("username")
            location.reload();
        }


    },

    getters: {
        isLogin(state) {

            return localStorage.getItem("id") !== null && localStorage.getItem("username") !== null
        },
        getUser(state) {

            var result = {
                id: state.id,
                username: state.username
            }

            return result
        }
    }
})

export default store