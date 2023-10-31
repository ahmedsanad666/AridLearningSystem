<template>
  <section class="min-h-screen">
    <h1 class="md:text-3xl text-xl text-red-800 text-center my-4 " v-if="error" > {{error}}</h1>
    <base-spinner v-if="isloading"></base-spinner>
    <div v-else class="md:w-1/2 px-4 m-auto py-4">
      <h1 class="md:text-3xl text-xl text-center my-4 py-4">تعديل الشرائح</h1>
      <h1 class="md:text-3xl text-xl text-center my-4 py-4" v-if="allSlides.length === 0"> لم يتم اضافة شرائح بعد </h1>
  
      <ul v-if="allSlides" class="space-y-3">
        <li
          v-for="(slide, key) in allSlides"
          :key="key"
          class="shadow-md py-2 rounded-md bg-slate-50"
        >
          <div class="w-[20%]  mx-8 my-2 flex gap-4">
            <font-awesome-icon :icon="['fas', 'trash']" @click="deleteSlide(slide.id)" class=" text-red-700  cursor-pointer hover:bg-slate-600 p-2 rounded-lg" size="lg"/>
            <router-link :to="`/Admin/Sllides/${lessonid}/${slide.customId}`"> 

              <font-awesome-icon :icon="['fas', 'pen-to-square']" class=" text-green-600 cursor-pointer hover:bg-slate-600 p-2 rounded-lg" size="lg" />
            </router-link>
          </div>
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
      lessonid:''
    };
  },
  methods: {
    async loadSlides() {
      this.isloading = true;
      this.lessonid = this.$route.params.lessonId;
      const lessonId = +this.$route.params.lessonId;
      try {
     
        await this.$store.dispatch("courses/LoadLessons");
        let allSlides = this.$store.getters["courses/allLessons"];
        this.allSlides = allSlides.filter((el) => el.id === lessonId);
        this.allSlides = this.allSlides[0].slides;
      } catch (e) {
      
        this.error = e.message || "failed to get data";
      }
      this.isloading = false;
    },
    async deleteSlide(id){

      this.isloading = true;
      try{
        await this.$store.dispatch("courses/deleteSlide",id);
        this.loadSlides();

      }catch(e){
        this.error = e.message || 'failed to delete item';
        setTimeout(() => {
          this.error = '';
        }, 2000);
      }
      this.isloading = false;
    }
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
