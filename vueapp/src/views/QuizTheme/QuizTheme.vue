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
    <!-- ............................. -->
    <quiz-content
      v-if="QuizType === 'multipleChoices'"
      @update-streak="UpdateStreak"
      @set-time="SetTime($event)"
      @remove-check="removeCheck"
      @right-answer="RightAnswer"
      @wrong-answer="WrongAns"
      class="grow"
      ref="QuizContent"
      :Questions="quizData"
    />
    <fill-blank
      @remove-check="removeCheck"
      @wrong-answer="WrongAns"
      @update-streak="UpdateStreak"
      @right-answer="RightAnswer"
      @set-time="SetTime($event)"
      class="grow"
      v-else-if="QuizType === 'fillTheBlank'"
      ref="fillBlank"
      :Questions="quizData"
    ></fill-blank>
    <drag-drop
      @remove-check="removeCheck"
      @wrong-answer="WrongAns"
      @update-streak="UpdateStreak"
      @right-answer="RightAnswer"
      @set-time="SetTime($event)"
      class="grow"
      v-else-if="QuizType === 'DragDrop'"
      ref="drapDrop"
      :Questions="quizData"
    ></drag-drop>
    <quiz-match
      v-if="QuizType === 'match'"
      @update-streak="UpdateStreak"
      @set-time="SetTime($event)"
      @remove-check="removeCheck"
      @right-answer="RightAnswer"
      @wrong-answer="WrongAns"
      class="grow"
      ref="match"
      :Questions="quizData"
    />
    <!-- ......................... -->
    <quiz-footer ref="quizFooter" />
  </section>
</template>

<script>
import QuizContent from "@/components/QuizTheme/QuizContent.vue";
import QuizHead from "../../components/QuizTheme/QuizHead.vue";
import QuizFooter from "@/components/QuizTheme/QuizFooter.vue";
import FillBlank from "@/components/QuizTheme/FillBlank.vue";
import DragDrop from "@/components/QuizTheme/DragDrop.vue";
import QuizMatch from "@/components/QuizTheme/QuizMatch.vue";
export default {
  components: {
    FillBlank,
    QuizHead,
    QuizContent,
    QuizFooter,
    DragDrop,
    QuizMatch,
  },
  data() {
    return {
      quizData: [],
      QuizType: "",
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
      const QuizId = +this.$route.params.quizId;

      const allQuiziz = this.$store.getters["Quiz/getQuiz"];
      this.quizData = allQuiziz.find((el) => el.id === QuizId);
      this.QuizType = this.quizData.type;
    },
  },
  created() {
    this.getQuiz();
  },
  async mounted() {
    if (this.QuizType === "multipleChoices") {
      await this.$refs.QuizContent.loadCurrentQ();
    } else if (this.QuizType === "fillTheBlank") {
      await this.$refs.fillBlank.loadCurrentQ();
    } else if (this.QuizType === "DragDrop") {
      await this.$refs.drapDrop.loadCurrentQ();
    } else if (this.QuizType === "match") {
      await this.$refs.match.loadCurrentQ();
    }
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
