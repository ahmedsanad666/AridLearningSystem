<template>
    <section class="min-h-screen">
      <h1 class="text-center py-3 my-4 font-bold md:text-3xl text-2xl">
       نتائج الاختبار
      </h1>
      <div class="container py-3 px-4">
        <ul class="md:w-[50%] w-[90%] m-auto shadow-xl rounded-l-lg space-y-4" v-if="newData">
          <li
            class="flex rounded-lg py-3 px-2 justify-between items-center"
            v-for="(item, k) in newData"
            :key="k"
          >
            <span>{{ k }} | {{ item.apiUser.userName }}</span>
            <span>{{ item.totalPoints }} درجة</span>
       
          </li>
        </ul>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
    
        newData: [],
        isLoading :false
      };
    },
    methods: {
      async getResult() {
        const quizId = +this.$route.params.quizId;
        this.isLoading = true;
        try {
            await this.$store.dispatch("Quiz/GetSingleQuizResult", quizId);
       const result = this.$store.getters["Quiz/getsingleQuizResult"];
       console.log(result);
        this.newData = result.slice().sort(
              (a, b) => b.totalPoints - a.totalPoints
            );
        
          console.log(this.newData);
        } catch (e) {
          console.log(e);
        }
        this.isLoading = false
      },
    },
  
    created() {
      this.getResult();
    },
  };
  </script>
  
  <style lang="scss" scoped>
  li:nth-child(odd) {
    background: #444654;
    color: #ecf0f1;
  }
  img {
    width: 45px;
  }
  </style>
  