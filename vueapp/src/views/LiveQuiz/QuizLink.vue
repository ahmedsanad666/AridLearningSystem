<template>
  <section class="QuizLink min-h-screen py-2">
    <div
      class="w-1/2 md:w-[30%] m-auto bg-[rgba(0,0,0,.6)] my-8 h-[30vh] rounded-xl"
    >
      <h1
        class="text-center my-2 py-2 font-bold text-white tracking-wider text-xl"
      >
        Share Quiz Link To Others
        <div
          class="flex items-center justify-center flex-row-reverse relative w-[60%] m-auto"
        >
          <input
            type="text"
            disabled
            class="my-5 rounded-md py-1 w-full text-sm text-left pl-1"
            :value="getLink"
            ref="inputLink"
          />
          <font-awesome-icon
            title="copy link"
            :icon="['fas', 'link']"
            @click="copy"
            class="absolute right-1 p-1 hover:bg-[rgba(0,0,0,.8)] rounded-full bg-[rgba(0,0,0,.5)] cursor-pointer"
          />
        </div>
        <a :href="adminLink" class=" py-1 px-5 rounded-md bg-teal-800">Start Quiz</a>
      </h1>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
     presentationId:''
    };
  },
  computed: {
    getLink() {
      const baseLink = window.location.origin;
      const QuizId = this.$route.params.quizId;
      return `${baseLink}/#/liveQuiz/${QuizId}/${this.presentationId}`;
    },
    adminLink(){
        const baseLink = window.location.origin;
      const QuizId = this.$route.params.quizId;
      return `${baseLink}/#/presentation/${QuizId}`;
    }
  },
  methods: {
    copy() {
        const linkInput = this.$refs.inputLink;
      const linkToCopy = linkInput.value; // Get the value of the input, which should be the link
      const tempInput = document.createElement('input'); // Create a temporary input element

      document.body.appendChild(tempInput); // Append the temporary input to the DOM
      tempInput.value = linkToCopy; // Set its value to the link
      tempInput.select(); // Select the text inside the temporary input
      document.execCommand('copy'); // Copy the selected text to the clipboard
      document.body.removeChild(tempInput); // Remove the t
    },
  },
  mounted(){
    this.presentationId = new Date().getTime().toString();
  }
};
</script>

<style lang="scss" scoped>
.QuizLink {
  background: url("../../assets/images/liveQuiz/bgQuiz.jpg");
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
