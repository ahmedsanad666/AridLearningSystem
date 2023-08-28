<template>
  <section class="h-20 relative overflow-hidden">
    <audio ref="correct" preload="auto" class="hidden">
      <source
        src="../../assets/images/audio/QuizThemeSuccess.mp3"
        type="audio/mp3"
      />
    </audio>
    <audio ref="Wrong" preload="auto" class="hidden">
      <source
        src="../../assets/images/audio/QuizThemeFail.mp3"
        type="audio/mp3"
      />
    </audio>
    <div
      class="h-full absolute left-0 right-0 bottom-[-100%] flex justify-center items-center"
      ref="answerMood"
    >
      <div
        class="md:w-[20%] w-[30%] h-[70%] bg-white rounded-lg shadow-slate-900 shadow-lg flex items-center justify-center font-bold text-black"
        v-if="rightAnswer && checkMood"
      >
        اجابة صحيحة!! <br />
        عمل رائع
      </div>
      <div
        class="md:w-[20%] w-[30%] h-[70%] bg-white rounded-lg shadow-slate-900 shadow-lg flex items-center justify-center font-bold text-black"
        v-else-if="!rightAnswer && checkMood"
      >
        اجابة خاطئة !! <br />
        استمر فى المحاولة
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      rightAnswer: true,
      checkMood: false,
    };
  },
  methods: {
    removeCheck() {
      this.checkMood = false;
      const boxRef = this.$refs.answerMood.classList;
      if (boxRef.contains("WrongAns ")) {
        boxRef.remove("WrongAns");
      }
      if (boxRef.contains("rightAns")) {
        boxRef.remove("rightAns");
      }
    },
    RightAns() {
      this.$refs.correct.play();
      this.checkMood = true;
      this.rightAnswer = true;

      const boxRef = this.$refs.answerMood.classList;
      if (boxRef.contains("WrongAns")) {
        console.log("var");
        boxRef.remove("WrongAns");
      }
      console.log("yok");
      boxRef.add("rightAns");
    },
    WrongAns() {
      this.rightAnswer = false;
      this.$refs.Wrong.play();
      this.checkMood = true;
      const boxRef = this.$refs.answerMood.classList;
      if (boxRef.contains("rightAns")) {
        boxRef.remove("rightAns");
      }
      boxRef.add("WrongAns");
    },
  },
};
</script>

<style lang="scss" scoped>
.rightAns {
  background: #27ae60;
  bottom: 0;
  transition: all 0.4s linear;
}
.WrongAns {
  background: rgb(130, 31, 31);
  bottom: 0;
  transition: all 0.4s linear;
}
</style>
