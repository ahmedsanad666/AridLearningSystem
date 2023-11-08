<template>
  <section class="min-h-screen py-4">
    <div v-if="noQuiziz">
      <h1 class="md:text-3xl text-2xl text-center py-4 my-4 font-bold">
        لم يتم اضافة اختبارات بعد
      </h1>
    </div>
    <div
      v-else
      class="md:w-3/4 w-[70%] py-3 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5  gap-y-20 m-auto"
    >
      <div class="text-center text-red-600 text-2xl font-bold" v-if="error">
        {{ error }}
      </div>
      <base-spinner v-if="isLoading"></base-spinner>

      <div
        v-else
        class="rounded-lg quizCard mt-9 shadow-lg"
        v-for="(quiz, k) in allQuiziz"
        :key="k"
      >
    
        <div
          class="quizPic h-1/2 bg-gray-300 font-body text-white rounded-t-lg"
          :style="'background-image: url(data:image/png;base64,' + quiz.imgByte"
        >
          <div
            class="content flex flex-col gap-2 text-white rounded-t-lg px-3 pt-5"
          >
            {{ quiz.name }}
            <h2>{{ quiz.subject }}</h2>
          </div>
          <div class="overlay rounded-t-lg"></div>
        </div>
        <router-link :to="`/quizTheme/${quiz.id}`" v-if="isLoggedIn">
          <div class="des h-1/2 bg-gray-200 py-4 px-3">
            <h3 class="px-4 text-lg font-bold">الوصف</h3>
            <hr class="my-2 text-zinc-500 m-auto" />
            <p class="max-w-2xl px-3 py-2 desc">
              {{ quiz.description }}
            </p>
          </div>
        </router-link>
        <div class="des h-1/2 bg-gray-200 py-4 px-3" v-else>
            <h3 class="px-4 text-lg font-bold">الوصف</h3>
            <hr class="my-2 text-zinc-500 m-auto" />
            <p class="max-w-2xl px-3 py-2 desc">
              {{ quiz.description }}
            </p>
          </div>
        <div
          class="z-50 top-0 py-2 left-0 w-full px-4 flex flex-col space-y-2"
          v-if="isLoggedIn && isAdmin"
        >
          <div class="flex justify-between">
            <router-link
              class="px-3 py-1 rounded-md bg-slate-800 text-white"
              :to="`/CreateQuestion/${quiz.id}/${quiz.type}`"
              >عرض الاسئلة</router-link
            >
            <router-link
              :to="`/AddQuestion/${quiz.id}/${quiz.type}`"
              class="px-3 py-1 rounded-md"
            >
              <font-awesome-icon
                :icon="['fas', 'plus']"
                title="AddQuestion"
                class="px-2 py-1 bg-slate-200 rounded-md hover:bg-green-400"
              />
            </router-link>
          </div>
            <div class=" flex justify-between gap-2">

              <router-link
              v-if="quiz.type === 'multipleChoices'"
              class="py-1 w-full text-center rounded-md bg-green-700 text-white my-2"
              :to="`/QuizLink/${quiz.id}`"
              >Live Quiz</router-link
              >
              <router-link
             
              class="py-1 w-full text-center rounded-md bg-green-700 text-white my-2"
              :to="`/quizResult/${quiz.id}`"
              >النتائج </router-link
              >
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      type: "",
      allQuiziz: [],
      noQuiziz: false,
      error: "",
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters["auth/isAdmin"];
    },
    isLoggedIn() {
      return this.$store.getters["auth/isAuthenticated"];
    },

    QuizType() {
      return this.$route.params.QuizType;
    },
  },
  methods: {
    async GetQuiziz() {
      const QuizType = this.$route.params.QuizType;
      this.isLoading = true;
      try {
        if (QuizType === "match") {
          await this.$store.dispatch("Quiz/allmatchQuiziz");
          this.allQuiziz = this.$store.getters["Quiz/getmatchQuiziz"];
        } else {
          await this.$store.dispatch("Quiz/MultipleQuizis", QuizType);
          this.allQuiziz = this.$store.getters["Quiz/getmultipleQuiziz"].quizis;
        }
        if (this.allQuiziz.length === 0) {
          this.noQuiziz = true;
        } else {
          this.noQuiziz = false;
        }
      } catch (e) {
        this.error = e.message || "failed to get data";
      }
      this.isLoading = false;
    },
  },
  mounted() {
    this.GetQuiziz();
  },
};
</script>

<style lang="scss" scoped>
.quizCard {
  min-height: 53vh;
}
.quizPic {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  z-index: -99;
  position: relative;
  min-height: 25vh;

  .content {
    font-size: 2rem;
    position: absolute;
    top: 0.6rem;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
  }
  .overlay {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba($color: #000000, $alpha: 0.7);
    z-index: 0;
  }
  .desc {
    white-space: normal;
    overflow: visible;
    word-wrap: break-word;
  }
}
</style>
