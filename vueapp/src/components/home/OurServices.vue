<template>
  <section class="container px-4 md:py-20 py-16 space-y-16" id="serv">
    <section-head
      :secHead="'serivers'"
      secP="Not the answer you're looking for? Printing and typesetting inLorem Ipsum
            is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry’s Lorem"
    />

    <!-- services items -->

    <service-item />
  </section>
</template>

<script>
import ServiceItem from "./ServiceItem.vue";
export default {
  components: {
    ServiceItem,
  },
};
</script>

<style lang="scss" scoped>
section {
  background: url("../../assets/images/bg-tablet-pattern.svg") no-repeat;
  background-position: 110% -213%;
}
</style>
