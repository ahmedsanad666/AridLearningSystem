<template>
  <section class="min-h-screen bg-black text-white flex flex-col gap-1 px-2">
    <quiz-head :rank="rank" :QNumber="QuestoinsNumber" />
    <quiz-content class="grow" ref="QuizContent" :Questions="quizData" />
    <quiz-footer />
  </section>
</template>

<script>
import QuizContent from "@/components/QuizTheme/QuizContent.vue";
import QuizHead from "../../components/QuizTheme/QuizHead.vue";
import QuizFooter from "@/components/QuizTheme/QuizFooter.vue";
export default {
  components: {
    QuizHead,
    QuizContent,
    QuizFooter,
  },
  data() {
    return {
      quizData: [],
      rank: 0,
      
    };
  },
  computed: {
    QuestoinsNumber() {
      return this.quizData.Questions.length;
    },
  },
  methods: {
    getQuiz() {
      const QuizId = 1;
      const allQuiziz = this.$store.getters["Quiz/getQuiz"];
      this.quizData = allQuiziz.find((el) => el.id === QuizId);
    },
   

  },
  created() {
    this.getQuiz();
  },
  async mounted() {
    await this.$refs.QuizContent.loadCurrentQ();
  },
};
</script>

<style></style>
