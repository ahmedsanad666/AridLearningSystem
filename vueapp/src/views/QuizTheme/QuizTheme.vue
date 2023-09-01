<template>
  <section class="min-h-screen bg-black text-white flex flex-col gap-1">
    <div
      v-if="!tokenQuiz"
      ref="timebar"
      class="progress-bar rounded-lg"
      :style="{ width: progressWidth + '%' }"
    ></div>
    <quiz-head
      v-if="!tokenQuiz"
      ref="QuizHead"
      :currentQNumber="currentQNumber"
      :rank="rank"
      :QNumber="Qnumber"
    />
    <!-- ............................. -->
    <quiz-content
      v-if="QuizType === 'multipleChoices'"
      @token-quiz="hideHeader"
      @update-streak="UpdateStreak"
      @set-time="SetTime($event)"
      @remove-check="removeCheck"
      @right-answer="RightAnswer"
      @wrong-answer="WrongAns"
      class="grow"
      ref="QuizContent"
      :Questions="questionsArray"
    />
    <fill-blank
    @token-quiz="hideHeader"
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
    @token-quiz="hideHeader"
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
    @token-quiz="hideHeader"
      v-else-if="QuizType === 'match'"
      @update-streak="UpdateStreak"
      @set-time="SetTime($event)"
      @remove-check="removeCheck"
      @right-answer="RightAnswer"
      @wrong-answer="WrongAns"
      class="grow"
      ref="match"
      :Questions="quizData"
    />
    <div v-else-if="QuizType === 'NoQuestionsYet'" class="my-4 py-5">
      <h1 class="text-white text-center md:text-4xl text-3xl">
        No Questions Added Yet
      </h1>
    </div>
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
      tokenQuiz: false,
      currentMood: "",
      Qnumber: 0,
      isLoading: false,
      error: "",
      quizData: [],
      questionsArray: [],
      QuizType: "",
      currentQNumber: 1,
      rank: 0,
      currentQuestionTime: 0, // Example time in seconds for the current question
      totalTimeForQuestion: 0, // Example total time in seconds for the question
      progressWidth: 100, // Initial progress width in percentage
    };
  },
  computed: {},
  methods: {
    hideHeader() {
      this.tokenQuiz = true;
    },
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

    checkEmptyObj(obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    },
    async getQuiz() {
      const QuizId = +this.$route.params.quizId;

      this.isLoading = true;
      try {
        await this.$store.dispatch("Quiz/GetAllQuiziz");
        const allQuiziz = this.$store.getters["Quiz/getQuiz"];
        this.quizData = allQuiziz.find((el) => el.id === QuizId);
        this.Qnumber = Object.keys(this.quizData.Questions).length;
        this.QuizType = this.quizData.type;
        console.log(this.QuizType);
        if (this.checkEmptyObj(this.quizData.Questions)) {
          this.QuizType = "NoQuestionsYet";
          return;
        }
        const questionsArray = [];
        for (let i = 0; i < this.Qnumber; i++) {
          questionsArray[i] = this.quizData.Questions[i];
        }
        this.questionsArray = questionsArray;
      } catch (e) {
        console.log("failed");
        this.error = e.message || "failed to get data";
      }
      this.isLoading = false;
    },
  },
  created() {},
  async mounted() {
    this.tokenQuiz = false;
    await this.getQuiz();
    if (this.QuizType === "multipleChoices") {
      await this.$refs.QuizContent.loadCurrentQ();
    } else if (this.QuizType === "fillTheBlank") {
      await this.$refs.fillBlank.loadCurrentQ();
    } else if (this.QuizType === "DragDrop") {
      await this.$refs.drapDrop.loadCurrentQ();
    } else if (this.QuizType === "match") {
      await this.$refs.match.loadCurrentQ();
    }
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
