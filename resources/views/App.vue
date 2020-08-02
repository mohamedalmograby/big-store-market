<template>
    <div class="app">
        <Navbar ref="Navbar"></Navbar>
        <router-view @loggedIn="fn"></router-view>
        
    </div>
    
</template>

<script>
import Navbar from 'C:/projects/bigStore/resources/components/Navbar' ; 
import Home from 'C:/projects/bigStore/resources/components/Home' ;         
export default {
    components :{
        Navbar , 
        Home , 
    },
    methods : {
        fn(e) {
           console.log('here2')
           this.$refs.Navbar.change();
        }
    }
}
</script>

<style>
.app{
    /* background-image: url("https://images.unsplash.com/photo-1479981280584-037818c1297d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"); */
}
</style>