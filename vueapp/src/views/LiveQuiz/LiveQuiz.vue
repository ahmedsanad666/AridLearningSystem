<template>
  <section class="min-h-screen bg-slate-950">
    <div v-if="!enterQuiz" class="min-h-screen py-40">
      <div class="m-auto bg-slate-800 md:w-1/3 h-[10vh] py-4 px-5 rounded-lg">
        <input
          type="text"
          class="py-1 px-4 mx-3 rounded-md"
          ref="userNameInput"
          placeholder=" uer name"
        />
        <button
          @click="registerUser"
          class="py-1 px-4 rounded-md text-white bg-red-700"
        >
          Submit
        </button>
      </div>
    </div>
    <div v-else-if="!quizStarted && enterQuiz">
      <h1
        class="text-center text-xl font-bold text-white py-6 md:text-3xl tracking-wider"
      >
        الرجاء انتظار حتى يبدا الاختبار
      </h1>
      <h1
        class="text-center text-xl font-bold text-white py-2 md:text-3xl tracking-wider"
      >
        ...............................
      </h1>

      {{ quizStarted }}
    </div>
    <div v-else-if="quizStarted && enterQuiz">
      <section
        v-if="endQuiz"
        class="rounded-xl flex flex-col py-4 md:w-[50%] m-auto w-3/4 h-[75vh]"
      >
        <h1
          class="text-white text-center py-5 md:text-3xl text-2xl tracking-wider"
        >
          Result
        </h1>

        <div
          class="py-2 font-bold tracking-wider shadow-lg text-red-950 px-4 rounded-md bg-white flex justify-between"
        >
          <span> Right Answers : {{ RightAnsNum }} </span>
          <span>
            {{ userName }}
          </span>
        </div>
      </section>
      <section
        v-else
        class="min-h-screen bg-black text-white flex flex-col gap-1"
      >
        <div
          ref="timebar"
          class="progress-bar rounded-lg"
          :style="{ width: progressWidth + '%' }"
        ></div>
        <quiz-head
          ref="QuizHead"
          :currentQNumber="currentQNumber"
          :rank="rank"
          :QNumber="Qnumber"
        />
        <!-- ............................. -->
        <quiz-content
          :QCounter="QCounter"
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
    </div>
  </section>
</template>

<script>
import { HubConnectionBuilder } from "@aspnet/signalr";
import QuizContent from "@/components/LiveQuiz/QuizContent.vue";
import QuizHead from "../../components/LiveQuiz/QuizHead.vue";
import QuizFooter from "@/components/LiveQuiz/QuizFooter.vue";
import FillBlank from "@/components/LiveQuiz/FillBlank.vue";
import DragDrop from "@/components/LiveQuiz/DragDrop.vue";
import QuizMatch from "@/components/LiveQuiz/QuizMatch.vue";
import { ApiOriginUrl } from "@/store/index";
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
      endQuiz: false,
      //...........choice quiz
      QCounter: 0,
      //.................
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
      userStoppedTime: 0,
      progressWidth: 100, // Initial progress width in percentage
      ///............
      userconnection: null,
      quizStarted: false,
      enterQuiz: false,
      userName: "",
      RightAnsNum: 0,
    };
  },
  computed: {},
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
        if (this.userStoppedTime > 0) {
          clearInterval(interval);
        }
      }, 1000);
    },
    stopQuestionTimer() {
      this.userStoppedTime = this.userStoppedTime + this.currentQuestionTime;
    },
    removeCheck() {
      this.$refs.quizFooter.removeCheck();
      this.$refs.timebar.style.transition = "none";
    },
    RightAnswer() {
      this.$refs.quizFooter.RightAns();
      this.RightAnsNum++;
      this.submitAnswer("right");
    },
    WrongAns() {
      this.$refs.quizFooter.WrongAns();
      this.submitAnswer("wrong");
    },

    submitAnswer(answer) {
      this.stopQuestionTimer();
      console.log(this.userStoppedTime);
      const userName = this.userName;
      const rightAnsNum = this.RightAnsNum + "";
      this.userconnection.invoke(
        "SubmitAnswer",
        userName,
        answer,
        rightAnsNum,
        this.userStoppedTime.toString()
      );
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
    //........................
    async stopSignalRConnection() {
      if (this.userconnection) {
        this.connection.stop();
        // this.connection = null;
      }
    },
    async registerUser() {
      this.userName = this.$refs.userNameInput.value;
      // create connection
      this.userconnection.invoke("RegisterUser", this.userName, "user");
      localStorage.setItem("presentationId", this.$route.params.presentationId);
      localStorage.setItem("userName", this.userName);

      this.enterQuiz = true;
      //start

      // // Listen for updates on connected users only if this is the admin page
      // this.userconnection.on("UserConnected", (users) => {
      //   this.connectedUsers = users;
      // });
    },
    async loadquizdata() {
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

      console.log("stared quiz", this.quizStarted, this.enterQuiz);
    },
  },
  watch: {
    quizStarted(val) {
      if (val) {
        this.loadquizdata();
      }
    },
  },
  created() {
    const currentPresentationId  = this.$route.params.presentationId;
    const currentUserName = this.userName;
    const presentationId = localStorage.getItem("presentationId");
    const userName = localStorage.getItem("userName");
    console.log(localStorage.getItem('quizStarted'));
     this.quizStarted = localStorage.getItem('quizStarted')
    console.log(currentUserName === userName )
    if (!!presentationId && !!userName && presentationId === currentPresentationId  ) {
console.log('tamaam thisi is user');
      this.userName = userName;
      this.enterQuiz = true;
    }else{
      localStorage.removeItem("presentationId");
      localStorage.removeItem("userName");
      localStorage.removeItem("quizStarted");
    }

  },
  async mounted() {
    // create connection
    this.userconnection = new HubConnectionBuilder()
      .withUrl(`${ApiOriginUrl}/hubs/LiveQuiz`)
      .build();

    this.userconnection.on("Started", (value) => {
      this.quizStarted = value;
      localStorage.setItem('quizStarted',true)
      console.log(this.quizStarted + ' stareded quiz now ');
    });

    
    this.userconnection.on("AlreadyStarted", (val) => {
      this.quizStarted = val;
    });
    this.userconnection.on("CurrentQuestionNumber", (val) => {
      this.QCounter = val;
      console.log(this.QCounter, "livequiz page");
    });
    this.userconnection.on("endQuiz", () => {
      localStorage.removeItem("presentationId");
      localStorage.removeItem("userName");
      localStorage.removeItem("quizStarted");
    
      this.endQuiz = true;
    });

    this.userconnection
      .start()
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });

    // this.connection = new HubConnectionBuilder()
    //   .withUrl("https://localhost:7243/hubs/LiveQuiz")
    //   .build();

    // connect to methods that hub invokes aka receive notifications from hub

    // this.connection.on("UserConnected", (users) => {
    //   this.connectedUsers = Object.values(users);
    // });
    // this.connection.on("Started", () => {
    //   this.quizStarted = true;
    //   console.log(this.quizStarted);
    // });

    // invoke hub methods aka send notifications to hub

    // start connection
    // this.connection
    //   .start()
    //   .then(() => {
    //     this.connection.invoke("RegisterUser", "admin", "admin");
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });

    //...........................
  },
  beforeRouteLeave(to, from, next) {
    this.stopSignalRConnection(); // Stop the connection before leaving
    next(); // Continue with the navigation
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
