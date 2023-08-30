<template>
  <section
    class="bg-QuizContentBg rounded-t-xl px-2 py-1 flex flex-col justify-around relative"
  >
    <h1 class="md:text-4xl text-3xl text-center py-8 mt-11">
      {{ currentQuestoin.questionText }}
    </h1>

    <div class="py-5 flex justify-center items-center">
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
      AnsInput: "",
      RightAnswers: [],
      allQ: this.Questions.Questions,
      QCounter: 0,
      currentQuestoin: [],
    };
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

    loadCurrentQ() {
      if (this.QCounter > this.allQ.length - 1) {
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
        setTimeout(() => {
          this.nextQ();

          this.loadCurrentQ();
        }, 4000);
      } else {
        this.$emit("WrongAnswer");

        setTimeout(() => {
          this.nextQ();

          this.loadCurrentQ();
        }, 4000);
      }
    },
  },
};
</script>

<style></style>
