<template>
    <div>
        <div class="container-fluid hero-section d-flex align-content-center justify-content-center flex-wrap ml-auto">
            <h2 class="title">All your orders</h2>
        </div>
        <div class="container">
            <div class="search-bar">
                <b-nav-form>
                    <b-form-input  v-model="searchKey" @keyup="updateOrders" size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" >Search</b-button>
                </b-nav-form>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <br>
                    <div class="row">
                        <div class="col-md-12 product-box" v-for="(order,index) in ordersToDisplay" v-bind:key="index">
                            <img class="pImg" :src="order.product.image" :alt="order.product.name">
                            <h5><span v-html="order.product.name"></span><br>
                                <span class="small-text text-muted">$ {{order.product.price}}</span>
                            </h5>
                            <hr>
                            <span class="small-text text-muted">Quantity: {{order.quantity}}
                                <span v-bind:class="{'text-success' : order.is_delivered==1 , 'text-warning' : order.is_delivered==0, 'float-right' : true }">{{order.is_delivered == 1? "shipped!" : "not shipped"}}</span>
                            </span>
                            <br><br>
                            <p><strong>Delivery address:</strong> <br>{{order.address}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.small-text { font-size: 14px; }
.product-box { border: 1px solid #cccccc; padding: 10px 15px; }
.hero-section { background: #ababab; height: 20vh; align-items: center; margin-bottom: 20px; margin-top: -20px; }
.title { font-size: 60px; color: #ffffff; }
 .pImg{
          max-width: 25px;
    }
</style>

<script>
import https from 'https';

export default {
    data() {
        return {
            user : null,
            orders : [], 
            ordersToDisplay : [] , 
            searchKey : '' , 
        }
    },
    beforeMount() {
        this.user = JSON.parse(localStorage.getItem('bigStore.user'))

        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('bigStore.jwt')
        const httpsAgent = new https.Agent({ rejectUnauthorized: false });

        axios.get(`api/users/${this.user.id}/orders` , {httpsAgent})
                .then(response => {
                    this.orders = response.data ; 
                    this.ordersToDisplay = response.data ; 
                }); 
    } , 
    methods : {
        updateOrders : function (){
            if(!this.searchKey){
                this.ordersToDisplay = this.orders ; 
            }
            console.log (this.orders) ; 
            this.ordersToDisplay = this.orders.filter((order)=>{
                return order.product.name.toLowerCase().indexOf(this.searchKey.toLowerCase())>-1 ; 
            });  
    }
    }
}
</script>