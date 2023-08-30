<template>
  <Teleport to="body">
    <section class="py-10 md:top-[70px] top-[40px]" v-if="show">
      <div
        class="shadow-slate-800 shadow-lg rounded-xl lg:w-1/2 md:w-3/4 w-[95%] m-auto h-[85vh] py-5 px-3 z-40 bg-white"
      >
        <h2
          class="md:text-3xl text-2xl px-6 text-slate-500 flex justify-between"
        >
          رائع انت على وشك الانتهاء
          <font-awesome-icon
            @click="closeDialog"
            :icon="['fas', 'xmark']"
            class="text-2xl cursor-pointer"
          />
        </h2>
        <p v-if="error">{{ error }}</p>
        <base-spinner v-if="isLoading"></base-spinner>
        <form
          v-else
          @submit.prevent="SubmitQuiz"
          class="py-4 px-2 w-[90%] my-4 m-auto grid grid-cols-2"
        >
          <div class="form-control">
            <label for="">النوع</label>
            <input v-model.trim="QuizType" disabled type="text" />
          </div>
          <div class="form-control">
            <label for="name">الاسم</label>
            <input
              type="text"
              id="name"
              v-model.trim="name"
              placeholder="اختر اسم مناسب"
              required=""
            />
          </div>
          <div class="form-control">
            <label for="subject">الموضوع</label>
            <input
              type="text"
              id="subject"
              v-model.trim="subject"
              placeholder="اختر موضوع مناسب"
              required=""
            />
          </div>
          <div class="justify-center items-center flex flex-row py-3  ">
            <input ref="fileInput" type="file" @change="uploadImage" class="w-1/2 mx-3" />
            <div v-if="imageUrl">
              <img :src="imageUrl" alt="uploaded image"  class=" rounded-md"/>
            </div>
          </div>
          <div class="form-control col-span-2">
            <label for="des">الوصف</label>
            <textarea
              id="des"
              v-model.trim="description"
              class="shadow-lg border-none outline-none py-3 px-4 h-52 bg-slate-200 rounded-lg"
              placeholder="اختر وصف مناسب"
              required=""
            ></textarea>
          </div>
          <div class="text-center py-5">
            <button
              type="submit"
              class="py-2 px-10 border-none outline-none bg-[#c0392b] text-white rounded-md"
            >
              اضافة
            </button>
          </div>
        </form>
      </div>
    </section>
  </Teleport>
</template>

<script>
export default {
  props: ["Type"],
  data() {
    return {
      isLoading: false,
      show: false,
      QuizType: "",
      name: "",
      subject: "",
      description: "",
      error: "",
      imageUrl: null,
      selectedFile: null,
    };
  },
  methods: {
    uploadImage() {
      const fileInput = this.$refs.fileInput;
      this.selectedFile = fileInput.files[0];
      this.imageUrl = window.URL.createObjectURL(this.selectedFile);
    },
    showDialog() {
      this.show = true;
    },
    closeDialog() {
      this.show = false;
    },
    async SubmitQuiz() {
      if (!this.selectedFile) {
        alert("slect an image");
        return;
      }
      // const payload = {
      //   type: this.QuizType,
      //   name: this.name,
      //   subject: this.subject,
      //   description: this.description,
      // };
      const data = new FormData();
      data.append("type", this.QuizType);
      data.append("files", this.selectedFile);
      data.append("name", this.name);
      data.append("subject", this.subject);
      data.append("description", this.description);

      this.isLoading = true;
      try {
        const QuizData = await this.$store.dispatch("Quiz/AddQuiz", data);
        const QuizId = QuizData.id;
        const QuizType = QuizData.type;
        this.$router.push(`/CreateQuestion/${QuizId}/${QuizType}`);
      } catch (e) {
        this.error = e.message || "failed to Add Quiz";
      }
      this.isLoading = false;
    },
  },
  updated() {
    this.QuizType = this.Type;
  },
};
</script>

<style lang="scss" scoped>
.form-control {
  margin-top: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  label {
    color: #827b7b;
  }
  input {
    width: 80%;
    box-shadow: 0px 0px 5px rgba($color: #000000, $alpha: 1);
    border-radius: 0.4rem;
    padding: 0.2rem 1rem;
    outline: none;
    border: none;
  }
}
section {
  position: absolute;

  left: 0;
  height: 100%;

  width: 100%;
  background: rgba($color: #000000, $alpha: 0.6);
  //   z-index: -1;
}
img {
  width: 50px;
}
</style>
