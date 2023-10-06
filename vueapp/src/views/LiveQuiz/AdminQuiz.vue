<template>
  <section class="min-h-screen bg-slate-950">
    <div
      v-if="!quizStarted && !Result"
      class="rounded-xl flex flex-col py-4 border-white md:w-[50%] m-auto w-3/4 h-[75vh]"
    >
      <h1 class="text-white text-center py-5 md:text-3xl text-xl">
        Wating Users
      </h1>
      <ul
        class="commentSec h-[80%] w-full md:w-3/4 m-auto space-y-3"
        v-if="connectedUsers.length > 0"
      >
        <li
          class="py-2 font-bold tracking-wider shadow-lg text-red-950 px-4 rounded-md bg-white"
          v-for="(user, k) in connectedUsers"
          :key="k"
        >
          {{ user }}
        </li>
      </ul>
      <button
        class="text-white bg-slate-500 md:w-[20%] w-[40%] py-1 rounded-md m-auto"
        @click="start"
        :disabled="connectedUsers.length > 0 ? false : true"
      >
        start Quiz
      </button>
    </div>

    <div
      v-else-if="quizStarted && !Result"
      class="min-h-screen bg-zinc-900 flex flex-col justify-center items-center"
    >
      <div
        class="md:w-3/4 rounded-l-lg w-[80%] m-auto quizBlock shadow-md shadow-current px-3"
      >
        <div
          class="text-white text-left lg:text-3xl md:text-2xl text-xl py-4 px-2"
        >
          <h2>{{ quizData.name }}</h2>
          <h3 class="py-2">description</h3>
          <p class="text-sm text-slate-400">{{ quizData.description }}</p>
        </div>
        <hr class="text-white" />
        <div
          class="flex justify-between px-2 py-4 flex-row-reverse text-white text-2xl"
        >
          <span class="w-1/2 text-left px-3"
            >{{ Qnumber }} / {{ currentQuestion + 1 }}
          </span>
          <ul class="w-1/2 px-3">
            <li>Participants view</li>
          </ul>
        </div>
        <hr class="my-3 text-slate-800" />
        <div class="flex flex-row-reverse px-4 flex-wrap gap-2 py-4">
          <span
            v-for="(user, k) in userAnswers"
            :key="k"
            :class="
              user.answer === 'right'
                ? 'bg-[rgba(0,128,0,.5)]'
                : 'bg-[rgba(240,52,52,.5)]'
            "
            class="w-16 h-16 bg-[rgba(240, 52, 52, 1)] text-white flex justify-center items-center border rounded-full"
            >{{ user.userName }}
          </span>
        </div>
      </div>
      <div class="border bg-[#1c1c23] w-full">
        <div class="w-[80%] m-auto px-4 py-4 rounded-lg my-1 bg-[#14141b]">
          <button
            v-if="endQuiz"
            @click="showResult"
            class="bg-[#ccc] text-black px-5 py-1 rounded-lg"
          >
            انهاء الاختبار
          </button>
          <button
            v-else
            class="bg-[#ccc] text-black px-5 py-1 rounded-lg"
            @click="NextQuestoin"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="Result"
      class="rounded-xl flex flex-col py-4 border-white md:w-[50%] m-auto w-3/4 h-[75vh]"
    >
      <h1
        class="text-white text-center py-5 md:text-3xl text-2xl tracking-wider"
      >
        Result
      </h1>
      <ul
        class="commentSec h-[80%] w-full md:w-3/4 m-auto space-y-7"
        v-if="connectedUsers.length > 0"
      >
        <li
          class="py-2 relative font-bold tracking-wider shadow-lg text-red-950 px-4 rounded-md bg-white flex justify-between"
          v-for="(user, k) in userAnswers"
          :key="k"
        >
          <div
            class="text-white top-[-23px] text-left absolute speed px-4 text-sm left-0"
          >
            Answer Speed
          </div>
          <div
            class="absolute h-[2px] top-0 bg-red-700 left-1"
            :style="{ width: progress(user.totalTime) + '%' }"
          ></div>
          <span> Right Answers : {{ user.rightAnsNum }} </span>

          <span>
            {{ user.userName }}
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { HubConnectionBuilder } from "@aspnet/signalr";

