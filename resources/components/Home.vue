<template>
    <div>
        <div class="container-fluid hero-section d-flex align-content-center justify-content-center flex-wrap ml-auto">
            <h2 class="title">Welcome to the bigStore</h2>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-4 product-box" v-for="(product,index) in products" v-bind:key="index">
                            <router-link :to="{ path: '/products/'+product.id}">
                                <img class="pImg" :src="product.image" :alt="product.name">
                                <h5><span v-html="product.name"></span>
                                    <span class="small-text text-muted float-right">$ {{product.price}}</span>
                                </h5>
                                <button class="col-md-4 btn btn-sm btn-primary float-right">Buy Now</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    
    import https from 'https';
    //const fs = require('fs'); 
    export default {
        data(){
            return {    
                products : [] 
            }
        }, 
        mounted(){ 
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false, // (NOTE: this will disable client verification)
                //cert: fs.readFileSync("./usercert.pem"),
                //key: fs.readFileSync("./key.pem"), 
                passphrase: "YYY" 
            });
            axios.get("api/products/" , {  httpsAgent } ).then(response => {
                console.log(response) ; 
                this.products = response.data
           
            })      
        }
    }
</script>

    <style scoped>
    .small-text {
        font-size: 14px;
    }
    .pImg{
          max-width: 250px;

    }
    .product-box {
        border: 1px solid #cccccc;
        padding: 10px 15px;
    }
    .hero-section {
        height: 30vh;
        align-items: center;
        margin-bottom: 20px;
        margin-top: -20px;
    }
    .title {
        font-size: 60px;
        /* color: #ffffff; */
    }
    </style>