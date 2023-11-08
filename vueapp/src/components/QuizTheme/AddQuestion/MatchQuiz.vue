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
      <div class="bg-[#461A42] h-[80vh] lg:w-[40%] w-[90%] m-auto rounded-3xl">
        <form
          @submit.prevent="submitData"
          class="h-full flex flex-col justify-between"
        >
          <div class="grow flex justify-end flex-col">
            <ul
              class="w-full basis-[40vh] gap-3 px-4 py-3"
            >
              <li class="space-y-3 py-5"  v-if=" currentInput === 1">
           
                <h3 v-if="pic_1" class="text-white w-1/2   m-auto " >الان اكتب الاجابة فى رقم الاجابة المناسب بالاسفل 
                <div> رقم الاجابة {{ AnswerIndex }}</div>
                </h3>

                <div v-else class=" flex  flex-col gap-3   py-md-5" >
                  <input type="number" v-model.number="AnswerIndex"   readonly hidden/>
                  <!-- <div class="text-white">  اختر رقم الاجابة اولا ثم الصوره</div> -->
                  <input
                    type="file"
                    ref="fileInput1"
                    
                    @change="uploadImage(1)"
                    :style="{ backgroundColor: getRandomColor() }"
                  />

                  <div class="  text-center py-4">
                    <span @click="sendImage(1)"  >رفع السؤال</span>
                  </div>
                </div>
              </li>

              <li class="space-y-3 py-5" v-else-if="currentInput === 2">
                <h3 v-if="pic_2" class="text-white w-1/2   m-auto " >الان اكتب الاجابة فى رقم الاجابة المناسب بالاسفل 
                  <div> رقم الاجابة {{ 
                    AnswerIndex2 }}</div>
