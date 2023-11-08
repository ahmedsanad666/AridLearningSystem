<template>
  <section
    class="min-h-screen py-4l flex md:flex-row flex-col bg-slate-50 gap-8"
  >
    <div
      class="md:w-[35%] w-[95%] mt-4 m-auto md:m-0 shadow-lg shadow-current flex flex-col gap-4"
    >
      <div class="px-3 py-4 h-[40vh]">
        <img
          class="w-full h-full rounded-lg object-cover"
          :src="`data:image/png;base64,${QuizData.imgByte}`"
          alt=""
        />
      </div>
      <div class="px-5">
        <h2><span>العنوان : </span> {{ QuizData.name }}</h2>
        <p class="my-4 px-3 break-words">
          <span class="inline-block w-full">الوصف</span>

          {{ QuizData.description }}
        </p>
      </div>
      <div class="px-5 flex flex-col gap-4">
        <div><span>التاريخ : </span> {{ QuizData.createdDate }}</div>
        <div><span v-if="user"> بواسطة : </span> {{ user }}</div>
      </div>
      <div class="px-5 my-4">
        <router-link
          :to="`/AllQuiziz/${QuizLink}`"
          class="py-1 rounded-md bg-[#27ae60] px-10 text-white"
          >نشر
        </router-link>
      </div>
    </div>
    <div class="md:w-1/2 w-3/4 px-4 py-3 min-h-screen md:m-0 m-auto">
        <h1 class="py-3 my-4">{{ QuizData.name }}</h1>
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

            <span
              v-if="
                QuizData.type === 'multipleChoices' ||
                QuizData.type === 'DragDrop'
              "
              >الختيارات</span
            >
            <span v-else-if="QuizData.type === 'fillTheBlank'">الاجابة</span>
            <hr class="grow" />
          </div>

          <ul
            v-if="
              QuizData.type === 'multipleChoices' ||
              QuizData.type === 'DragDrop'
            "
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
          <div v-else-if="QuizData.type === 'fillTheBlank'">
            <ul v-for="(e , k) in q.answers" :key="k">
              <li>{{ e }}</li>
            </ul>
            
          </div>
          <div v-else-if="QuizData.type === 'match'">
           <ul class=" py-3 w-[80%] m-auto flex justify-between ">
            
            <li v-for="(w , k) in q.choices" :key="k"> {{ w }}</li>
           </ul>
           <ul class=" py-3 w-[80%] m-auto grid grid-cols-4  ">
            
            <li v-for="(w , k) in q.pics" :key="k" class=" text-center">   <img class= "rounded-sm"
 style=" width: 50px;"          :src="`data:image/jpeg;base64,${w.imgByte
}`"
          
         
        /></li>
           </ul>
          </div>

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
      user: "",
    };
  },

  computed: {
    QiuzData() {
      const quizId = this.$route.params.QuizId;
      const Type = this.$route.params.QuizType;
      return { quizId, Type };
    },
    QuizLink() {
      if (this.QuizData.type === "multipleChoices") {
        return "MultipleQuiz";
      } else if (this.QuizData.type === "fillTheBlank") {
        return "fillTheBlank";
      } else if (this.QuizData.type === "DragDrop") {
        return "DragDrop";
      } else {
        return "match";
      }
    },
  },
  methods: {
    async GetQuiziz() {
      const quizId = +this.$route.params.QuizId;
      await this.$store.dispatch("Quiz/GetAllQuiziz");
      this.QuizData = this.$store.getters["Quiz/getQuiz"].find(
        (q) => q.id === quizId
      );

      const dateTimeString = this.QuizData.createdDate;
      this.QuizData.createdDate = new Date(dateTimeString)
        .toISOString()
        .split("T")[0];
      this.user = this.QuizData.apiUser.email;
     console.log(this.QuizData);
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
