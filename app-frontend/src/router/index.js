
import { createRouter, createWebHistory } from "vue-router";
import LoginComponent from "../components/LoginComponent.vue";
import HomeComponent from "../components/HomeComponent.vue";
import CreateBlogComponent from "@/components/CreateBlogComponent.vue";
import EditBlogComponent from "@/components/EditBlogComponent.vue";
import PostBlogComponent from "@/components/PostBlogComponent.vue";

//initiaiser les routes
const routes = [
    {
        path: "/home", 
        name: 'Home',
        component:  HomeComponent, 
        meta: { requiresAuth: true }
    },
    {
        path: "/", 
        name: 'register',
        component:  LoginComponent, 
    },
    {
        path: "/auth/signin", 
        name: 'login',
        component: LoginComponent    
    },
    {
        path: "/auth/signup", 
        name: 'register',
        component: LoginComponent    
    },
    {
        path: '/create',
        name: 'create',
        component: CreateBlogComponent
    },
    {
        path: '/edit/:id',
        name: 'edit',
        component: EditBlogComponent
    },
    {
        path: '/post/:id',
        name: 'post',
        component: PostBlogComponent
    }
]
const router = createRouter({
    history: createWebHistory(), 
    routes,
})

//TODO: voir si on garde cette condition
router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('accessToken') ? true: false;

    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/auth/signin')
    } else {
        next()
    }
});


export default router;