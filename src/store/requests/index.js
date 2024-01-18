import axios from "axios";
export default {
    state(){
        return {
            requests: [],
            isLoadingReq:false,
            errorLoading: false,
            lastLoad: null
        }
    },
    getters:{

        managerRequests(state){
            return state.requests;
        },
        hasRequests(state){
            return state.requests && state.requests.length > 0;
        },
        isLoadingReq(state){
            return state.isLoadingReq;
        },
        shouldUpdate(state){
            const lastFetch = state.lastLoad;
            if(!lastFetch){
                return true;
            }
            const curentTimeStamp = new Date().getTime();
            return (curentTimeStamp - lastFetch) / 1000 > 60;
        }
    },
    mutations:{
        setloadTime(state){
            state.lastLoad = new Date().getTime();
        },
        addRequest(state, payload){
            console.log('mutation', payload.requestData);
            state.requests.push(payload.requestData);
        },
        loadRequestsList(state, payload){
            state.requests = payload.requests;
        },
        setLoadingStatus(state, payload){
            state.isLoadingReq = payload.isLoading;
        }
    },
    actions:{
        
        addRequestForCoach(context, data){
            console.log('action',data);
            let requestId = null;
            const requestData = {
                email: data.email,
                message: data.message,
                coachId: data.coachId
            };

            this.isLoading = true;
            axios.post('http://localhost:8080/api/request.json', requestData, {
                headers: { 'Authorization': `Bearer ${context.rootGetters.token}` }
            }).then((response) => {
                if(response.status === 200){
                return response.data;
                }
            }).then((data) => {

                this.results = data;
                requestId = data.id;
            }).finally(() => {
            }).catch((err) => {
                console.log(err);
            });

            context.commit('addRequest', {requestData: {
                ...requestData, 
                requestId
            }});
        },
        loadRequests(context, id){

            context.commit('setLoadingStatus', {isLoading:true});

            return axios.get(`http://localhost:8080/api/coach/${id}/requests.json`, {
                headers: { 'Authorization': `Bearer ${context.rootGetters.token}` }
            }).then((response) => {
                if(response.status === 200){
                    return response.data;
                }
            }).then((data) => {
                context.commit('loadRequestsList', {requests: data});
                if(data.length > 0){
                    context.commit('setloadTime');
                }
                
                this.isLoading = false;
            }).finally(() => {
                context.commit('setLoadingStatus', {isLoading:false});
            });


        },
    },
};