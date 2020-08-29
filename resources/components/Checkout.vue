<template>
    <div class="container">
        
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="order-box">
                    <img class="pImg" :src="product.image" :alt="product.name">
                    <h2 class="title" v-html="product.name"></h2>
                    <p class="small-text text-muted float-left">$ {{product.price}}</p>
                    <p class="small-text text-muted float-right">Available Units: {{product.units}}</p>
                    <br>
                    <hr>
                    <label class="row"><span class="col-md-2 float-left">Quantity: </span><input type="number" name="units" min="1" :max="product.units" class="col-md-2 float-left" v-model="quantity" @change="checkUnits"></label>
                </div>
                <br>
                <div>
                    <div v-if="!isLoggedIn">
                        <h2>You need to login to continue</h2>
                        <button class="col-md-4 btn btn-primary float-left" @click="login">Login</button>
                        <button class="col-md-4 btn btn-danger float-right" @click="register">Create an account</button>
                    </div>
                    <Map @marker_position_changed="changeAddress" @clickedAway="closeMap" v-show="mapLocation != null"></Map>
                    <div v-if="isLoggedIn">
                        <div class="row">

                            <label for="address" class="col-md-3 col-form-label">Delivery Address</label>
                            <div class="col-md-6">
                                <input id="address" type="text" class="form-control" v-model="address" required>
                            </div>
                            <button class="btn btn-sm btn-primary col-md-3 " v-if="isLoggedIn" @click="renderMap">GPS</button>

                        </div>
                        <br>
        
                        <button class="col-md-4 btn btn-sm btn-success float-right" v-if="isLoggedIn" @click.stop.prevent="placeOrder">Continue</button>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
import https from 'https';
import Map from './map' ;


export default {
    props : ['pid'],
    components: {Map} ,
    data(){
        return {
            wait : null , 
            address : "",
            quantity : 1,
            isLoggedIn : null,
            product : [] , 
            mapLocation : null 
        }
    },
    mounted() {
        this.isLoggedIn = localStorage.getItem('bigStore.jwt') != null
    },
    beforeMount() {

        const httpsAgent = new https.Agent({ rejectUnauthorized: false });
        axios.get(`/api/products/${this.pid}` , {httpsAgent} ).then(response => this.product = response.data)

        if (localStorage.getItem('bigStore.jwt') != null) {
            this.user = JSON.parse(localStorage.getItem('bigStore.user'))
            axios.defaults.headers.common['Content-Type'] = 'application/json'
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('bigStore.jwt')
        }
    },
    methods : {
        renderMap(){

            this.mapLocation = 1 ; 
            this.wait = 1  ; 
            setTimeout(()=>{
                this.wait = null ; 
            } , 100) ;
        } , 
        closeMap(){
            if(this.wait)return ; 
            this.mapLocation = null ; 
        } , 
        changeAddress(address){
            this.address = address ; 
        }
        ,
        login() {
            this.$router.push({name: 'login', params: {nextUrl: this.$route.fullPath}})
        },
        register() {
            this.$router.push({name: 'register', params: {nextUrl: this.$route.fullPath}})
        },
        placeOrder(e) {
            e.preventDefault()

            let address = this.address
            let product_id = this.product.id
            let quantity = this.quantity

            const httpsAgent = new https.Agent({ rejectUnauthorized: false });

            axios.post('api/orders', { httpsAgent , address, quantity, product_id})
                    .then(response => this.$router.push('/confirmation'))
        },
        checkUnits(e){
            if (this.quantity > this.product.units) {
                this.quantity = this.product.units
            }
        }
    }
}
</script>

<style scoped>
    .small-text { font-size: 18px; }
    .order-box { border: 1px solid #cccccc; padding: 10px 15px; }
    .title { font-size: 36px; }
     .pImg{
          max-width: 250px;
    }
</style>