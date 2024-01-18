<template>
    <base-container>
        <form @submit.prevent="login">
            <div>
                <span></span>
            </div>
            <div class="form-control">
                <label for="username"></label>
                <input type="text" name="username" id="username" placeholder="Email" v-model.trim="username" @blur="resetValidity">
            </div>
            <div class="form-control">
                <label for="password"></label>
                <input type="password" name="password" id="password" placeholder="Password" v-model.trim="password" @blur="resetValidity">
            </div>

            <p v-if="!isValid">All fields are required. Please fill the form.</p>
            <base-button mode="outline" type="submit">Login</base-button>
            <base-button mode="flat">Signup</base-button>
        </form>
    </base-container>
    <section v-if="loading">
            <base-spiner></base-spiner>
    </section>

</template>

<script>
export default{
    data(){
        return{
            username:'',
            password: '',
            isValid: true,
        }
    },
    computed:{
        loading(){
            return this.$store.getters['isAuthenticating'];
        }
    },
    methods:{
        resetValidity(){
            this.isValid = true;
        },
        login(){
            if(this.username === '' || this.password === ''){
                this.isValid = false;
                return false;
            }
            this.$store.dispatch('login', {
                username: this.username,
                password: this.password
            }).then(() => {
                //redirect to coaches list here
                this.$router.replace('/coaches');
            }).catch( () => {
                this.isValid = true;
            });

        },
        logout(){
            this.$store.dispatch('logout');
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