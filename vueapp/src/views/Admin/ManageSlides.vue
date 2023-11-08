<template>
  <section class="py-7 flex md:w-[90%] md:flex-row flex-col m-auto">
    <!-- <h1 class="text-center text-3xl">Add Slides</h1> -->

    <base-spinner class="spinner" v-if="isLoading"></base-spinner>
    <div class="container md:w-1/2 py-2 px-3 shadow-lg quizSec h-[90vh]" v-else>
      <button
        class="py-2 px-4 rounded-md bg-red-500 text-white md:mx-1"
        type="submit"
        :disabled="checkAllowSubmit ? true : false"
        @click="submitForm"
      >
        تاكيد و ارسال
      </button>
      <h1 v-if="error" class="text-xl">{{ error }}</h1>

      <ul v-if="allSlides" class="space-y-3">
        <li
          v-for="(slide, key) in allSlides"
          :key="key"
          class="shadow-md py-2 rounded-md bg-slate-50"
        >
          <h2 class="pb-4 px-4">المحتوى</h2>
          <p
            class="content w-[90%] py-4 m-auto border border-neutral-400 px-3 rounded-md"
            v-html="slide.content"
          ></p>
          <h2 class="text-center text-slate-500 text-xl">
            {{ slide.questions[0].questionText }}
          </h2>
          <ul
            class="grid grid-cols-1 md:text-start text-center md:grid-cols-2 gap-3 my-2 px-4"
          >
            <li v-for="(q, k) in slide.questions[0].choices" :key="k">
              <font-awesome-icon :icon="['fas', 'circle']" /> {{ q }}
            </li>
          </ul>
        </li>
      </ul>
      <h1 v-else class="text-center text-xl my-3 py-3">empty Box</h1>
    </div>
    <!-- form -->

    <div
      class="container shadow-current shadow-md rounded-lg py-2 px-3 md:w-1/2"
    >
      <form @submit.prevent="submitForm" class="space-y-3">
        <div class="flex flex-col shadow-md space-y-2">
          <label for="editor-container">المحتوى</label>
          <div
            id="editor-container"
            class="w-full h-64 rounded-lg shadow-xl shadow-slate-400 outline-none py-4 px-3"
          ></div>

          <!-- <textarea
            class="shadow-lg rounded-md p-3"
            @blur="addCustomId()"
            v-model.trim="slide.content"
            placeholder="Slide Content"
          ></textarea> -->
        </div>

        <div
          class="rounded-sm shadow-md w-[90%] quesitonBox m-auto mt-3 py-2 px-3"
        >
          <h1 class="text-center font-bold">اضافة سؤال</h1>

          <div class="space-y-3 flex flex-col">
            <label for="question">محتوى </label>
            <textarea
              v-model.trim="slide.questions.questionText"
              placeholder="question tex"
              id="question"
              class="bg-zinc-400"
              @blur="addCustomId()"
            ></textarea>
          </div>

          <div class="my-3">
            <div v-for="(question, key) in slide.questions" :key="key"></div>
            <div>
              <input
                type="text"
                class="mx-2 py-1 px-2 rounded-sm shadow-md outline-none"
                v-model="choice"
                placeholder="اضافة اختيار"
              />
              <span
                @click="AddChoice()"
                class="py-1 px-3 bg-slate-400 hover:bg-slate-900 hover:text-white cursor-pointer"
              >
                اضافة
              </span>
            </div>

            <ul>
              <li
                class="py-2 px-3 shadow-md w-1/3 relative"
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
          <div>
            <input
              type="number"
              v-model="slide.questions.answer"
              placeholder="answer"
            />
            <span> اختر رقم الاجابة الصيحيه</span>
          </div>
          <div>

            <input
            type="number"
            v-model="slide.questions.point"
            placeholder="point"
            />
            <span>  حدد عدد النقاط</span>
          </div>
        </div>

        <div class="flex flex-col">
          <p
            v-if="formError"
            class="font-bold text-2xl my-2 text-center text-red-600"
          >
            {{ formError }}
          </p>
          <span
            class="py-2 px-4 rounded-md text-white bg-neutral-700 md:mx-1 cursor-pointer"
            @click="addSlide()"
          >
            تحميل شريحه
          </span>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
// import { faTextHeight } from "@fortawesome/free-solid-svg-icons";
import { QuillEditor } from "@vueup/vue-quill";
import Quill from "quill";

import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  data() {
    return {
      disableSubmit: true,
      error: "",
      isLoading: false,
      LessonId: 0,
      allSlides: [],
      slide: {
        customId: "",
        content: "",
        LessonId: 0,
        questions: {
          questionText: "",
          choices: [],
          answer: 1,
          point: 1,
          slideId: "",
        },
      },
      choice: "",
      currentChoices: [],
      formError: "",
    };
  },
  computed: {
   
    checkAllowSubmit() {
      
      if (this.allSlides.length > 0) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    removeChoice(e) {
      // if()
      this.currentChoices.splice(e, 1);
    },
    AddChoice() {
      this.currentChoices.push(this.choice);
      this.choice = "";
    },
    addCustomId() {
      this.slide.customId = new Date().getTime().toString();
    },
    clear() {
      this.quill.root.innerHTML = "";
      this.slide.questions.questionText = "";
      this.slide.content = "";
      this.slide.questions.answer = 0;
      this.slide.questions.point = 0;
      this.currentChoices = [];
      this.choice = "";
    },

    addSlide() {
      console.log(!!this.slide.content === false);
      // validation
      if (
        !!this.slide.content === false ||
        this.slide.questions.questionText === "" ||
        this.currentChoices.length === 0 ||
        this.slide.questions.answer === 0 ||
        this.slide.questions.point === 0
      ) {
        this.formError = "رجاء املأ كل الفراغات ";
        setTimeout(() => {
          this.formError = "";
        }, 2000);
        return;
      }
      if (this.slide.questions.answer > this.currentChoices.length) {
        this.formError = "رقم الاجابة يجب ان يكون من بين الاختارات";
        setTimeout(() => {
          this.formError = '';
        }, 1500);
        return;
      }
      //.........................
      this.slide.questions.slideId = this.slide.customId;
      this.slide.questions.choices = this.currentChoices;
      this.slide.LessonId = +this.LessonId;
      // this.slide.questions.splice(0, 1);
      this.allSlides.push({
        ...this.slide,
        questions: [
          {
            ...this.slide.questions,
          },
        ],
      });

      this.clear();
    },
    getlessonId() {
      this.LessonId = this.$route.params.lessonId;
    },
    async submitForm() {
      this.isLoading = true;

      try {
        await this.$store.dispatch("courses/AddSlides", this.allSlides);
        this.$router.go(-1);
      } catch (e) {
        this.error = e.message || "failed to send slides";
      }

      this.isLoading = false;
      this.disableSubmit = true;
      // this.$router.push('/courses');
    },
  },

  created() {
    this.getlessonId();
  },
  mounted() {
    const quillOptions = {
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "video"],
          [{ align: [] }],
          [{ header: [1, 2, false] }],
        ],
      },
      theme: "snow",
    };

    this.quill = new Quill("#editor-container", quillOptions);
    this.quill.on("text-change", () => {
      this.slide.content = this.quill.root.innerHTML;
    });
  },
  beforeUnmount() {
    this.quill.off("text-change");
  },
};
</script>

<style lang="scss" scoped>
.spinner {
  width: 50% !important;
}
.content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
</style>
