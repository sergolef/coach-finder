<template>
    <div>
    <base-container>
        <section v-if="hasRequests">
            <header>
                <h3>Requests For You</h3>
            </header>
            
            <ul>
                <request-item v-for="r in requestsRecived" :key="r.id" 
                    :id="r.id"
                    :email="r.email"
                    :message="r.message">
                </request-item>
            </ul>
        </section>
        <section v-else-if="!hasRequests && loading">
            <base-spiner></base-spiner>
        </section>
       
        <section v-else>
            <h3>No requests for you.</h3>
        </section>

        <section>
            <base-dialog title="Error" :show="!!errorInfo" @close="hideError"> 
                {{ errorInfo }}
            </base-dialog>
        </section>

    </base-container>
</div>
</template>
<script>
import RequestItem from '../requests/RequestItem.vue';
export default{
    components: {
        RequestItem
    },
    data(){
        return {
            isError: false,
            errorInfo: null
        }
    },
    computed:{
        requestsRecived(){
            console.log('getter inside requestList', this.$store.getters['managerRequests']);
            return this.$store.getters['managerRequests']
        },
        hasRequests(){
            return this.$store.getters['hasRequests'];
        },
        loading(){
            return this.$store.getters['isLoadingReq'];
        },
        showDialog(){
            return this.isError;
        }
    },
    created() {
        if(this.$store.getters['isLoggedIn']){
            this.loadRequestData();
        }
        
    },
    methods:{
        hideError(){
            this.errorInfo = null;
        },
        loadRequestData(){
            if(!this.$store.getters['shouldUpdate']){
                return;
            }
            const coachId = this.$store.getters['getCoachId'];
            
            this.$store.dispatch('loadRequests', coachId).catch((error) => {
                if (error.response) {
                  
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    this.errorInfo = error.response.data.message;

                  } else if (error.request) {
                    console.log(error.request);
  
                    this.errorInfo = 'Request error!';
                  } else {
     
                    this.errorInfo = error.message || 'Request error!';
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                  }
            });
           
            
        },
    }
}
</script>

<style scoped>
    header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>