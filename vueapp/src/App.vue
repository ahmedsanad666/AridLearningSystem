<template>
  <div class="main">
    <nav-bar />
    <router-view />
    <the-footer />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";


export default {
  components: { NavBar },
  data() {
    return {
      IsAdmin: false,
     
    
    };
  },
  methods: {
    lang() {
      document.querySelector("html").dir = "rtl";
    },
  
  },

  created() {
    this.lang();
    this.$store.dispatch("auth/tryLogin");
  },
  
};
</script>

<style src="./assets/tailwind.css"></style>
