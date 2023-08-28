<template>
  <section class="max-h-screen">
    <multiple-choices
      v-if="QuizType === 'multipleChoices'"
     
    ></multiple-choices>
  </section>
</template>

<script>
import MultipleChoices from "@/components/QuizTheme/AddQuestion/MultipleChoices.vue";
export default {
  components: { MultipleChoices },
  data() {
    return {
      QuizType: "",
    };
  },

  mounted() {
    this.QuizType = this.$route.params.QuizType;
  },
};
</script>

<style></style>
