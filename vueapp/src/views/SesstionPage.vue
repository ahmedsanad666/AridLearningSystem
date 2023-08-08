<template>
  <section class="contailner py-12 px-6 space-y-4">
    <h1 class="text-darkBlue w-full py-8 pt-4 text-center font-bold text-3xl">
      {{ $t("PychologicalSupport") }}
    </h1>
    <div class="infos flex flex-col md:flex-row space-x-6">
      <div class="image md:w-1/2">
        <img
          class="rounded-3xl shadow-lg"
          src="../assets/images/sesstions/support.jpg "
          alt=""
        />
      </div>

      <div class="details grow mt-8 md:mt-0 px-5">
        <h2 class="text-center text-darkBlue pb-6 text-2xl font-bold">
          {{ $t("courseContent") }}
        </h2>
        <ul class="space-y-8" :class="!enDir ? '' : 'text-right'">
          <li><span>1</span> {{ $t("char1") }}</li>
          <li><span>2</span> {{ $t("char2") }}</li>
          <li><span>3</span> {{ $t("char3") }}</li>
          <li><span>4</span> {{ $t("char4") }}</li>
          <li><span>5</span> {{ $t("char5") }}</li>
        </ul>
      </div>
    </div>
    <div class="text-center mx-auto text-xl py-10 mt-4">
      <router-link class="py-2 px-6 bg-orange rounded-full text-lightColor" to="#">{{
        $t("apply")
      }}</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "sesstions",
  data() {
    return {
      text: "",
    };
  },

  computed: {
    enDir() {
      this.text = this.$store.getters.getDir;
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  span {
    padding: 0.5rem 1.2rem;
    background: #f3603c;
    border-radius: 30px;
  }
  li {
    font-size: 1.04em;
    background: #ffefeb;
    padding: 0.5rem 0;
    padding-left: 0;
    border-radius: 30px;
  }
}
</style>
