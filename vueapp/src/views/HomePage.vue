<template>
  <the-header />

  <!-- our servieces -->

  <our-services />

  <!-- sesstions -->
  <our-sessions />

</template>

<script>
import TheHeader from "../components/TheHeader.vue";
import OurServices from "@/components/home/OurServices.vue";
import OurSessions from "@/components/home/OurSessions.vue";

export default {
  name: "home",
  components: {
    TheHeader,
    OurServices,
    OurSessions,
  },
 
};
</script>

<style></style>
