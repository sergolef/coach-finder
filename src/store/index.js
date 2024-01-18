import { createStore } from "vuex";
import coachesStore from "./coaches/index.js";
import requestsStore from "./requests/index.js";
import axios from "axios";

let timer;

const store = createStore({
    namespaced: true,
    modules:{
        coaches: coachesStore,
        requests: requestsStore
    },
    state(){
        return {
            isLoggedIn: false,
            userId: false,
            accessToken: null,
            isLoading: false,
            expiryDate: null
        }
    },
    getters:{
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        getCoachId(state){
            return state.userId;
        },
        isAuthenticating(state){
            return state.isLoading;
        },
        token(state){
            return state.accessToken;
        }
    },
    mutations:{
        setAuthStatus(state, payload){
            state.isLoggedIn = payload.isAuth;
        },
        setLoadingStatus(state, payload){
            state.isLoading = payload.isLoading;
        },
        setAuthData(state, payload){
            state.userId = payload.coachId;
            state.accessToken = payload.accessToken;
            state.expiryDate = payload.expiryDate;

            localStorage.setItem('token', payload.accessToken);
            localStorage.setItem('coachId', payload.coachId);
            localStorage.setItem('expiration', payload.expiryDate);
        }
    },
    actions:{
        login(context, payload){

            const requestData = {
                username: payload.username,
                password: payload.password
            };
            context.commit('setLoadingStatus', {isLoading: true});

            return axios.post('http://localhost:8080/api/auth/login', requestData).then((response) => {
                if(response.status === 200){
                    return response.data;
                }
            }).then((data) => {

                context.commit('setAuthStatus', {isAuth: true});
                const expiration = new Date(data.expiryDate).getTime();
                const nowTime = new Date().getTime();
                console.log(expiration, nowTime, expiration - nowTime);
                
                context.commit('setAuthData', {
                    coachId: '1',
                    accessToken: data.accessToken,
                    expiryDate: expiration
                });
                timer = setTimeout(() => {
                    context.dispatch('logout');
                },(expiration - nowTime));

            }).finally(() => {
                context.commit('setLoadingStatus', {isLoading: false});
            }).catch((err) => {
                console.log(err);
            });
            
        },
        autoLogin(context){
            const token = localStorage.getItem('token');
            const coachId = localStorage.getItem('coachId');
            const expiration = localStorage.getItem('expiration');

            const timeLeft = +expiration - new Date().getTime();

            if( timeLeft < 0){
                context.dispatch('logout');
                return;
            }else{
                timer = setTimeout(() => {
                    context.dispatch('logout');
                }, timeLeft );
            }
            

            if(token !== '' && coachId !== ''){
                context.commit('setAuthData', {
                    coachId: '1',
                    accessToken: token,
                    expiryDate: coachId
                });
                context.commit('setAuthStatus', {isAuth: true});
            }
            
        },
        logout(context){

            clearTimeout(timer);
            context.commit('setAuthStatus', {isAuth: false});
            context.commit('setAuthData', {
                    coachId: null,
                    accessToken: null,
                    expiryDate: null
            });
            localStorage.removeItem('token');
            localStorage.removeItem('coachId');
        }
    },
});

export default store;