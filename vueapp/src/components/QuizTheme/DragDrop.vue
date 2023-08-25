<template>
  <section
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
        check
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
      QuestionText: "",
      answers: [],
    };
  },
  computed: {},
  methods: {
    dragEnter(event) {
      console.log(event.target);
    },
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

    loadCurrentQ() {
      if (this.QCounter > this.allQ.length - 1) {
        return;
      }
      this.currentQuestoin = this.allQ[this.QCounter];
      const parts = this.currentQuestoin.question.split(" ");
      this.QuestionText = parts.map((part) => {
        if (part === "---") {
          return `<span class="border px-8 rounded-lg test border-dashed " @dragover.prevent="dragOver" @drop.prevent=drop>---</span>`;
        }
        return part;
      });
      this.QuestionText = this.QuestionText.join(" ");
      console.log(this.QuestionText);
      const data = {
        counter: this.QCounter,
        time: this.currentQuestoin.time,
      };

      this.$emit("SetTime", data);
    },
    chekAns() {
      const rightAns = this.currentQuestoin.answer;
      const answers = this.answers;

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
          return;
        }
      }
      // ///////////////////////
      this.RightAnswers.push(this.allQ.indexOf(this.currentQuestoin));
      const lastIndex = this.RightAnswers.length - 1;

      if (this.RightAnswers.length > 2) {
        if (
          this.RightAnswers[lastIndex - 1] -
            this.RightAnswers[lastIndex - 2] ===
            1 &&
          this.RightAnswers[lastIndex - 1] + 1 === this.RightAnswers[lastIndex]
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
      console.log("true");
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
