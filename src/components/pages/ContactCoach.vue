<template>
    <div>
    <base-container>
    <form @submit.prevent="saveMessage">
        <div class="form-control">
            <label for="email">Email Address</label>
            <input type="email" id="email" v-model="email" @blur="clearValidity"/>
        </div>

        <div class="form-control">
            <label for="email">Message</label>
            <textarea rows="5" id="message" v-model="message" @blur="clearValidity"></textarea>
        </div>
        <div class="actions">
            <base-button>Send</base-button>
            <base-button @click="resetForm" type="button">Reset</base-button>
        </div>
        <p v-if="!isFormValid">All fields are required. Please fill the form.</p>
    </form>
    </base-container>
</div>
</template>
<script>
export default{
    data(){
        return {
            email: '',
            message: '',
            isFormValid: true
        }
    },
    methods:{
        validateForm(){
            console.log(this.message, this.email);
            if(this.message === '' || this.email === ''){
                this.isFormValid = false;
            }
            return this.isFormValid;
        },
        saveMessage(){
           if(this.validateForm() === false){
            return false;
           }

           const requestData = {
            message: this.message,
            email: this.email,
            coachId: this.$route.params.id
           };

           console.log(requestData);
           this.$store.dispatch('addRequestForCoach', requestData);
            this.$router.replace('/coaches');
        },
        resetForm(){
            this.email = '';
            this.message = '';
        },
        clearValidity(){
            this.isFormValid = true;
        }
    }
}
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>