<template>
  <section
    class="bg-QuizContentBg rounded-t-xl px-1 py-1 flex flex-col justify-between"
  >
    <h1 class="md:text-4xl text-3xl text-center py-8 mt-11">
      {{ currentQuestoin.question }}
    </h1>

    <ul
      class="w-full grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 basis-[40vh] gap-3"
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
    };
  },
  computed: {},
  methods: {
    getRandomColor() {
      const randomColorIndex = Math.floor(Math.random() * this.colors.length);
      return this.colors[randomColorIndex];
    },

    loadCurrentQ() {
      this.currentQuestoin = this.allQ[this.QCounter];
      console.log(this.currentQuestoin);
    },
    chekAns(choice) {
      const answer = this.currentQuestoin.answer - 1;
      if (choice == answer) {
        console.log("wind");
      } else {
        console.log("failed");
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
