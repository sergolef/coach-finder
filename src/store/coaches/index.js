import axios from "axios";
export default {
    state(){
        return {
            coaches: [],
            filters: ['frontend', 'backend', 'career'],
            isLoading: false,
            loadingTime: null
              
        }
    },
    
    getters:{
        coaches(state){
            return state.coaches;
        },
        hasCoaches(state){
            return state.coaches && state.coaches.length > 0;
        },
        paticularCoach(state, id){
            return state.coaches.filter(coach => coach.id === id);
        },
        filters(state){
            return state.filters;
        },
        isCoach(_,getters,_2, rootGetters){
            const coaches = getters.coaches;
            const curCoachId = rootGetters.getCoachId;
            return coaches.some(coach => coach.id === curCoachId);
        },
        isLoading(state){
            return state.isLoading;
        },
        shouldCoachesUpdate(state){
            const lastFetch = state.loadingTime;
            if(!lastFetch){
                return true;
            }
            const curentTimeStamp = new Date().getTime();
            return (curentTimeStamp - lastFetch) / 1000 > 60;
        }
    },
    mutations:{
        addCoach(state, payload){
            state.coaches.push(payload.coachData);         
        },
        loadCoachesList(state, payload){
            state.coaches = payload.coaches;
        },
        setLoadingStatus(state, payload){
            state.isLoading = payload.isLoading;
        },
        setloadTime(state){
            state.loadingTime = new Date().getTime();
        }
    },
    
    actions:{
        loadCoaches(context){
            context.commit('setLoadingStatus', {isLoading:true});
            axios.get('http://localhost:8080/api/coach', {
                headers: { 'Authorization': `Bearer ${context.rootGetters.token}` }
          }).then((response) => {
                console.log(response);
                if(response.status === 200){
                return response.data;
                }
            }).then((data) => {
                console.log('testr', data);
                const resCoaches = data.map(coach => {
                    coach.areas = coach.areas.map(area => area.name);
                    return coach;
                });
                console.log('loading data', resCoaches)
                context.commit('loadCoachesList', {coaches: resCoaches});
                context.commit('setloadTime');
            }).finally(() => {
                console.log('Loading done!');
                context.commit('setLoadingStatus', {isLoading:false});
            }).catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                  } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                  }
                  console.log(error.config);
            });

            
        },
        addCoachToList(context, data){
            console.log('action',data);
            const coachId = context.rootGetters.getCoachId;
            const coachData = {
                firstName: data.firstname,
                lastName: data.lastname,
                description: data.description,
                hourlyRate: data.hourlyRate,
                areas: data.areas
            };
            
            this.isLoading = true;
            axios.post('http://localhost:8080/api/coach.json', coachData, {
                headers: { 'Authorization': `Bearer ${context.rootGetters.token}` }
          }).then((response) => {
                console.log(response);
                if(response.status === 200){
                return response.data;
                }
            }).then((data) => {
                console.log('testr', data);
                this.results = data;
                this.isLoading = false;
            }).finally(() => {
                console.log('Loading done!');
                
            }).catch((err) => {
                console.log(err);
            });

            context.commit('addCoach', {
                ...coachData, 
                coachId
            });
        }

    },
};