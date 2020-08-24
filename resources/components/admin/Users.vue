<template>
    <div>
        <table class="table table-responsive table-striped">
            <thead>
                <tr>
                    <td></td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Joined</td>
                    <td>Total Orders</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user,index) in users" v-bind:key="index">
                    <td>{{index+1}}</td>
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.created_at}}</td>
                    <td>{{user.orders.length}}</td>
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
            users : []
        }
    },
    beforeMount() {
        const httpsAgent = new https.Agent({ rejectUnauthorized: false });

        axios.get('/api/users' , {httpsAgent}).then(response => this.users = response.data)
    }
}
</script>