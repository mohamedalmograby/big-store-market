import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'C:/projects/bigStore/resources/components/Home' ; 
import Login from 'C:/projects/bigStore/resources/components/Login';
import Register from 'C:/projects/bigStore/resources/components/Register';
import SingleProduct from 'C:/projects/bigStore/resources/components/SingleProduct'
import Checkout from 'C:/projects/bigStore/resources/components/Checkout' 
import Confirmation from 'C:/projects/bigStore/resources/components/Confirmation'
import UserBoard from 'C:/projects/bigStore/resources/components/UserBoard'
import Admin from 'C:/projects/bigStore/resources/components/Admin'

Vue.use(VueRouter)
 
export default new VueRouter({
    mode : 'history' ,
    routes: [
        {
        path: '/',
        name: 'home',
        component: Home
        } , 
        {
            path : '/login' , 
            name : 'login' , 
            component : Login 
        } , 
        {
            path : '/register' , 
            name : 'register' , 
            component : Register
        },
        {
            path: '/products/:id',
            name: 'single-products',
            component: SingleProduct
        },
        {
            path: '/checkout' , 
            name :'checkoute' , 
            component : Checkout ,
            props: (route) => ({ pid: route.query.pid })
        },
        {
            path: '/confirmation',
            name: 'confirmation',
            component: Confirmation
        },
        {
            path: '/dashboard',
            name: 'userboard',
            component: UserBoard,
            meta: {
                requiresAuth: true,
                is_user: true
            }
        },{
            path: '/admin/:page',
            name: 'admin-pages',
            component: Admin,
            meta: {
                requiresAuth: true,
                is_admin: true
            }
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            meta: {
                requiresAuth: true,
                is_admin: true
            }
        }
    ]
})
