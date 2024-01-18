<template>
    <div>
    <base-container>
        <section>
            <h3>{{ fullName }}</h3>
        <h4>${{ rate }}/hour</h4>
        <div>
            <base-badge v-for="area in areas" :key="area" :text="area" :mode="area"></base-badge>
        </div>
        </section>
    </base-container>
    <base-container>
    <div class="actions">
            If you want you can
            <base-button link :to="linkToContact">Contact</base-button>
        </div>

        <router-view></router-view>
    </base-container>
        
        
        <base-container>
        <section>
            <h4>Description</h4>
            {{ description }}
        </section>
        </base-container>
        
    
    
    </div>
</template>
<script>
export default{
    data(){
        return {
            selectedCoach: null
        }
    },
    created(){
        console.log('Created -- CoachDetails', this.$store.getters['coaches']);
        console.log('this.id -- ', this.id);
        this.selectedCoach = this.$store.getters['coaches'].find(coach => {
            console.log('coach --', coach);
            console.log('is cur id === coachId', coach.id === this.id);
            console.log('is cur id == coachId', coach.id == this.id);
            return coach.id == this.id;
        });
        console.log('Selected coach', this.selectedCoach);
    },
    props:['id'],
    computed:{
        fullName(){
            return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
        },
        rate(){
            return this.selectedCoach.hourlyRate;
        },
        areas(){
            return this.selectedCoach.areas;
        },
        description() {
            return this.selectedCoach.description;
        },
        linkToContact() {
            return this.$route.path + '/contact';
        }
    }

}
</script>

<style scoped>

</style>