<template>
    <div>
        <div class="container-fluid hero-section d-flex align-content-center justify-content-center flex-wrap ml-auto">
            <h2 class="title">Welcome to bigStore</h2>
        </div>
        <div class="container">
            <div class="search-bar">
                <b-nav-form>
                    <b-form-input  v-model="searchKey" @keyup="updateProducts" size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" >Search</b-button>
                </b-nav-form>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <h5><span v-html="error"></span></h5> 

                        <div class="col-md-4 product-box" v-for="(product,index) in productsToDisplay" v-bind:key="index">
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
    export default {
        data(){
            return {    
                products : []  , 
                productsToDisplay : [] , 
                searchKey : "" , 
                error : '' 
            }
        }, 
        mounted(){ 
            //const fs = require('fs') ; 
            
            const httpsAgent = new https.Agent({ rejectUnauthorized: false });
            var domain = window.location.origin ; 
            console.log(domain) ; 
            axios.get( domain+ "/api/products" , {  httpsAgent } ).then(response => {
                console.log('-----------------') ;
                this.products = response.data ;  
                this.productsToDisplay = response.data ; 
            });
        },
        methods :{
            updateProducts(){
                if(!this.searchKey){
                    this.productsToDisplay = this.products ; 
                }
                this.productsToDisplay = this.products.filter((product)=>{
                    return product.name.toLowerCase().indexOf(this.searchKey.toLowerCase())>-1 ; 
                });  
                
            }

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
    .search-bar{
        margin-left: -20px ;
        margin-bottom: 30px;
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