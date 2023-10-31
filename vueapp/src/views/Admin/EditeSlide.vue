<template>
  <section class="min-h-screen py-3">
    <base-spinner v-if="isloading"></base-spinner>
    <div
      v-else
      class="container shadow-current shadow-md rounded-lg py-2 px-3 flex min-h-screen lg:flex-row flex-col gap-3"
    >
      <div class="space-y-3 lg:w-1/2">
        <form @submit.prevent="updateSlide">
          <div class="flex flex-col shadow-md space-y-2">
            <label for="editor-container">المحتوى</label>
            <div
              id="editor-container"
              class="w-full h-64 rounded-lg shadow-xl shadow-slate-400 outline-none py-4 px-3"
            ></div>
          </div>
          <div>
            <button type="submit" class="py-2 px-4 rounded-md my-3 text-white bg-neutral-700 md:mx-1 cursor-pointer">تعديل</button>
          </div>
        </form>
      </div>
      <div class="space-y-2 lg:w-1/2">
        <form>
          <div
            class="rounded-sm shadow-md w-[90%] quesitonBox m-auto mt-3 py-2 px-3"
          >
            <h1 class="text-center font-bold">اضافة سؤال</h1>

            <div class="space-y-3 flex flex-col">
              <label for="question">محتوى </label>
              <textarea
                v-model.trim="question.questionText"
                placeholder="question tex"
                id="question"
                class="bg-zinc-400"
              ></textarea>
            </div>

            <div class="my-3">
              <!-- <div v-for="(question, key) in slide.questions" :key="key"></div> -->
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
                v-model="question.answer"
                placeholder="answer"
              />
              <span> اختر رقم الاجابة الصيحيه</span>
            </div>
            <input type="number" v-model="question.point" placeholder="point" />
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
              @click="updateQuestoin()"
            >
              تعديل
            </span>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import Quill from "quill";

import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  data() {
    return {
      slide: [],
      question: [],
      choice: "",
      currentChoices: [],
      customId: "",
      slideId: 0,
      questionId: 0,
      erro: "",
      quill: null,
      isloading: false,
      quillOptions: {
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
      },
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
    async loadSlide() {
      this.isloading = true;
      this.customId = this.$route.params.customId;
      const lessonId = +this.$route.params.lessonId;
      try {
        await this.$store.dispatch("courses/LoadLessons");
        let allSlides = this.$store.getters["courses/allLessons"].filter(
          (el) => el.id === lessonId
        );
        const data = JSON.parse(JSON.stringify(allSlides[0]));
        this.slide = data.slides.filter((e) => e.customId === this.customId);
        this.question = this.slide[0].questions[0];
        this.currentChoices = this.question.choices;
        this.quill.root.innerHTML = this.slide.content;
        this.slideId = this.slide[0].id;
        this.questionId = this.question.id;
        console.log(this.slide);

        // console.log(this.question);
      } catch (e) {
        this.error = e.message || "failed to get data";
      }
      this.isloading = false;
    },
    async updateSlide() {
      const lessonId = +this.$route.params.lessonId;
      const payload = {
        id: this.slide[0].id,
        customId: this.customId,
        content: this.slide[0].content,
        lessonId: lessonId,
      };
      this.isloading = true;
      try {
        await this.$store.dispatch("courses/updateSlide", payload);
        document.location.reload();
      } catch (e) {
        this.erro = e.message || "failed to submit data";
      }
      this.isloading = false;
    },
    async updateQuestoin() {
      const payload = {
        id: this.question.id,
        questionText: this.question.questionText,
        choices: this.question.choices,
        answer: this.question.answer,
        point: this.question.point,
        slideId: this.customId,
      };  
      this.isloading = true;
      try {
        await this.$store.dispatch("courses/updateQuestion", payload);
        document.location.reload();
      } catch (e) {
        this.erro = e.message || "failed to submit data";
      }
      this.isloading = false;
    },
  },

  async mounted() {
    await this.loadSlide();

    this.quill = new Quill("#editor-container", this.quillOptions);
    this.quill.root.innerHTML = this.slide[0].content;

    this.quill.on("text-change", () => {
      this.slide[0].content = this.quill.root.innerHTML;
    });
  },
  beforeUnmount() {
    this.quill.off("text-change");
  },
};
</script>

<style></style>
