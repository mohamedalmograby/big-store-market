require('./bootstrap');
//var fs = require("fs");

import Vue from 'vue' ; 
import bootstrap from 'bootstrap';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import VueRouter from 'vue-router'
import App from '@/resources/views/App' ; 
import router from '@/resources/router/router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.component('App' , App) ; 
  
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


var app = new Vue({
   el: '#app',
    router ,
    components: { App },
    template: '<App/>'
  
});