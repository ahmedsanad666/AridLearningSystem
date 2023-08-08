<template>
  <footer class="bg-veryDarkBlue py-10"  v-if="showFooter">
    <div class="container grid md:grid-cols-3 grid-cols-1 space-x-4  space-y-6 text-center">
      <!-- .......... -->
      <div class="flex flex-col space-y-4 mt-4">
        <h2 class="text-3xl text-lightGreen">AVCD Pysycology</h2>
        <social-media :flex="true" class=" w-1/2 mx-auto" />
      </div>
      <!-- .......... -->
      <div class="flex flex-col space-y-4 text-lightColor">
        <ul class="space-y-1 ">
          <li>
            <router-link to="#">Home</router-link>
          </li>
          <li>
            <router-link to="#">About</router-link>
          </li>
          <li>
            <router-link to="#">Courses</router-link>
          </li>
          <li>
            <router-link to="#"> Gallery </router-link>
          </li>
          <li>
            <router-link to="#"> Contact </router-link>
          </li>
        </ul>
      </div>
      <!-- .......... -->
      <div class="space-x-4 space-y-4">
        <input
          type="text"
          class="w-1/2 py-2 px-6 rounded-full outline-none border-none"
          placeholder="Email Adress"
        />
        <base-btn text="Submit" />
        <h2 class="text-lightColor">copyright 2023 All rights reserved</h2>
      </div>
    </div>
  </footer>
</template>

<script>
import SocialMedia from "../bases/SocialMedia.vue";
export default {
  data(){
    return{

      showFooter: true
    }
  },
  components: { SocialMedia },
  methods:{
    chekCurrentRoute(route){
      if(route.meta.title == 'lesson'){
        this.showFooter = false;
      }else{
        this.showFooter =true;
      }
    }
  },
 watch:{
  $route(newRoute){
this.chekCurrentRoute(newRoute);
  }
 }
};

</script>

<style lang="scss" scoped>
li a {
  &:hover {
    color: rgb(101, 145, 101);
  }
}
</style>
