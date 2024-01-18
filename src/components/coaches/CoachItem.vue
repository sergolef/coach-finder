<template>
    <li>
        <h3>{{ fullName }}</h3>
        <h4>${{ hourlyRate }}/hour</h4>
        <div>
            
            <base-badge v-for="area in areas" :key="area" :text="area" :mode="area"></base-badge>
            
        </div>
        <div class="actions">
            <base-button link :to="linkToDetails">View Details</base-button>
            <base-button link :to="linkToContact" v-if="!itsMe">Contact</base-button>
        </div>
    </li>
    
</template>
<script>

export default{
    props: ['firstName', 'lastName', 'id', 'areas', 'description', 'hourlyRate'],
    computed:{
        fullName() {
            return this.firstName + ' ' + this.lastName;
        },
        linkToDetails(){
            return this.$route.path +'/'+ this.id;
        },
        linkToContact(){
            return this.$route.path + '/'+ this.id + '/contact';
        },
        itsMe(){
            const curCoachId = this.$store.getters['getCoachId'];
            return curCoachId && curCoachId === this.id;
        }
    }
}
</script>

<style scoped>
    li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>