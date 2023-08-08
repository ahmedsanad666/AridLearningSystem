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
  data(){
    return{
      IsAdmin:false,
      
    }
  },
  methods: {

    // checkRole(){
    //     let currentUserId = this.$store.getters['auth/userId'];
    //     let currentUser = this.$store.getters['students/allUsers'].find(u => u.id == currentUserId);
    //    this.IsAdmin =  currentUser.role ? !this.IsAdmin: this.IsAdmin;
    //   },
    lang() {
      // const currentLang = localStorage.getItem("lang");
      // if (currentLang === "ar") {
      //   this.$i18n.locale = "ar";
      //   document.querySelector("html").dir = "rtl";
      // } else {
      //   this.$i18n.locale = "en";
      //   document.querySelector("html").dir = "ltr";
      // }
      document.querySelector("html").dir = "rtl";
    },

   

 
  },

  created() {
    this.lang();
    this.$store.dispatch('auth/tryLogin');
    
},


};
</script>

<style src="./assets/tailwind.css"></style>
