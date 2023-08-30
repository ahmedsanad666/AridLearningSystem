<template>
  <section class="max-h-screen">
    <multiple-choices v-if="QuizType === 'multipleChoices'"></multiple-choices>
    <fill-blank v-else-if="QuizType === 'fillTheBlank'"> </fill-blank>
    <drag-drop v-else-if="QuizType === 'DragDrop'"> </drag-drop>
    <match-quiz v-else-if="QuizType === 'match'"> </match-quiz>
  </section>
</template>

<script>
import MultipleChoices from "@/components/QuizTheme/AddQuestion/MultipleChoices.vue";
import FillBlank from "@/components/QuizTheme/AddQuestion/FillBlank.vue";
import DragDrop from "@/components/QuizTheme/AddQuestion/DragDrop.vue";
import MatchQuiz from "@/components/QuizTheme/AddQuestion/MatchQuiz.vue";
export default {
  components: { MultipleChoices, FillBlank, DragDrop, MatchQuiz },
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
