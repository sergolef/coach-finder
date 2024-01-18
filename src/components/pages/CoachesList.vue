<template>
    <div>
    <base-container>
        <coach-filter @filter-update="updateFilters"></coach-filter>
    </base-container>
    <base-container>
        <section v-if="hasCoaches && !loading">
            <div class="controls">
                <base-button mode="outline">Refresh</base-button>
                <base-button link to="/register" v-if="!isCoach">Register as Coach</base-button>
            </div>
            <ul>
                <coach-item v-for="coach in coaches" :key="coach.id" 
                    :id="coach.id"
                    :first-name="coach.firstName"
                    :last-name="coach.lastName"
                    :description="coach.description"
                    :areas="coach.areas"
                    :hourly-rate="coach.hourlyRate">
                </coach-item>
                
            </ul>
        </section>
        <section v-else-if="loading">
            <base-spiner></base-spiner>
        </section>
        <section v-else>
            <h3>No coaches found.</h3>
        </section>
    </base-container>
    <router-view></router-view>
</div>
</template>
<script>
import CoachItem from "../coaches/CoachItem.vue";
import CoachFilter from "../coaches/CoachFilter.vue";

export default{
    components:{
        CoachItem,
        CoachFilter
    },
    data(){
        return {
            filters:{
                frontend: true,
                backend: true,
                career: true
            }
        }
    },
    created() {
        if(!this.$store.getters['shouldCoachesUpdate']){
            return;
        }
        this.loadCoachData();
    },
    computed:{
        coaches(){
            const coaches = this.$store.getters['coaches'];
            return coaches.filter(coach => {
                if(this.filters.frontend && coach.areas.includes('frontend')){
                    return true;
                }
                if(this.filters.backend && coach.areas.includes('backend')){
                    return true;
                }
                if(this.filters.career && coach.areas.includes('career')){
                    return true;
                }
            });
        },
        hasCoaches(){
            return this.$store.getters['hasCoaches'];
        },
        isCoach(){
            return this.$store.getters['isCoach'];
        },
        loading(){
            return this.$store.getters['isLoading'];
        }
    },
    methods:{
        loadCoachData(){
            this.$store.dispatch('loadCoaches');
        },
        updateFilters(updatedFilters){
            this.filters = updatedFilters;
        }
    }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>