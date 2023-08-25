<template>
  <section
    class="bg-QuizContentBg rounded-t-xl px-2 py-1 flex flex-col justify-around relative"
  >
    <ul class="w-full grid grid-cols-4 basis-[15vh] md:gap-8 gap-3">
      <li
        ref="myLi"
        draggable="true"
        @dragstart="dragStart($event, q.answer, k, q.img)"
        :style="{ backgroundColor: getRandomColor() }"
        class="flex justify-center grow items-center md:py-0 py-3 background-container md:text-3xl text-2xl rounded-md cursor-pointer"
        v-for="(q, k) in currentQuestoin.Pics"
        :key="k"
      >
        <img
          :src="q.img"
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
      counter: 0,
    };
  },
  computed: {},
  methods: {
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
        this.$emit("RightAnswer");
      } else {
        this.$emit("WrongAnswer");
        this.answers.push(false);
      }
      this.chekAns();
      // this.chekAns(rightAns, currentChoice);
      this.$refs.myLi[draggedItem].classList.add("draggedElem");
      this.$refs.myLi[draggedItem].setAttribute("draggable", "false");
      event.target.innerHTML = "";
      event.target.insertAdjacentHTML(
        "afterbegin",
        `<img class="md:h-3/4 md:w-3/4 lg:w-1/2 lg:h-1/2 object-contain" src="${imgSrc}"> </img>`
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
      if (this.QCounter > this.allQ.length - 1) {
        return;
      }
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
          setTimeout(() => {
            this.nextQ();

            this.loadCurrentQ();
          }, 1000);
        } else {
          // wind
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
