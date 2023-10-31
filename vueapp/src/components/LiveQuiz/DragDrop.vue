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
    class="bg-QuizContentBg rounded-t-xl px-2 py-1 flex flex-col justify-between relative"
  >
    <h1
      class="md:text-4xl text-3xl text-center py-8 mt-11"
      v-html="QuestionText"
      @dragover.prevent="dragOver"
      @drop.prevent="drop"
      @dragenter.prevent="dragEnter"
      ref="Qtext"
    ></h1>
    <div class="text-center py-4">
      <button
        @click="chekAns"
        class="bg-[#c0392b] py-2 px-20 rounded-lg tracking-widest hover:text-[#c0392b] hover:bg-[#ecf0f1]"
      >
        فحص
      </button>
    </div>

    <ul class="md:w-1/2 w-[90%] m-auto flex justify-between">
      <li
        draggable="true"
        @dragstart="handleDragStart($event, k + 1)"
        @click="chekAns(k)"
        ref="myLi"
        class="py-2 px-8 rounded-lg cursor-move select-none"
        :style="{ backgroundColor: getRandomColor() }"
        v-for="(q, k) in currentQuestoin.choices"
        :key="k"
      >
        {{ q }}
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: ["Questions"],
  data() {
    return {
      currentMood: "",
      RightAnswers: [],
      colors: [
        "#D9687C",
        "#EEB243",
        "#2C9CA6",
        "#347AC2",
        "#2c3e50",
        "#8e44ad",
        "#27ae60",
        "#2d3436",
      ],
      totalPoints: 0,

      allQ: this.Questions.Questions,
      currentQuestoin: [],
      QCounter: 0,
      QuestionText: "",
      answers: [],
      isLoading: false,
      QuizResults: [],
    };
  },
  computed: {
    currentUserId() {
      return this.$store.getters["auth/userId"];
    },
  },
  methods: {
    dragEnter(event) {},
    drop(event) {
      const elem = event.dataTransfer.getData("value");
      this.answers.push(+event.dataTransfer.getData("choiceKey"));
      event.target.innerHTML = elem;
    },
    handleDragStart(event, choiceKey) {
      event.dataTransfer.setData("value", event.target.innerHTML);
      event.dataTransfer.setData("choiceKey", choiceKey);
    },
    getRandomColor() {
      const randomColorIndex = Math.floor(Math.random() * this.colors.length);
      return this.colors[randomColorIndex];
    },
    nextQ() {
      this.QCounter++;
      /// display options
      this.$refs.myLi.forEach((el) => {
        el.style.visibility = "visible";
      });
      this.answers = [];
      // remove chek moode
      this.$emit("RemoveCheck");
      const data = {
        counter: this.QCounter,
        time: this.currentQuestoin.time,
      };

      this.$emit("SetTime", data);
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
            this.$emit("TokenQuiz");
            return;
          }
        });
      } catch (e) {
        this.error = e.message || "failed to send data";
      }
      this.isLoading = false;
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
    loadCurrentQ() {
      this.checkToken();
      this.allQ = Object.values(this.allQ);

      if (this.QCounter > this.allQ.length - 1) {
        this.currentMood = "showResult";
        this.AddResult();
        return;
      }

      this.currentQuestoin = this.allQ[this.QCounter];
      const parts = this.currentQuestoin.questionText.split(" ");
      this.QuestionText = parts.map((part) => {
        if (part === "---") {
          return `<span class="border px-8 rounded-lg test border-dashed " @dragover.prevent="dragOver" @drop.prevent=drop>---</span>`;
        }
        return part;
      });
      this.QuestionText = this.QuestionText.join(" ");
      const data = {
        counter: this.QCounter,
        time: this.currentQuestoin.time,
      };

      this.$emit("SetTime", data);
    },
    chekAns() {
      const rightAns = this.currentQuestoin.answers.map((proxy) => +proxy[0]);
      // const rightAns = this.currentQuestoin.answers;
      const answers = JSON.parse(JSON.stringify(this.answers));
      // const answers = this.answers;

      if (rightAns.length !== answers.length) {
        alert("fill all");
        return;
      }

      for (let i = 0; i < rightAns.length; i++) {
        if (rightAns[i] !== answers[i]) {
          this.$emit("WrongAnswer");
          setTimeout(() => {
            this.nextQ();
            this.loadCurrentQ();
          }, 4000);
          console.log("wrong");
          return;
        }
      }
      // ///////////////////////

      // this.RightAnswers.push(this.allQ.indexOf(this.currentQuestoin));
      // const lastIndex = this.RightAnswers.length - 1;

      // if (this.RightAnswers.length > 2) {
      //   if (
      //     this.RightAnswers[lastIndex - 1] -
      //       this.RightAnswers[lastIndex - 2] ===
      //       1 &&
      //     this.RightAnswers[lastIndex - 1] + 1 === this.RightAnswers[lastIndex]
      //   ) {
      //     // update streak
      //     this.$emit("UpdateStreak");
      //   }
      // }
      this.$emit("RightAnswer");
      this.totalPoints = this.totalPoints + this.currentQuestoin.point;

      setTimeout(() => {
        this.nextQ();

        this.loadCurrentQ();
      }, 4000);
    },
  },
};
</script>

<style lang="scss" scoped>
li:hover {
  transform: scale(1.02);
}
.test {
  transform: scale(1.1);
  border: 1px red solid;
  box-shadow: 0px 0px 4px rgba($color: #000000, $alpha: 1);
}
</style>
