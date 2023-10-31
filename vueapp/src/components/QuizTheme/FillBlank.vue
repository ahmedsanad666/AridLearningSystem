<template>
  <section v-if="currentMood === 'showResult'" class="py-6">
    <base-spinner v-if="isLoading"></base-spinner>
    <div
      v-else
      class="resultBox m-auto rounded-lg my-5 lg:w-[25%] md:w-[50%] w-[60%] border"
    >
      <h2
        class="py-6 rounded-lg text-center font-bold md:text-3xl text-2xl bg-QuizContentBg"
      >
        Quiz Rank
      </h2>
      <ul class="space-y-3 px-1 py-2">
        <li
          v-for="(result, key) in QuizResults"
          :key="key"
          class="rounded-md cursor-pointer flex justify-between px-4 py-3 text-black font-bold"
          :class="`${
            result.apiUser.id === currentUserId ? ' bg-green-500' : ' bg-white'
          }`"
        >
          <span>{{ result.apiUser.enName }}</span>
          <span>{{ result.totalPoints }}</span>
        </li>
      </ul>
    </div>
  </section>
  <section v-else-if="currentMood === 'TokenQuiz'">
    <h1 class="text-center py-3 font-bold lg:text-3xl md:text-2xl text-xl">
      already Token
    </h1>
    <base-spinner v-if="isLoading"></base-spinner>
    <div
      v-else
      class="resultBox m-auto rounded-lg my-5 lg:w-[25%] md:w-[50%] w-[60%] border"
    >
      <h2
        class="py-6 rounded-lg text-center font-bold md:text-3xl text-2xl bg-QuizContentBg"
      >
        Quiz Rank
      </h2>
      <ul class="space-y-3 px-1 py-2">
        <li
          v-for="(result, key) in QuizResults"
          :key="key"
          class="rounded-md cursor-pointer flex justify-between px-4 py-3 text-black font-bold"
          :class="`${
            result.apiUser.id === currentUserId ? ' bg-green-500' : ' bg-white'
          }`"
        >
          <span>{{ result.apiUser.enName }}</span>
          <span>{{ result.totalPoints }}</span>
        </li>
      </ul>
    </div>
  </section>
  <section
    v-else
    class="bg-QuizContentBg rounded-t-xl px-2 py-1 flex flex-col justify-around relative"
  >
    <h1 class="md:text-4xl text-3xl text-center py-8 mt-11">
      {{ currentQuestoin.questionText }}
    </h1>

    <div class="py-5 flex justify-center gap-4 items-center">
      <button @click="chekAns" class=" py-3 px-6  rounded-lg  bg-white  text-slate-700">ارسال</button>
      <input
        @keyup.enter="chekAns"
        v-model.trim="AnsInput"
        type="text"
        class="py-3 px-4 bg-[rgba(0,0,0,.5)] tracking-widest outline-none lg:w-[20%] md:w-[40%] w-[50%] rounded-lg"
      />
    </div>
  </section>
</template>

<script>
export default {
  props: ["Questions"],
  data() {
    return {
      totalPoints: 0,

      currentMood: "",
      isLoading: false,
      QuizResults: [],

      AnsInput: "",
      RightAnswers: [],
      allQ: this.Questions.Questions,
      QCounter: 0,
      currentQuestoin: [],
    };
  },
  computed: {
    currentUserId() {
      return this.$store.getters["auth/userId"];
    },
  },
  methods: {
    nextQ() {
      this.AnsInput = "";

      this.QCounter++;
      /// display options

      // remove chek moode
      this.$emit("RemoveCheck");
      const data = {
        counter: this.QCounter,
        time: this.currentQuestoin.time,
      };

      this.$emit("SetTime", data);
    },
    async AddResult() {
      const quizId = +this.$route.params.quizId;
      const userId = this.$store.getters["auth/userId"];
      const payload = {
        totalPoints: this.totalPoints,
        quizId: quizId,
        apiUserId: userId,
      };
      this.isLoading = true;
      try {
        await this.$store.dispatch("Quiz/AddQuizResult", payload);
        this.QuizResults = this.$store.getters["Quiz/getQuizResults"];
        this.QuizResults = this.QuizResults.slice().sort(
          (a, b) => b.totalPoints - a.totalPoints
        );
      } catch (e) {
        this.error = e.message || "failed to send data";
      }
      this.isLoading = false;
    },
    async checkToken() {
      const quizId = +this.$route.params.quizId;
      const userId = this.$store.getters["auth/userId"];
      this.isLoading = true;
      try {
        await this.$store.dispatch("Quiz/GetSingleQuizResult", quizId);
        const results = this.$store.getters["Quiz/getsingleQuizResult"];

        results.some((el) => {
          if (el.apiUser.id === userId && el.quizId === quizId) {
            this.currentMood = "TokenQuiz";
            this.QuizResults = results;
            this.QuizResults = this.QuizResults.slice().sort(
              (a, b) => b.totalPoints - a.totalPoints
            );
            console.log(this.QuizResults);

            this.$emit("TokenQuiz");
            return;
          }
        });
      } catch (e) {
        this.error = e.message || "failed to send data";
      }
      this.isLoading = false;
    },
    loadCurrentQ() {
      this.checkToken();
      if (this.QCounter > this.allQ.length - 1) {
        this.currentMood = "showResult";
        this.AddResult();
        return;
      }
      this.allQ = Object.values(this.allQ);
      this.currentQuestoin = this.allQ[this.QCounter];
      const data = {
        counter: this.QCounter,
        time: this.currentQuestoin.time,
      };

      this.$emit("SetTime", data);
    },
    chekAns() {
      const answer = this.currentQuestoin.answer;

      if (this.AnsInput === answer) {
        //     // streak
        this.RightAnswers.push(this.allQ.indexOf(this.currentQuestoin));
        const lastIndex = this.RightAnswers.length - 1;

        if (this.RightAnswers.length > 2) {
          if (
            this.RightAnswers[lastIndex - 1] -
              this.RightAnswers[lastIndex - 2] ===
              1 &&
            this.RightAnswers[lastIndex - 1] + 1 ===
              this.RightAnswers[lastIndex]
          ) {
            // update streak
            this.$emit("UpdateStreak");
          }
        }

        this.$emit("RightAnswer");
        this.totalPoints = this.totalPoints + this.currentQuestoin.point;

        setTimeout(() => {
          this.nextQ();

          this.loadCurrentQ();
        }, 4000);
      } else {
        this.$emit("WrongAnswer");

        setTimeout(() => {
          this.nextQ();

          this.loadCurrentQ();
        }, 2000);
      }
    },
  },
};
</script>

<style></style>
