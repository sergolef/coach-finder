import { createRouter,createWebHistory} from "vue-router";


const CoachesList = () => import("./components/pages/CoachesList.vue");

const RegisterCoach = () => import("./components/pages/RegisterCoach.vue");

const RequestsList = () => import("./components/pages/RequestsList.vue");

const NotFound = () => import("./components/pages/NotFound.vue");

const ContactCoach = () => import("./components/pages/ContactCoach.vue");

const CoachDetails = () => import("./components/pages/CoachDetails.vue");

const UserAuth = () => import("./components/pages/auth/UserAuth.vue");

import store from "./store/index.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/coaches'},
        {path: '/coaches', component: CoachesList, meta: {requireAuthenticate: true} },
        {
            name: 'coach_details', 
            path: '/coaches/:id', 
            component: CoachDetails, 
            props: true, 
            children:[
                {
                    name: 'coach_contact',  
                    path: 'contact', 
                    component: ContactCoach
                }
            ]
        },
        {path: '/register', component: RegisterCoach, meta: {requireAuthenticate: true}},
        {path: '/requests', component: RequestsList, meta: {requireAuthenticate: true}},
        {path: '/auth', component: UserAuth, meta: {requireUnAuthenticate: true}},
        {path: '/notFound(.*)', component: NotFound}
    ]
});

router.beforeEach(function(to, from, next){
    if(to.meta.requireAuthenticate && !store.getters.isLoggedIn){
        next('/auth');
    } else if(to.meta.requireUnAuthenticate && store.getters.isLoggedIn){
        next('/coaches');
    }else {
        next();
    }
    
});

export default router;