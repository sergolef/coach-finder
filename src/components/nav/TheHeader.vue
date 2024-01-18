<template>
    <header>
      <h1>
        <router-link to="/">CoachFinder</router-link>
      </h1>
      <nav>
        <ul>
          <li>
            <router-link to="/coaches">Coaches</router-link>
          </li>
          <li v-if="isLoggedIn">
            <router-link to="/requests">Requests</router-link>
          </li>
          <!-- <li>
            <router-link to="/register">Register</router-link>
          </li> -->
        </ul>
      </nav>
      <div>
        <router-link v-if="!isLoggedIn" to="/auth">Login</router-link>
        <button v-if="isLoggedIn" @click="logout">Logout</button>
      </div>
    </header>
  </template>
  
  <script>
  import {  mapState } from 'vuex';
  export default {
    methods:{
      login(){
        this.$store.dispatch('login');
      },
      logout(){
        this.$store.dispatch('logout');
        this.$router.replace('/auth');
      }
    },
    computed:{
      quantity(){
        return this.$store.getters['quantity'];
      },
      ...mapState( ['isLoggedIn'])
    }
  };
  </script>
  
  <style scoped>
  header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  font: inherit;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  border: 1px solid #240238;
  background-color: transparent;
  color: #f391e3;
  border-radius: 30px;
}

li {
  margin: 0 0.5rem;
}
  </style>