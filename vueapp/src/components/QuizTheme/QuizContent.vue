<template>
  <section
    class="bg-QuizContentBg rounded-t-xl px-2 py-1 flex flex-col justify-between relative"
  >
    <h1 class="md:text-4xl text-3xl text-center py-8 mt-11">
      {{ currentQuestoin.questionText }}
    </h1>

    <ul
      class="w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 basis-[40vh] gap-3"
    >
      <li
        @click="chekAns(k)"
        ref="myLi"
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
      allQ: this.Questions,
      currentQuestoin: [],
      QCounter: 0,
    };
  },
  computed: {},
  methods: {
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
      // remove chek moode
      this.$emit("RemoveCheck");
      const data = {
        counter: this.QCounter,
        time: this.currentQuestoin.time,
      };

      this.$emit("SetTime", data);
    },

    loadCurrentQ() {
      // if (this.QCounter > this.allQ.length - 1) {
      //   return;
      // }
      console.log(this.allQ);
      this.currentQuestoin = this.allQ[this.QCounter];
      const data = {
        counter: this.QCounter,
        time: this.currentQuestoin.time,
      };

      this.$emit("SetTime", data);
    },
    chekAns(choice) {
      const answer = this.currentQuestoin.answer - 1;
      if (choice == answer) {
        // streak
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

        //............
        this.$refs.myLi.forEach((el) => {
          el.style.visibility = "hidden";
        });
        this.$refs.myLi[answer].style.visibility = "visible";
        this.$emit("RightAnswer");
        setTimeout(() => {
          this.nextQ();

          this.loadCurrentQ();
        }, 4000);
      } else {
        this.$emit("WrongAnswer");
        this.$refs.myLi.forEach((el) => {
          el.style.visibility = "hidden";
        });
        this.$refs.myLi[choice].style.visibility = "visible";
        this.$refs.myLi[answer].style.visibility = "visible";
        setTimeout(() => {
          this.nextQ();
          this.loadCurrentQ();
        }, 4000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
li:hover {
  transform: scale(1.02);
}
</style>
