<template>
    <div>
        <table class="table table-responsive table-striped">
            <thead>
                <tr>
                    <td></td>
                    <td>Product</td>
                    <td>Quantity</td>
                    <td>Cost</td>
                    <td>Delivery Address</td>
                    <td>is Delivered?</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order,index) in orders" v-bind:key="index">
                    <td>{{index+1}}</td>
                    <td v-html="order.product.name"></td>
                    <td>{{order.quantity}}</td>
                    <td>{{order.quantity * order.product.price}}</td>
                    <td>{{order.address}}</td>
                    <td>{{order.is_delivered == 1? "Yes" : "No"}}</td>
                    <td v-if="order.is_delivered == 0"><button class="btn btn-success" @click="deliver(index)">Deliver</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import https from 'https';

export default {
    data() {
        return {
            orders : []
        }
    },
    beforeMount(){

        const httpsAgent = new https.Agent({ rejectUnauthorized: false });
        axios.get('/api/orders' , {httpsAgent}).then(response => this.orders = response.data)
    },
    methods: {
        deliver(index) {
            let order = this.orders[index]

            const httpsAgent = new https.Agent({ rejectUnauthorized: false });
            axios.patch(`/api/orders/${order.id}/deliver` , {httpsAgent}).then(response => {
                this.orders[index].is_delivered = 1
                this.$forceUpdate()
                console.log(response) ; 
            })
        }
    }
}
</script>