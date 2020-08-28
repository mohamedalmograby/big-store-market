<template>
    <div>
        <table class="table table-responsive table-striped">
            <thead>
                <tr>
                    <td></td>
                    <td>Product</td>
                    <td>Units</td>
                    <td>Price</td>
                    <td>Description</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product,index) in products" v-bind:key="index" @dblclick="editingItem = product">
                    <td>{{index+1}}</td>
                    <td v-html="product.name"></td>
                    <td v-model="product.units">{{product.units}}</td>
                    <td v-model="product.price">{{product.price}}</td>
                    <td v-model="product.price">{{product.description}}</td>
                </tr>
            </tbody>
        </table>
        <modal  @clickedAwayForm="closeEditForm" @close="endEditing" :product="editingItem" v-show="editingItem != null"></modal>
        <modal  @clickedAwayForm="closeAddForm" @close="addProduct"  :product="addingProduct" v-show="addingProduct != null"></modal>
        <br>
        <button class="btn btn-primary" @click="newProduct">Add New Product</button>
    </div>
</template>
<script>
import Modal from './ProductModal'
import https from 'https';

export default {
    data() {
        return {
            products: [],
            editingItem: null,
            addingProduct: null , 
            wait : null 
        }
    },
    components: {Modal},
    beforeMount() {
        const httpsAgent = new https.Agent({ rejectUnauthorized: false });

        axios.get('/api/products' , {httpsAgent}).then(response => this.products = response.data)
    },
    methods: {
        newProduct() {
            this.addingProduct = {
                name: null,
                units: null,
                price: null,
                image: null,
                description: null,
            }
            this.wait = 1  ; 
            setTimeout(()=>{
                this.wait = null ; 
            } , 100) ;
        },
        endEditing(product) {
            this.editingItem = null

            let index = this.products.indexOf(product)
            let name = product.name
            let units = product.units
            let price = product.price
            let description = product.description
            const httpsAgent = new https.Agent({ rejectUnauthorized: false });

            axios.put(`/api/products/${product.id}`, {httpsAgent ,  name, units, price, description})
                    .then(response => this.products[index] = product)
        },
        addProduct(product) {
            this.addingProduct = null

            let name = product.name
            let units = product.units
            let price = product.price
            let description = product.description
            let image = product.image 
            const httpsAgent = new https.Agent({ rejectUnauthorized: false });

            axios.post("/api/products", {httpsAgent , name, units, price, description, image})
                    .then(response => this.products.push(product))
        } , 
        closeAddForm(){
            if(this.wait)return ; 
            this.addingProduct= null ; 
        }
        ,
        closeEditForm(){
            if(this.wait)return ; 
            this.editingItem = null ; 
        }
    }
}
</script>