export default {
  data() {
    return {
      userAnswers: [],
      connection: null,
      quizStarted: false,
      connectedUsers: [],
      currentQuestion: 0,
      quizData: [],
      Qnumber: 0,
      endQuiz: false,
      Result: false,
    };
  },
  computed: {},
  methods: {
    progress(value) {
      console.log(value);
      const arr = [];
      this.userAnswers.forEach((el) => {
        arr.push(parseInt(el.totalTime));
      });
      let baseNum = Math.max(...arr);

      baseNum = baseNum + baseNum * 0.25;
      console.log(parseInt(value));
      const prog = (parseInt(value) / baseNum) * 100;
      console.log(prog);
      return prog;
    },
    showResult() {
      this.Result = true;
      this.connection.send("EndQuiz");
    },
    async getQuiz() {
      const QuizId = +this.$route.params.quizId;

      this.isLoading = true;
      try {
        await this.$store.dispatch("Quiz/GetAllQuiziz");
        const allQuiziz = this.$store.getters["Quiz/getQuiz"];
        this.quizData = allQuiziz.find((el) => el.id === QuizId);
        this.Qnumber = Object.keys(this.quizData.Questions).length;

        console.log(this.quizData);
        console.log(this.Qnumber);
        this.QuizType = this.quizData.type;

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
    NextQuestoin() {
      if (this.currentQuestion >= this.Qnumber) {
        this.endQuiz = true;

        return;
      }
      if (this.currentQuestion === this.Qnumber - 2) {
        this.endQuiz = true;
      }
      this.connection.send("NextQuestion");
      this.userAnswers = [];
    },
    start() {
      this.connection.send("StartQuiz");
      this.connection.on("Started", (value) => {
        this.quizStarted = value;
      });
    },
    async stopSignalRConnection() {
      if (this.connection) {
        this.connection.stop();
        // this.connection = null;
      }
    },
  },
  mounted() {
    this.getQuiz(); // create connection

    this.connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7243/hubs/LiveQuiz")
      .build();

    // connect to methods that hub invokes aka receive notifications from hub

    this.connection.on("UserConnected", (users) => {
      this.connectedUsers = Object.values(users);
    });
    this.connection.on("Started", () => {
      this.quizStarted = true;
      console.log(this.quizStarted);
    });
    this.connection.on("CurrentQuestionNumber", (val) => {
      this.currentQuestion = val;
      console.log(val, "current");
    });

    this.connection.on("UpdateUserAnswer", (data) => {
      const newData = data.map((item) => ({
        ...item,
        rightAnsNum: parseInt(item.rightAnsNum),
      }));
      this.userAnswers =  newData.slice().sort(
          (a, b) => b.rightAnsNum - a.rightAnsNum
        );
      console.log(this.userAnswers);
    });
    // invoke hub methods aka send notifications to hub

    // start connection
    this.connection
      .start()
      .then(() => {
        this.connection.invoke("RegisterUser", "admin", "admin");
      })
      .catch((err) => {
        console.error(err);
      });
  },
  beforeRouteLeave(to, from, next) {
    this.stopSignalRConnection(); // Stop the connection before leaving
    next(); // Continue with the navigation
  },
};
</script>

<style lang="scss" scoped>
.quizBlock {
  min-height: 80vh;
}
.commentSec {
  overflow: scroll;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent; /* Set the color of the scrollbar thumb and track */
}

.commentSec::-webkit-scrollbar {
  width: 0.5em; /* Adjust the width as needed */
}

.commentSec::-webkit-scrollbar-track {
  background: transparent; /* Set the background color of the scrollbar track */
}
</style>
