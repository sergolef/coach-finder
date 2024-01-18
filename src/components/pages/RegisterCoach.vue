<template>
    <div>
    <coach-form @store-data="registerNewCoach"></coach-form>
</div>
</template>


<script>
import CoachForm from '../coaches/CoachForm.vue';

export default{
    components:{
        CoachForm
    },
    data(){
        return {

        }
    },
    methods:{
        registerNewCoach(coachData){
            this.$store.dispatch('addCoachToList', coachData);
            this.$router.replace('/coaches');
        }
    }
}
</script>

<style scoped>

</style>