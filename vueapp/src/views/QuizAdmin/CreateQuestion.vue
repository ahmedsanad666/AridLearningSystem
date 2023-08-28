<template>
  <section class="min-h-screen py-4 bg-slate-50">
    <div class="md:w-1/2 w-3/4 px-4 py-3 m-auto min-h-screen">
      <h1 class="py-3 my-4">{{QuizData.name}}</h1>
      <div class="flex items-center">
        <router-link
          :to="`/AddQuestion/${QiuzData.quizId}/${QiuzData.Type}`"
          class="text-AddQuizColor bg-[#dbd2e5] md:w-[40%] py-1 rounded-md cursor-pointer px-3 w-[60%]"
        >
          اضافة سؤال جديد
          <font-awesome-icon :icon="['fas', 'plus']" class="px-2 pt-1" />
        </router-link>
      </div>
      <!-- question -->
      <div class="flex flex-col space-y-5 py-4 my-2">
        <div
          class="rounded-lg py-3 px-4 shadow-lg basis-[30vh] bg-white"
          v-for="(q, key) in QuizData.Questions"
          :key="key"
        >
          <h2 class="py-3">{{ q.questionText }}</h2>
          <div class="flex items-center gap-1">
            <hr class="w-3" />
            <span>الختيارات</span>
            <hr class="grow" />
          </div>
          <ul
            class="grid grid-cols-1 md:text-start text-center md:grid-cols-2 gap-3 my-2 py-2"
          >
            <li class="px-3" v-for="(c, k) in q.choices" :key="k">
              <font-awesome-icon
                :icon="['fas', 'circle']"
                class="mx-3"
                :class="`${
                  k + 1 === q.answer ? ' text-green-500' : 'text-red-800'
                }`"
              />
              {{ c }}
            </li>
          </ul>

          <div class="flex items-center justify-around py-2">
            <div
              class="outline-none bg-slate-300 border-none rounded-md py-1 px-10 cursor-pointer"
            >
              {{ q.time }} ثانية
            </div>
            <div
              class="outline-none bg-slate-300 border-none rounded-md py-1 px-10 cursor-pointer"
            >
              {{ q.point }} نقاط
            </div>
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
      QuizData: [],
    };
  },

  computed: {
    QiuzData() {
      const quizId = this.$route.params.QuizId;
      const Type = this.$route.params.QuizType;
      return { quizId, Type };
    },
  },
  methods: {
    async GetQuiziz() {
      const quizId = +this.$route.params.QuizId;

      await this.$store.dispatch("Quiz/GetAllQuiziz");
      this.QuizData = this.$store.getters["Quiz/getQuiz"].find(
        (q) => q.id === quizId
      );

      // this.QuizData = data.map((el) => {
      //   el.Questions = el.Questions.map((ul) => {
      //     return {
      //       ...ul,
      //       choices: [...ul.choices],
      //     };
      //   });
      // });
    },
  },
  created() {
    this.GetQuiziz();
  },
};
</script>

<style lang="scss" scoped>
hr {
  color: #ccc;
}
span {
  color: #b7a7a7;
  user-select: none;
}
</style>
