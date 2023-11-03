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
              placeholder=" رجاء ادخال سؤال على هذاالشكل : (خاتم الانبياء هو النبي ....)"
              class="h-52 w-full rounded-3xl mx-auto flex text-center bg-[#330b2f] text-white"
              v-model.trim="questionText"
              name=""
              id=""
              required=""
            />
          </div>
          <div class="grow flex justify-center items-center flex-col border">

            <div>
              <div class=" text-white text-center py-3">ادخل اكثر من اجابة صحيحة </div>
              <input
                type="text"
                class="mx-2 py-1 px-2 rounded-sm shadow-md outline-none"
                v-model="choice"
                placeholder="اضافة اجابة"
              />
              <span
                @click="AddChoice()"
                class="py-1 px-3 bg-slate-400 hover:bg-slate-900 hover:text-white cursor-pointer"
              >
                اضافة
              </span>
            </div>

            <ul class="  w-1/3 py-2  space-y-2 gap-3 text-white  grid grid-cols-2 ">
              <li
                class="py-2 px-3  shadow-md  relative  m-auto  w-full "
                @click="removeChoice(key)"
                v-for="(choice, key) in currentChoices"
                :key="key"
              >
                <font-awesome-icon
                  :icon="['fas', 'xmark']"
                  class="absolute top-2 left-2 cursor-pointer p-1 bg-slate-600 text-white"
                />
                {{ key + 1 }}: {{ choice }}
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
      choice: "",
      currentChoices: [],
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
      // rigthAnswer: "",
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
    removeChoice(e) {
     
      this.currentChoices.splice(e, 1);
    },
    AddChoice() {
      this.currentChoices.push(this.choice);
      this.choice = "";
    },
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
        this.currentChoices.length === 0 ||
        this.quizId === null
      ) {
        alert("رجاء املا كلالفراغات ");
        return;
      }
      const payload = {
        questionText: this.questionText,
        point: this.QuizPoint,
        time: this.selectedTime,
        quizId: +QuizId,
        answers: this.currentChoices,
      };

      this.isLoading = true;
      try {
        await this.$store.dispatch("Quiz/AddFillblankQuestion", payload);
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
    input[type="radio"] {
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