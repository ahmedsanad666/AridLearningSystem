<template>
  <section class="bg-mianColor h-screen py-4 relative">
    <!-- <div  v-if="currentState === 'studying'">

     <img src="../assets/images/gif/studying.gif" alt="" class="w-[50px] m-auto">
    </div> -->
    <audio ref="correct" preload="auto" class="hidden">
      <source src="../assets/images/audio/correct.mp3" type="audio/mp3" />
    </audio>
    <audio ref="fail" preload="auto" class="hidden">
      <source src="../assets/images/audio/fail.mp3" type="audio/mp3" />
    </audio>
    <div
      class="flex justify-between items-center mx-auto py-6 mb-3 w-[90%] border-secondText border-b"
    >
      <base-button
        @click="Exit()"
        text="Exit"
        class="text-mianColor px-7"
        bg="bg-red"
      />
      <h1
        class="text-center lg:text-4xl text-2xl font-bold tracking-wide text-mainText"
      >
        {{ lessonName }}
      </h1>
      <div class="flex flex-col space-y-1">
        <span>
          {{ Score }}
        </span>
        <span> SCORE </span>
      </div>
    </div>

    <!-- ...................... -->

    <div
      class="h-3/4 overflow-scroll container bg-[#f9f9f9] lg:w-1/2 w-3/4 shadow-xl rounded-xl quizSec"
    >
      <!-- ,,,,,,,,,,,,,,,,,,,,,,,,,, comments componnet  -->
      <div
        @click="showCommentBox"
        v-if="!commentBox && currentState == 'quize'"
        class="cursor-pointer absolute right-4 top-[21%] rounded-lg shadow-xl py-1 px-3"
      >
        <span>Slide Comments {{ count }} </span>
      </div>
      <div
        v-else-if="currentState == 'quize' && commentBox"
        ref="CommentBox"
        class="commentBox absolute right-4 top-[19%] h-[70%] lg:w-[23%] w-[80%] rounded-lg shadow-lg py-3 px-4"
      >
        <comments-box
          :slideId="currentSlide.id"
          @hide-comment="HideCommentBox"
        ></comments-box>
      </div>

      <!-- .................. comments component  -->
      <div class="py-3 px-4">
        <!-- studing sectino -->
        <div
          v-if="currentState === 'studying'"
          v-html="currentSlide.content"
        ></div>
        <!-- :rightAns="rightAns" -->
        <!-- quiz section -->
        <div v-else-if="currentState == 'quize'" class="space-y-4">
          <quiz-section
            :question="currentQuestion.questionText"
            :choices="currentQuestion.choices"
            :rightAns="currentQuestion.answer"
            ref="quizSec"
            @MyEvent="setCurrentChoice($event)"
          ></quiz-section>

          <div
            v-if="isRightAns && checkedMode"
            class="max-w-xl mx-auto flex flex-col justify-center items-center rounded-md text-green-900 md:text-3xl text-xl py-4 px-3"
          >
            <img src="../assets/images/gif/GreatWork.gif" class="greatWork" />
            <p class="text-center py-2 my-1">Keep Going !!</p>
          </div>
          <div
            v-if="!isRightAns && checkedMode"
            class="max-w-xl mx-auto flex justify-center items-center rounded-md text-red-900 md:text-3xl text-xl py-4 px-3 w-[24rem]"
          >
            <img src="../assets/images/gif/Wrong.gif" class="Wrong" />
          </div>
          <div
            v-if="showWarning"
            class="border-2 max-w-xl mx-auto flex justify-center relative items-center rounded-md text-red-900 md:text-3xl text-xl border-red-500 py-4 px-3"
          >
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              class="cursor-pointer absolute right-2 top-2 p-2 rounded-md border"
              @click="showWarning = false"
            />
            {{ warning }}
          </div>

          <div></div>
        </div>
        <div v-else>
          <div class="flex flex-col items-center justify-center">
            <img
              src="../assets/images/gif/endLesson.gif"
              class="py-4 my-3 endImg"  
            />
            <h3 class="text-2xl font-bold text-center py-3  text-zinc-600 "> lesson completed!</h3>
            <p
              class="py-2 text-center md:text-2xl text-xl text-slate-500 max-w-xl font-sans"
            >
              You’re one step closer to reaching your goal!
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- .......................... -->

    <div
      class="controllers border-t border-secondText mt-3 py-5 w-[95%] mx-auto text-end"
    >
      <button
        class="bg-[#2980b9] py-3 px-9 rounded-xl mx-8 text-mianColor"
        v-if="currentState === 'studying'"
        @click="moveToQuize()"
      >
        continue
      </button>
      <div class="w-3/4 flex justify-between mx-auto" v-else>
        <button
          class="bg-none border-2 border-[#2980b9] py-3 px-9 rounded-xl mx-8 text-lightBlack"
          v-if="currentState === 'quize'"
          @click="backToSlides()"
        >
          back to slides
        </button>
        <!-- .... quize serction.. -->

        <button :disabled="lockState" @click="showRightAns" class="lock">
          <font-awesome-icon
            :icon="['fas', 'lock']"
            :class="disableLock ? 'text-slate-400' : 'text-[#c0392b]'"
          />
        </button>
        <div>
          <button
            :class="chekDisabled ? ' bg-slate-400 ' : 'bg-[#c0392b]'"
            class="py-3 px-9 rounded-xl mx-8 text-mianColor"
            v-if="currentState === 'quize' && !tryAgainR && !isRightAns"
            @click="chekAns"
            :disabled="chekDisabled"
          >
            check
          </button>

          <button
            class="bg-cyan-500 py-3 px-9 rounded-xl mx-8 text-mianColor"
            v-if="currentState === 'quize' && tryAgainR && !isRightAns"
            @click="resetMode"
            :disabled="chekDisabled"
          >
            tryAgain
          </button>

          <button
            ref="next"
            :class="chekDisabled ? ' bg-slate-400 ' : 'bg-[#c0392b]'"
            class="py-3 px-9 rounded-xl mx-8 text-mianColor"
            v-if="
              currentState === 'quize' &&
              !tryAgainR &&
              isRightAns &&
              !endLesson &&
              next
            "
            @click="nexQuestion"
            :disabled="chekDisabled"
          >
            Next
          </button>
          <button
            @click="updateCourseData()"
            class="py-3 px-9 rounded-xl mx-8 text-mianColor bg-red-700"
            v-if="endLesson && isRightAns && currentState != 'EndLesson'"
          >
            End Lesson
          </button>
          <button
            @click="goToMainPage()"
            class="py-3 px-9 rounded-xl mx-8 text-mianColor  bg-teal-500"
            v-if="currentState == 'EndLesson'"
          >
            Continue
          </button>
          <button
            ref="nextLesson"
            :class="chekDisabled ? ' bg-slate-400 ' : 'bg-[#2bc062]'"
            class="py-3 px-9 rounded-xl mx-8 text-mianColor"
            v-if="
              currentState === 'quize' && nextSlide && !endLesson && isRightAns
            "
            @click="nextSlideB"
            :disabled="chekDisabled"
          >
            Next lesson
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BaseButton from "@/components/bases/BaseButton.vue";
import QuizSection from "@/components/Courses/QuizSection.vue";
import CommentsBox from "@/components/Courses/CommentsBox.vue";
export default {
  components: { BaseButton, QuizSection, CommentsBox },

  data() {
    return {
      lesssonNumber: 0,
      currentState: "studying",
      lessonName: "",
      currentChoice: 1,
      isRightAns: false,
      chekDisabled: true,
      checkedMode: false,
      tryAgain: false,
      nextSlide: false,
      slideCounter: 0,
      questionCounter: 0,
      Score: 0,
      showWarning: false,
      next: true,
      warning: "",
      disableLock: false,
      allSlides: [],
      currentSlide: {
        id: "",
        content: "",
        questions: [
          {
            question: "",
            choices: [],
            answer: 1,
            point: 1,
          },
        ],
      },
      currentQuestion: {
        question: "",
        choices: [],
        answer: 1,
        point: 1,
      },
      count: 0,
      endLesson: false,
      commentBox: false,
    };
  },
  computed: {
    tryAgainR() {
      return this.tryAgain;
    },

    rightAns() {
      return this.currentQuestion.choices[this.currentQuestion.answer];
    },
    lockState() {
      return this.disableLock;
    },
  },
  methods: {
    goToMainPage(){
      this.$router.go(-1);
    },
    correctAudio() {
      this.$refs.correct.play();
    },
    failAudio() {
      this.$refs.fail.play();
    },

    HideCommentBox() {
      this.commentBox = false;
      this.$refs.CommentBox.classList.add("hideBox");
    },
    showCommentBox() {
      this.commentBox = true;
    },
    async updateCourseData() {
      let lessonId = this.$route.params.lessonId;
      await this.$store.dispatch("courses/userCourses");
      await this.$store.dispatch("courses/LoadLessons");

      /////////.............
      let allLessons = this.$store.getters["courses/allLessons"];
      let currentLesson = allLessons.filter((el) => el.id == lessonId);
      let userId = this.$store.getters["auth/userId"];
      // .................
      let CourseData = this.$store.getters["courses/UserCourses"].find(
        (el) =>
          el.apiUserId == userId && el.courseId == currentLesson[0].courseId
      );

      const payload = {
        id: CourseData.id,
        apiUserId: userId,
        lastLesson:
          this.lesssonNumber === CourseData.lastLesson
            ? CourseData.lastLesson
            : CourseData.lastLesson + 1,
        userPoints: this.Score + CourseData.userPoints,
        courseId: currentLesson[0].courseId,
      };

      try {
        await this.$store.dispatch("courses/updateUserCourse", payload);
        this.currentState = "EndLesson";
        this.correctAudio();
      } catch (e) {
        console.log(e);
      }
    },
    showRightAns() {
      if (this.Score > 0) {
        this.Score = this.Score - this.currentQuestion.point;
        this.disableLock = true;
        this.isRightAns = true;
        this.chekDisabled = false;
        this.$refs.quizSec.ShowAnsState(this.currentQuestion.answer);
      } else {
        this.showWarning = true;
        this.warning = "you Dont have Enough score points";
      }
    },

    async nextSlideB() {
      this.slideCounter++;
      this.isRightAns = false;
      this.tryAgain = false;
      this.checkedMode = false;
      this.chekDisabled = true;
      this.disableLock = false;
      this.currentState = "studying";
      this.loadCurrentSlide();

      try {
        console.log(this.currentSlide.id);
        await this.$store.dispatch("courses/SlideComments");
        this.count = this.$store.getters["courses/CommentsCount"];
        this.Comments = this.$store.getters["courses/slideComments"];
      } catch (e) {
        this.error = e.message || "failed to Load comments";
      }
      if (this.slideCounter >= this.allSlides.length - 1) {
        this.endLesson = true;
        return;
      }
    },
    nexQuestion() {
      if (this.questionCounter >= this.currentSlide.questions.length - 1) {
        return;
      }
      this.questionCounter++;
      this.isRightAns = false;
      this.tryAgain = false;
      this.checkedMode = false;
      this.chekDisabled = true;
      this.loadCurrentQuestion();
      this.disableLock = false;
      this.$refs.quizSec.removeRightClass();
    },
    resetMode() {
      this.isRightAns = false;
      this.tryAgain = false;
      this.checkedMode = false;
    },
    setCurrentChoice(key) {
      this.chekDisabled = false;
      this.currentChoice = key;
    },
    chekAns() {
      const choice = this.currentChoice + 1;
      const rithAns = this.currentQuestion.answer;
      this.checkedMode = true;
      if (choice == rithAns) {
        this.Score = this.Score + this.currentQuestion.point;
        this.isRightAns = true;
        this.correctAudio();
      } else {
        this.tryAgain = true;
        this.isRightAns = false;
        this.failAudio();
      }
      if (this.slideCounter >= this.allSlides.length - 1) {
        this.endLesson = true;
        return;
      }
    },
    Exit() {
      this.$router.go(-1);
    },
    async getAllSlides() {
      let lessonId = this.$route.params.lessonId;
      try {
        await this.$store.dispatch("courses/LoadLessons");
        await this.$store.dispatch("courses/SlideComments");
        this.count = this.$store.getters["courses/CommentsCount"];

        let allSlides = this.$store.getters["courses/allLessons"];
        let currentLesson = allSlides.filter((el) => el.id == lessonId);

        const [{ name: lessonName, slides: lessonSlide, courseId: CourseId }] =
          currentLesson;

        /// get all lessons number to prevent increase the last lesson num in db in the last lesson
        this.lesssonNumber = allSlides.filter(
          (el) => el.courseId === CourseId
        ).length;
        this.allSlides = lessonSlide;
        this.lessonName = lessonName;

        this.loadCurrentSlide();
      } catch (e) {}

      // let  = this.$store.getters.allLessons;
    },
    loadCurrentSlide() {
      this.currentSlide = this.allSlides[this.slideCounter];
      this.questionCounter = 0;
      this.loadCurrentQuestion();
      // this.currentSlide.questions.forEach((el) => {
      //   // this.Score =this.Score + el.point ;
      // });
    },
    loadCurrentQuestion() {
      this.currentQuestion = this.currentSlide.questions[this.questionCounter];

      if (this.questionCounter == this.currentSlide.questions.length - 1) {
        this.nextSlide = true;
      }
    },
    moveToQuize() {
      this.currentState = "quize";
    },
    backToSlides() {
      this.currentState = "studying";
    },
    EndLessonSec() {
      this.currentState = "EndLesson";
    },
  },

  created() {
    this.getAllSlides();
    // this.loadCurrentSlide();
  },
};
</script>

<style lang="scss" scoped>
.display {
  display: flex;
  justify-content: center;
  align-items: center;
}
.quizSec {
  overflow: scroll;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent; /* Set the color of the scrollbar thumb and track */
}

.quizSec::-webkit-scrollbar {
  width: 0.5em; /* Adjust the width as needed */
}

.quizSec::-webkit-scrollbar-track {
  background: transparent; /* Set the background color of the scrollbar track */
}
.lock {
  cursor: pointer;
}
.disabled {
  background: rgba($color: #ccc, $alpha: 1);
  display: none;
}
.hideBox {
  opacity: 0;
  right: -100%;
}
.commentBox {
  transition: 0.3s all linear;
  background: rgb(241 241 241);
  z-index: 10;
}
.greatWork {
  width: 62%;

  height: 65px;
  border-radius: 10px;

  filter: drop-shadow(2px 4px 6px black);
}
.Wrong {
  width: 50%;

  height: 50%;
  border-radius: 50% 50%;

  filter: drop-shadow(2px 4px 6px black);
}
.endImg {
  width: 20rem;
  margin: auto;
}
</style>