</h3>
                
               <div v-else class=" flex  flex-col gap-3   py-md-5" >
                  <input type="number" v-model.number="AnswerIndex2"   readonly hidden/>
                  <!-- <div class="text-white">  اختر رقم الاجابة اولا ثم الصوره</div> -->

                  <input
                    ref="fileInput2"
                    type="file"
                    @change="uploadImage(2)"
                    :style="{ backgroundColor: getRandomColor() }"
                  />
                  <div class="  text-center py-4">
                    <span @click="sendImage(2)">رفع السؤال </span>
                  </div>
                </div>
              </li>
              <li class="space-y-3 py-5" v-else-if="currentInput === 3">

                <h3 v-if="pic_3" class="text-white w-1/2   m-auto " >الان اكتب الاجابة فى رقم الاجابة المناسب بالاسفل 
                  <div> رقم الاجابة {{ AnswerIndex3 }}</div>

                </h3>
                
                <div v-else class=" flex  flex-col gap-3   py-md-5" >
                  <input type="number" v-model.number="AnswerIndex3"  readonly hidden />
                  <!-- <div class="text-white">  اختر رقم الاجابة اولا ثم الصوره</div> -->

                  <input
                    ref="fileInput3"
                    type="file"
                    @change="uploadImage(3)"
                    :style="{ backgroundColor: getRandomColor() }"
                  />
                  <div class="  text-center py-4">
                    <span @click="sendImage(3)">رفع السؤال</span>
                  </div>
                </div>
              </li>

              <li class="space-y-3 py-5" v-else-if="currentInput === 4">
                <h3 v-if="pic_4" class="text-white w-1/2   m-auto " >الان اكتب الاجابة فى رقم الاجابة المناسب بالاسفل 
                 <div>رقم الاجابة {{ AnswerIndex4 }}</div>
                </h3>
                
                <div v-else class=" flex  flex-col gap-3   py-md-5" >
                  <input type="number" v-model.number="AnswerIndex4"  readonly hidden/>
                  <!-- <div class="text-white">  اختر رقم الاجابة اولا ثم الصوره</div> -->  

                  <input
                    ref="fileInput4"
                    type="file"
                    @change="uploadImage(4)"
                    :style="{ backgroundColor: getRandomColor() }"
                  />
                  <div class="  text-center py-4">
                    <span @click="sendImage(4)">رفع السؤال</span>
                  </div>
                </div>
              </li>
              <h1  v-else class=" text-center py-8 text-3xl text-white">قم بحفظ السؤال الان</h1>
            </ul>
          </div>
          <!-- ........................ -->
          <div class="grow flex justify-end flex-col">
            <ul
              class="w-full grid grid-cols-1 basis-[40vh] gap-3 px-4 py-3"
            >
              <li v-if="currentInput ===1">
                <input
                  type="text"
                  v-model="choices[0]"
                  :style="{ backgroundColor: getRandomColor() }"
                  placeholder="الاجابة رقم 1"
                />
              </li>
              <li v-else-if="currentInput === 2">
                <input
                  type="text"
                  v-model="choices[1]"
                  :style="{ backgroundColor: getRandomColor() }"
                  placeholder="الاجابة رقم 2"

                />
              </li>
              <li v-else-if="currentInput === 3">
                <input
                  type="text"
                  v-model="choices[2]"
                  :style="{ backgroundColor: getRandomColor() }"
                  placeholder="الاجابة رقم 3"
                  

                />
              </li>
              <li v-else-if="currentInput === 4">
                <input
                  type="text"
                  v-model="choices[3]"
                  :style="{ backgroundColor: getRandomColor() }"
                  placeholder="الاجابة رقم 4"

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
      currentInput:1,
      pic_1: false,
      pic_2: false,
      pic_3: false,
      pic_4: false,
      customId: "",
      isLoading: false,
   
      selectedFile: null,
      imageUrl1: null,
      imageUrl2: null,
      imageUrl3: null,
      imageUrl4: null,
      choices: ['','','',''],
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
      rigthAnswer: "",

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
      AnswerIndex: 1,
      AnswerIndex2: 2,
      AnswerIndex3: 3,
      AnswerIndex4:4,
    };
  },
  methods: {
    addCustomId() {
      this.customId = new Date().getTime().toString();
    },
    async sendImage(index) {
      console.log(this.customId);
      console.log(this.selectedFile);
      if (this.AnswerIndex <= 0 || this.AnswerIndex > 4) {
        alert("please chose answer number between 1 and 4");
        return;
      }
      const data = new FormData();
      if (index === 1) {
        if(this.choices[0] === ''){
          alert('رجاء اكتب الاجابه');
          return;
        }
        data.append("AnswerIndex", this.AnswerIndex);
        data.append("questionId", this.customId + "" + this.AnswerIndex);

        this.pic_1 = true;
      } else if (index === 2) {
        if(this.choices[1] === ''){
          alert('رجاء اكتب الاجابه');
          return;
        }
        data.append("AnswerIndex", this.AnswerIndex2);
        data.append("questionId", this.customId + "" + this.AnswerIndex2);

        this.pic_2 = true;
      } else if (index === 3) {
        if(this.choices[2] === ''){
          alert('رجاء اكتب الاجابه');
          return;
        }
        data.append("AnswerIndex", this.AnswerIndex3);
        data.append("questionId", this.customId + "" + this.AnswerIndex3);

        this.pic_3 = true;
      } else {
        if(this.choices[3] === ''){
          alert('رجاء اكتب الاجابه');
          return;
        }
        data.append("AnswerIndex", this.AnswerIndex4);
        data.append("questionId", this.customId + "" + this.AnswerIndex4);

        this.pic_4 = true;
      }

      data.append("files", this.selectedFile);

      try {
        await this.$store.dispatch("Quiz/uploadImage", data);
        this.currentInput++;
      } catch (e) {
        this.error = e.message || "فشل فى ارسال البيانات";
      }
    },
    uploadImage(index) {
      const fileInput = this.$refs[`fileInput${index}`];
      this.selectedFile = fileInput.files[0];
    },
    getRandomColor() {
      const randomColorIndex = Math.floor(Math.random() * this.colors.length);
      return this.colors[randomColorIndex];
    },
    async submitData() {
      const QuizId = this.$route.params.QuizId;
      if (
        this.QuizPoint === null ||
       
        this.selectedTime === null ||
        this.quizId === null
      ) {
        alert("رجاء املا كلالفراغات ");
        return;
      }
      const payload = {
        customId:this.customId,
        point: this.QuizPoint,
        time: this.selectedTime,
        choices: this.choices,
        quizId: +QuizId,
      };
      this.isLoading = true;
      try {
        await this.$store.dispatch("Quiz/addmatchQuestion", payload);
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
  mounted() {
    this.addCustomId();
  },
};
</script>

<style lang="scss" scoped>
span{
  cursor: pointer;
  padding: .5rem 2rem;
  border-radius: 10px;
  background: lavender;
  color:rebeccapurple
  
}
img {
  width: 4rem;
}
// input[type='file'] , input[type='number']{
// width: 50%;

// }
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
