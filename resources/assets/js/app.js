require('./bootstrap');

import Vue from 'vue' ; 
import bootstrap from 'bootstrap';
import VueRouter from 'vue-router'
import App from '@/resources/views/App' ; 
import router from '@/resources/router/router'
Vue.component('App' , App) ; 
  

var app = new Vue({
   el: '#app',
    router ,
    components: { App },
    template: '<App/>'
  
});