require('./bootstrap');

import Vue from 'vue' ; 
import bootstrap from 'bootstrap';
import VueRouter from 'vue-router'
import App from 'C:/projects/bigStore/resources/views/App' ; 
import router from 'C:/projects/bigStore/resources/router/router'
Vue.component('App' , App) ; 


var app = new Vue({
   el: '#app',
    router ,
    components: { App },
    template: '<App/>'
  
});