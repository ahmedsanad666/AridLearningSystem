<template>
  <section class="bg-[#F7F7FF] py-20 space-y-10">
    <section-head
      :secHead="'afasdfdfs'"
      secP="Not the answer you're looking for? Printing and typesetting inLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s Lorem"
    />
    <!-- cards -->
    <div class="container custom-grid text-center md:space-y-0 space-y-4">
      <!-- card item -->
      <router-link :to="{ name: 'sesstions' }">
        <div
          class="section-card rounded-2xl w-3/4 mx-auto cursor-pointer bg-lightColor hover:scale-105"
        >
          <img
            class="h-5/6 rounded-t-2xl"
            src="../../assets/images/header/header_2.jpg"
            alt=""
          />
          <h4 class="text-xl mt-2 font-mono">'afasdfdfs'</h4>
        </div>
      </router-link>
      <!-- .............. -->
      <!-- <div
        class="section-card rounded-2xl w-3/4 mx-auto bg-lightColor md:mt-0 mt-4"
      >
        <img
          class="h-5/6 rounded-t-2xl"
          src="../../assets/images/header/header_1.jpg"
          alt=""
        />
        <h4 class="text-xl mt-2 font-mono">Cuple Therapy</h4>
      </div> -->
      <!-- ................. -->
      <!-- <div
        class="section-card rounded-2xl w-3/4 mx-auto bg-lightColor lg:mt-0 mt-4"
      >
        <img
          class="h-5/6 rounded-t-2xl"
          src="../../assets/images/header/header_1.jpg"
          alt=""
        />
        <h4 class="text-xl mt-2 font-mono">online Session</h4>
      </div> -->
      <!-- .................. -->

      <!-- ......... -->
      <div
        class="section-card rounded-2xl w-3/4 mx-auto bg-lightColor flex justify-center items-center flex-col space-y-6 py-3"
      >
        <h2 class="text-xl font-bold">Start Your Session today.</h2>
        <p class="w-3/4">
          Take the first step on your journey to feeling better
        </p>
        <base-btn text="book now" />
      </div>
    </div>
  </section>
</template>

<script>
import SectionHead from "../bases/SectionHead.vue";
export default {
  components: { SectionHead },
};
</script>

<style></style>
