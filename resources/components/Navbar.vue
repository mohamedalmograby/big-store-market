<template>
    <div>


        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">
                <router-link :to="{name: 'home'}" class="navbar-brand">Big Store</router-link>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>

            <!-- Right aligned nav items -->

            
            <b-navbar-nav class="ml-auto">
                <b-nav-item>
                    <router-link :to="{ name: 'login' }" class="nav-link" v-if="!isLoggedIn">Login</router-link>
                </b-nav-item>

                <b-nav-item>
                    <router-link :to="{ name: 'register' }" class="nav-link" v-if="!isLoggedIn">Register</router-link>
                </b-nav-item>

                <b-nav-item-dropdown v-if="isLoggedIn" right>
                    <!-- Using 'button-content' slot -->
                    <template v-slot:button-content>
                        <em>User</em>
                    </template>
                    <b-dropdown-item>
                        <span >
                            <router-link :to="{ name: 'userboard' }"  v-if="user_type == 0"> Hi, {{name}}</router-link>
                            <router-link :to="{ name: 'admin' }" class="nav-link" v-if="user_type == 1"> Hi, {{name}}</router-link>
                        </span>
                    </b-dropdown-item>

                    <b-dropdown-item >
                        <li @click="logout"> Logout</li>
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: null,
            user_type: 0,
            isLoggedIn: localStorage.getItem('bigStore.jwt') != null
        }
    },
    beforeMount() {
        this.setDefaults()
    },
    methods : {
        setDefaults() {
            if (this.isLoggedIn) {
                let user = JSON.parse(localStorage.getItem('bigStore.user'))
                this.name = user.name
                this.user_type = user.is_admin
            }
        },
        change() {
            this.isLoggedIn = localStorage.getItem('bigStore.jwt') != null
            this.setDefaults()
        },
        logout(){
            localStorage.removeItem('bigStore.jwt')
            localStorage.removeItem('bigStore.user')
            this.change()
            this.$router.push('/')
        },
        loggedIn: function() {
            console.log('here3')
           this.$refs.Navbar.change();
        }
    } 
}
</script>

<style>
.navbar{
    margin-bottom: 50px;
}
</style>