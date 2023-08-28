<template>
  <section
    class="min-h-screen py-3 md:w-1/2 w-3/4 m-auto shadow-md my-3 rounded-md"
  >
    <add-quiz ref="AddQuiz" :Type="Type"></add-quiz>
    <h1
      class="py-4 my-4 text-center md:text-3xl text-2xl font-bold text-AddQuizColor"
    >
      انشاء اختبار
    </h1>

    <div>
      <ul class="grid md:grid-cols-2 gap-4 w-[90%] m-auto py-3 px-2">
        <li
          class="font-bold rounded-lg px-4 text-center cursor-pointer py-2 shadow-lg"
          v-for="QuizType in QuizTypes"
          :key="QuizType.id"
          @click="AddQuizDialog(QuizType.EnName)"
        >
          {{ QuizType.arName }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import AddQuiz from "@/components/AddQuiz/AddQuiz.vue";

export default {
  components: { AddQuiz },
  data() {
    return {
      Type: "",
      QuizTypes: [
        {
          arName: "اختبارات متعددة",
          EnName: "multipleChoices",
        },
        {
          arName: " املا الفراغات",
          EnName: "fillTheBlank",
        },
        {
          arName: "سحب اسقاط",
          EnName: "DragDrop",
        },
        {
          arName: "تطابق",
          EnName: "match",
        },
      ],
    };
  },
  methods: {
    AddQuizDialog(Type) {
      this.Type = Type;
      this.$refs.AddQuiz.showDialog();
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  &:hover {
    transform: scale(1.03);
  }
}
</style>
