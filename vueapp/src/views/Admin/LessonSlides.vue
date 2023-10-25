<template>
  <section class="min-h-screen">
    <base-spinner v-if="isloading"></base-spinner>
    <div v-else class="w-1/2 m-auto">
      <h1></h1>
      <ul v-if="allSlides" class="space-y-3">
        <li
          v-for="(slide, key) in allSlides"
          :key="key"
          class="shadow-md py-2 rounded-md bg-slate-50"
        >
          <p
            class="content w-[90%] py-4 m-auto border border-neutral-400 px-3 rounded-md"
            v-html="slide.content"
          ></p>
          <h2 class="text-center text-slate-500 text-xl">
            {{ slide.questions[0].questionText }}
          </h2>
          <ul
            class="grid grid-cols-1 md:text-start text-center md:grid-cols-2 gap-3 my-2 px-4"
          >
            <li v-for="(q, k) in slide.questions[0].choices" :key="k">
              <font-awesome-icon :icon="['fas', 'circle']" /> {{ q }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      allSlides: [],
      isloading: false,
      error: "",
    };
  },
  methods: {
    async loadSlides() {
      this.isloading = true;
      const lessonId = +this.$route.params.lessonId;
      try {
        console.log("staredq");
        await this.$store.dispatch("courses/LoadLessons");
        let allSlides = this.$store.getters["courses/allLessons"];
        this.allSlides = allSlides.filter((el) => el.id === lessonId);
        this.allSlides = this.allSlides[0].slides;
      } catch (e) {
        console.log("errror");
        this.error = e.message || "failed to get data";
      }
      this.isloading = false;
    },
  },
  created() {
    this.loadSlides();
  },
};
</script>

<style lang="scss" scoped>
.content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
