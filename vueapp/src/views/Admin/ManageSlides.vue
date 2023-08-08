<template>
  <section class="py-7">
    <!-- <h1 class="text-center text-3xl">Add Slides</h1> -->

    <div class="container py-2 px-3 shadow-lg">
      <h1 class="text-xl">تحميل شرائح</h1>
      <h1 v-if="error" class="text-xl">{{ error }}</h1>

      <ol v-if="allSlides">
        <li v-for="(slide, key) in allSlides" :key="key">
          {{ key }} {{ slide.content }}
        </li>
      </ol>
      <h1 v-else class="text-center text-xl my-3 py-3">empty Box</h1>
    </div>
    <!-- form -->
    <base-spinner v-if="isLoading"></base-spinner>

    <div class="container lg:w-1/2 w-3/4 shadow-md rounded-lg py-2 px-3">
      <h1 class="text-center py-3">Add Slide</h1>
      <form @submit.prevent="submitForm" class="space-y-3">
        <div class="flex flex-col shadow-md space-y-2">
          <label for="editor-container">المحتوى</label>
          <div id="editor-container" class="w-full  h-64 rounded-lg shadow-xl shadow-slate-400 outline-none py-4 px-3"  ></div>

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
                class="py-1 px-3 bg-slate-400 hover:bg-slate-900 hover:text-white"
              >
                اضافة
              </span>
            </div>

            <ul>
              <li
                class="py-2 px-3 shadow-md w-1/3  relative"
                @click="removeChoice(key)"
                v-for="(choice, key) in currentChoices"
                :key="key"
              >
              <font-awesome-icon :icon="['fas', 'xmark']"  class=" absolute top-2 left-2  cursor-pointer    p-1 bg-slate-600 text-white" />
                {{ key + 1 }}: {{ choice }}
              </li>
            </ul>
          </div>
          <div>
            <input
              type="number"
              v-model.number="slide.questions.answer"
              placeholder="answer"
            />
            <span> اختر رقم الاجابة الصيحيه</span>
          </div>
          <input
            type="number"
            v-model.number="slide.questions.point"
            placeholder="point"
          />
        </div>
        <div class="">
          <span
            class="py-2 px-4 rounded-md text-white bg-neutral-700 md:mx-1"
            @click="addSlide()"
          >
            تحميل شريحه
          </span>
          <button
            class="py-2 px-4 rounded-md bg-red-500 text-white md:mx-1"
            type="submit"
          >
            ارسال
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
// import { faTextHeight } from "@fortawesome/free-solid-svg-icons";
import { QuillEditor } from '@vueup/vue-quill'
import Quill from 'quill';

import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  data() {
    return {
      error: "",
      isLoading: false,
      LessonId: 0,
      allSlides: [],
      slide: {
        customId: "",
        content: "",
        LessonId: 0,
        questions: [
          {
            questionText: "",
            choices: [],
            answer: 0,
            point: 0,
            slideId: "",
          },
        ],
      },
      choice: "",
      currentChoices: [],
    };
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
      this.slide.questions.questionText = "";
      this.slide.content = "";
      this.slide.questions.answer = 0;
      this.slide.questions.point = 0;
      this.currentChoices = [];
    },

    addSlide() {
      this.slide.questions.slideId = this.slide.customId;
      this.slide.questions.choices = this.currentChoices;
      this.slide.LessonId = +this.LessonId;
      this.slide.questions.splice(0,1)
      this.allSlides.push({
        ...this.slide,
        questions: [{
          ...this.slide.questions,
        }],
      });


      // this.clear();
    },
    getlessonId() {
      this.LessonId = this.$route.params.lessonId;
    },
    async submitForm() {

      // this.allSlides.forEach((el) => {
      //   payload.push(el);
      // });

      // console.log(payload);
      this.isLoading=true;

      try{
        await this.$store.dispatch("courses/AddSlides", this.allSlides);
        this.$router.go(-1);
      }catch(e){
        this.error = e.message || "failed to send slides";
      }

      this.isLoading = false;
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
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image', 'video'],
          [{ align: [] }],
          [{ header: [1, 2, false] }],
         
        ]
      },
      theme: 'snow'
    };

    this.quill = new Quill('#editor-container', quillOptions);
    this.quill.on('text-change', () => {
      this.slide.content = this.quill.root.innerHTML;
    });
  },
  beforeUnmount() {
    this.quill.off('text-change');
  },

};
</script>

<style scoped></style>
