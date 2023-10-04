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
    <ul class="w-full grid grid-cols-4 basis-[15vh] md:gap-8 gap-3">
      <li
        ref="myLi"
        draggable="true"
        @dragstart="dragStart($event, q.answerIndex, k, q.imgByte)"
        :style="{ backgroundColor: getRandomColor() }"
        class="flex justify-center grow items-center md:py-0 py-3 background-container md:text-3xl text-2xl rounded-md cursor-pointer"
        v-for="(q, k) in currentQuestoin.pics"
        :key="k"
      >
        <img
          :src="`data:image/jpeg;base64,${q.imgByte}`"
          alt=""
          class="md:h-3/4 md:w-3/4 lg:w-1/2 lg:h-1/2 object-contain"
        />
      </li>
    </ul>
    <!-- .......................... -->
    <ul class="w-full grid grid-cols-4 basis-[20vh] md:gap-8 gap-3">
      <li
        @dragleave="dragLeave"
        @dragenter="dragEnter"
        @drop.prevent="drop($event, k + 1)"
        @dragover.prevent="dragOver"
        :style="{ backgroundColor: getRandomColor() }"
        class="flex justify-center grow items-center md:py-0 py-3 background-container md:text-3xl text-2xl rounded-md cursor-pointer"
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
      allQ: this.Questions.Questions,
      currentQuestoin: [],
      QCounter: 0,
      answers: [],
      totalPoints: 0,
      currentMood: "",
      counter: 0,
      QuizResults: [],
      isLoading: false,
    };
  },
  computed: {
    currentUserId() {
      return this.$store.getters["auth/userId"];
    },
  },
  methods: {
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
          if (el.apiUser.id === userId || el.quizId === quizId) {
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
    dragEnter(event) {
      event.target.classList.add("hoverd");
    },
    dragLeave(event) {
      event.target.classList.remove("hoverd");
    },
    drop(event, choice) {
      const elem = event.dataTransfer.getData("value");
      const rightAns = +event.dataTransfer.getData("righAnswer");
      const draggedItem = event.dataTransfer.getData("draggedItem");
      const imgSrc = event.dataTransfer.getData("imgSrc");
      const currentChoice = choice;
      this.counter++;

      if (rightAns === currentChoice) {
        this.answers.push(true);

        // this.$emit("RightAnswer");
      } else {
        // this.$emit("WrongAnswer");
        this.answers.push(false);
      }
      this.chekAns();
      // this.chekAns(rightAns, currentChoice);
      this.$refs.myLi[draggedItem].classList.add("draggedElem");
      this.$refs.myLi[draggedItem].setAttribute("draggable", "false");
      event.target.innerHTML = "";
      event.target.insertAdjacentHTML(
        "afterbegin",
        `<img class="md:h-3/4 md:w-3/4 lg:w-1/2 lg:h-1/2 object-contain" src="data:image/jpeg;base64,${imgSrc}"> </img>`
      );
    },
    dragStart(event, index, itemId, imgSrc) {
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("value", event.target);
      event.dataTransfer.setData("righAnswer", index);
      event.dataTransfer.setData("draggedItem", itemId);
      event.dataTransfer.setData("imgSrc", imgSrc);
    },
    getRandomColor() {
      const randomColorIndex = Math.floor(Math.random() * this.colors.length);
      return this.colors[randomColorIndex];
    },
    nextQ() {
      this.QCounter++;
      this.counter = 0;
      this.answers = [];
      this.$refs.myLi.forEach((el) => {
        el.setAttribute("draggable", "true");
        el.classList.remove("draggedElem");
      });
      /// display options
      this.$refs.myLi.forEach((el) => {
        el.style.visibility = "visible";
      });
      // remove chek moode
      this.$emit("RemoveCheck");
      const data = {
        counter: this.QCounter,
        time: this.currentQuestoin.time,
      };

      this.$emit("SetTime", data);
    },

    loadCurrentQ() {
      this.checkToken();
      console.log(this.QCounter, this.allQ.length - 1);
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
      if (this.counter === this.currentQuestoin.choices.length) {
        if (this.answers.some((el) => el === false)) {
          // loss
          this.$emit("WrongAnswer");

          setTimeout(() => {
            this.nextQ();

            this.loadCurrentQ();
          }, 1000);
        } else {
          this.$emit("RightAnswer");
          this.totalPoints = this.totalPoints + this.currentQuestoin.point;
          setTimeout(() => {
            this.nextQ();

            this.loadCurrentQ();
          }, 1000);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
li:hover {
  transform: scale(1.02);
}
li.hoverd {
  transform: scale(1.03);
}
.draggedElem {
  visibility: hidden !important;
  user-select: none;
}
</style>
