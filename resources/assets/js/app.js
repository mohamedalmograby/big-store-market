require('./bootstrap');
//var fs = require("fs");

import Vue from 'vue' ; 
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import bootstrap from 'bootstrap';
import VueRouter from 'vue-router'
import App from '@/resources/views/App' ; 
import router from '@/resources/router/router'
Vue.component('App' , App) ; 
  
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

var app = new Vue({
   el: '#app',
    router ,
    components: { App },
    template: '<App/>'
  
});