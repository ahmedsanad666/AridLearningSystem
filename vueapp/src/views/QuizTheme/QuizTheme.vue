<template>
  <section class="min-h-screen bg-black text-white flex flex-col gap-1">
    <div
      ref="timebar"
      class="progress-bar rounded-lg"
      :style="{ width: progressWidth + '%' }"
    ></div>
    <quiz-head
      ref="QuizHead"
      :currentQNumber="currentQNumber"
      :rank="rank"
      :QNumber="QuestoinsNumber"
    />
    <quiz-content
      @update-streak="UpdateStreak"
      @set-time="SetTime($event)"
      @remove-check="removeCheck"
      @right-answer="RightAnswer"
      @wrong-answer="WrongAns"
      class="grow"
      ref="QuizContent"
      :Questions="quizData"
    />
    <quiz-footer ref="quizFooter" />
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
      currentQNumber: 1,
      rank: 0,
      currentQuestionTime: 0, // Example time in seconds for the current question
      totalTimeForQuestion: 0, // Example total time in seconds for the question
      progressWidth: 100, // Initial progress width in percentage
    };
  },
  computed: {
    QuestoinsNumber() {
      return this.quizData.Questions.length;
    },
  },
  methods: {
    UpdateStreak() {
      this.$refs.QuizHead.updateStreak();
    },
    SetTime(data) {
      this.currentQNumber = data.counter + 1;
      this.progressWidth = 100;
      this.currentQuestionTime = data.time;
      this.totalTimeForQuestion = data.time;

      this.startQuestionTimer();
    },
    startQuestionTimer() {
      const interval = setInterval(() => {
        this.$refs.timebar.style.transition = " width 1s linear";
        if (this.currentQuestionTime > 0) {
          this.currentQuestionTime--;
          this.progressWidth =
            (this.currentQuestionTime / this.totalTimeForQuestion) * 100;
        } else {
          clearInterval(interval);
        }
      }, 1000);
    },
    removeCheck() {
      this.$refs.quizFooter.removeCheck();
      this.$refs.timebar.style.transition = "none";
    },
    RightAnswer() {
      this.$refs.quizFooter.RightAns();
    },
    WrongAns() {
      this.$refs.quizFooter.WrongAns();
    },

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
    this.startQuestionTimer();
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
  background-color: #3498db;
  height: 0.3rem;
  width: 100%;
}
</style>
