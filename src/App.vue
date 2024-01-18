<template>
  <the-header></the-header>
  <router-view v-slot="{ Component }">
    <transition name="route">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from './components/nav/TheHeader.vue';

export default {
  components: {
    TheHeader
  },
  data() {
    return {
      isLoggedIn: false,
      products: [],
      cart: { items: [], total: 0, qty: 0 },
    };
  },
  computed:{
    authenticated(){
      return this.$store.getters['isLoggedIn'];
    }
  },
  created(){
    this.$store.dispatch('autoLogin');
  },
  watch:{
    authenticated(curVal){
      if(curVal === false){
        this.$router.replace('/auth');
      }
    }
  },
  methods: {},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>