<template>
  <section class="min-h-screen">
    <div class="">
      <div class="flex container py-4 px-3 gap-7 items-center">
        <button
          @click="submitData"
          type="submit"
          class="py-1 px-5 rounded-md text-white bg-AddQuizColor"
        >
          حفظ السؤال
          <font-awesome-icon :icon="['fas', 'floppy-disk']" />
        </button>
        <div>
          <select
            v-model="selectedTime"
            id="timeSelect"
            class="outline-none bg-slate-300 font-bold border-none rounded-md py-1 px-3 cursor-pointer"
          >
            <option
              v-for="option in timeOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
        <div>
          <select
            v-model="QuizPoint"
            id="timeSelect"
            class="outline-none bg-slate-300 font-bold border-none rounded-md py-1 px-3 cursor-pointer"
          >
            <option
              v-for="point in 15"
              :key="point"
              :value="point"
              class="flex flex-row-reverse"
            >
              {{ point }} point
            </option>
          </select>
        </div>
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
    <base-spinner v-if="isLoading"></base-spinner>
    <div v-else class="bg-slate-200 min-h-screen py-5">
      <div class="bg-[#461A42] h-[80vh] md:w-[85%] m-auto rounded-3xl">
        <form
          @submit.prevent="submitData"
          class="h-full flex flex-col justify-between"
        >
          <div class="w-[95%] rounded-3xl mx-auto py-5">
            <input
              type="text"
              placeholder="مثال : قامت الثورة --- عام 1970 فى شهر --- "
              class="h-52 w-full rounded-3xl mx-auto flex text-center bg-[#330b2f] text-white"
              v-model.trim="questionText"
              name=""
              id=""
              required=""
            />
            <p class="text-white text-center mt-3">الرجاء مراعاة الفصل ب ---</p>
          </div>
          <div class="grow flex justify-end flex-col">
            <ul
              class="w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 basis-[40vh] gap-3 px-4 py-3"
            >
              <li>
                <input type="checkbox" v-model="answers[0]" required="" />
                <input
                  type="text"
                  v-model="choices[0]"
                  :style="{ backgroundColor: getRandomColor() }"
                />
              </li>
              <li>
                <input type="checkbox" v-model="answers[1]" />
                <input
                  type="text"
                  v-model="choices[1]"
                  :style="{ backgroundColor: getRandomColor() }"
                />
              </li>
              <li>
                <input type="checkbox" v-model="answers[2]" />
                <input
                  type="text"
                  v-model="choices[2]"
                  :style="{ backgroundColor: getRandomColor() }"
                />
              </li>
              <li>
                <input type="checkbox" v-model="answers[3]" />
                <input
                  type="text"
                  v-model="choices[3]"
                  :style="{ backgroundColor: getRandomColor() }"
                />
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      questionText: "",
      answers: [false, false, false, false],

      choices: [],
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
      questionText: "",
      error: "",
      QuizPoint: 10,
      selectedTime: 30, // Default to 30 seconds
      timeOptions: [
        { value: 10, label: "10 seconds" },
        { value: 20, label: "20 seconds" },
        { value: 30, label: "30 seconds" },
        { value: 60, label: "1 minute" },
        { value: 120, label: "2 minutes" },
        { value: 300, label: "5 minutes" },
      ],
    };
  },
  methods: {
    getRandomColor() {
      const randomColorIndex = Math.floor(Math.random() * this.colors.length);
      return this.colors[randomColorIndex];
    },
    async submitData() {
      const QuizId = this.$route.params.QuizId;
      if (
        this.QuizPoint === null ||
        this.questionText === "" ||
        this.selectedTime === null ||
        !this.answers.includes(true) ||
        this.quizId === null
      ) {
        alert("رجاء املا كلالفراغات ");
        return;
      }

      let answers = [];
      this.answers.forEach((el, index) => {
        if (el) {
          answers.push(index + 1 + "");
        }
      });

      const payload = {
        questionText: this.questionText,
        point: this.QuizPoint,
        time: this.selectedTime,
        choices: this.choices,
        quizId: +QuizId,
        answers: answers,
      };

      this.isLoading = true;
      try {
        await this.$store.dispatch("Quiz/AddDragDropQuiz", payload);
        const QuizId = this.$route.params.QuizId;
        const QuizType = this.$route.params.QuizType;

        // this.$router.go(-1);
        this.$router.replace("/CreateQuestion/" + QuizId + "/" + QuizType);
      } catch (e) {
        this.error = e.message || "فشل فى ارسال البيانات";
      }
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  li {
    position: relative;
    input[type="radio"],
    input[type="checkbox"] {
      position: absolute;
      z-index: 999;
      top: 1rem;
      right: 1rem;
      width: 25px;
      height: 25px;
      cursor: pointer;
      border-radius: 0.5rem;
    }
    input[type="text"] {
      border-radius: 0.5rem;
      text-align: center;
      position: absolute;
      color: white;
      font-weight: bold;
      font-size: 1.5rem;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 888;
    }
  }
}
</style>
