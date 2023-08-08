<template>
  <section class="w-full bg-bgColor py-5 min-h-screen">
    <div class="container lg:w-1/2 w-3/4">
      <div
        class="py-4 px-3 mt-4 mb-8 rounded-xl shadow-xl shadow-zinc-600 w-[80%] relative circleBox flex justify-between"
      >
        <div class="text-[#444654] font-bold mx-2">
          Started Date : {{ CourseDetails.startedData }}
        </div>
        <div class="text-[#444654] font-bold mx-2">
          Total Points: {{ pointTotal }}
        </div>
        <div class="flex flex-col justify-center items-center point">
          <span class="font-bold">
            {{ userProgress.userPoints }}
          </span>
          <span> Point </span>
        </div>
        <div class="circle">
          <circle-progress
            :is-gradient="true"
            size="90"
            :percent="pointsBar"
            :border-width="6"
            :border-bg-width="6"
            :gradient="{
              angle: 90,
              startColor: '#ff0000',
              stopColor: '#ffff00',
            }"
          />
        </div>
      </div>

      <!-- ........................... -->

      <div>
        <div class="text-end text-slate-400 font-bold px-2 my-1">Progress</div>
        <div class="w-[99%] mx-auto h-[3px] rounded-full relative">
          <div
            class="rounded-full absolute border border-red-500 left-0 top-0 h-full bg-[#d63031]"
            :style="{ width: progressData }"
          ></div>
        </div>
      </div>

      <base-spinner v-if="isLoading"></base-spinner>

      <!-- ................................ -->
      <div>
        <base-intro
          :CourseDes="CourseDetails.des"
          :CourseName="CourseDetails.name"
        ></base-intro>
      </div>

      <div class="py-4 mt-5 mb-2">
        <ul class="space-y-5" v-for="(el, key) in chapters" :key="key">
          <li
            class="my-2 cursor-pointer select-none"
            @click="showLessons(el, key)"
            ref="myli"
          >
            <lesson-head :LessonName="el.name" />
          </li>

          <ul ref="list" class="subMenu itemRef space-y-2 my-2">
            <li
              v-for="(lesson, key) in lessons"
              :key="key"
              class="relative py-6"
              :class="[
                { disabled: lesson.active == false },
                { hidden: lesson.chapterId !== el.id },
              ]"
            >
              <router-link
                class="lessonLink absolute text-lg w-full h-full"
                :to="`/courses/${CourseName}/${lesson.id}`"
              >
                {{ lesson.chapterId == el.id ? lesson.name : "" }}
              </router-link>
              <font-awesome-icon
                :icon="['fas', 'lock']"
                v-if="!lesson.active"
              />
            </li>
          </ul>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import dayjs from 'dayjs';

import BaseIntro from "@/components/bases/BaseIntro.vue";
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
import CurrentCoursesVue from '@/components/Courses/CurrentCourses.vue';
export default {
  components: { BaseIntro, CircleProgress },

  data() {
    return {
      isLoading: false,
      Error: "",
      CourseDetails: {
        name: "",
        des: "",
        TotalPoints: 0,
        startedData: "",
      },
      userProgress: {
        userPoints: 0,
      },
      chapters: [],
      lessons: [],
      activeLessonsNumber: 0,
    };
  },
  computed: {
    pointsBar() {
      let bar =
        (this.userProgress.userPoints / this.CourseDetails.TotalPoints) * 100;
      return bar;
    },
    progressData() {
      console.log(this.activeLessonsNumber)
      if(this.activeLessonsNumber == 1){

        return 0 + '%';
      }else{
        
        let percentage = this.activeLessonsNumber  / this.lessons.length;
        
        return percentage * 100 + "%";
      }
    },
    courseLessons() {
      let id = this.$route.params.userCourse;

      let lessons = this.$store.getters["courses/allLessons"].filter(
        (obj) => obj.courseId == id
      );
      return lessons;
    },
    pointTotal() {
      return this.CourseDetails.TotalPoints;
    },
  },
  methods: {
    getCoursePoints() {
      //get progress
    //   this.lessons.forEach((el) => {
    //     if (el.active) {
    //       this.activeLessonsNumber++;
    //     }
    //   });
      // get points
      this.lessons.forEach((lesson) => {
        lesson.slides.forEach((slide) => {
          slide.questions.forEach((q) => {
            this.CourseDetails.TotalPoints =
              this.CourseDetails.TotalPoints + q.point;
          });
        });
      });
    },
    showLessons(el, key) {

      let list = this.$refs.list;
      list[key].classList.toggle("subMenu");
console.log(this.progressData);
      //  let  currentLessons =[];
      
    //   this.courseLessons.forEach((item) => {
    //     if (item.chapterId == el.id) {
    //       this.lessons.push(item.name);
    //     }
    //   });
    },
    async CourseData() {
      let CourseId = this.$route.params.userCourse;
      let userid = this.$store.getters["auth/userId"];
      this.isLoading = true;

      try {
        await this.$store.dispatch("courses/userCourses");
        await this.$store.dispatch("courses/userchapters");
        await this.$store.dispatch("courses/LoadLessons");
        await this.$store.dispatch("courses/AllCourses");

        let allChapters = this.$store.getters["courses/CoureChapters"].filter(
          (obj) => obj.courseId == CourseId
        );

        console.log( this.$store.getters["courses/CoureChapters"].filter(
          (obj) => obj.courseId == CourseId
        ));
        let allCourses = this.$store.getters["courses/allCourses"];

        let CourseData = this.$store.getters["courses/UserCourses"].find(
          (el) => el.apiUserId == userid && el.courseId == CourseId
        );
        this.activeLessonsNumber = CourseData.lastLesson;
        let singleCourse = allCourses.find((el) => el.id == CourseId);
        let currentCourseData = {
          userPoint: CourseData.userPoints,
          // progress :CourseData.Progress,
          startedData: CourseData.startedDate,
          CourseDetails: singleCourse,
          chapters: allChapters,
          lessons: this.courseLessons,
        };
        

      const dateObj = dayjs(currentCourseData.startedData);
            const CreatedDate = dateObj.format('ddd MMM');

        this.userProgress.userPoints = currentCourseData.userPoint;
        this.CourseDetails.name = currentCourseData.CourseDetails.name;
        this.CourseDetails.des = currentCourseData.CourseDetails.des;
        this.CourseDetails.startedData = CreatedDate;
        // this.userProgress.progress = currentCourseData.progress;
        this.chapters = currentCourseData.chapters;
        this.lessons = currentCourseData.lessons;
        this.getCoursePoints();

        // lock lessons 
        let number = this.activeLessonsNumber;
        this.lessons = this.lessons.map((lesson,index)=>{
            if(index < number){
                return{
                    ...lesson,
                    active:true
                }
            }else{
                return{
                    ...lesson,
                    active:false
                }
            }
        })
          console.log(this.lessons);
      } catch (e) {
        this.Error = e.message || "can not load course Data ";
      }

      this.isLoading = false;
    },
  },

  created() {
    this.CourseData();
  },
};
</script>
<style lang="scss" scoped>
ul {
  li {
    div {
      transition: 0.3s linear;
    }
  }
}

.subMenu {
  height: 0;
  display: none;
}

.itemRef {
  li {
    box-shadow: 0px 0px 5px rgba($color: #000000, $alpha: 0.5);
    padding: 0.7rem 1rem;
    border-radius: 0.5rem;
    height: 3rem;
    .lessonLink a {
      padding-right: 30px !important;
    }
    .svg-inline--fa {
      position: absolute;
      left: 21px;
      top: 16px;
    }
  }

  li:nth-child(odd) {
    background: #444654;
    color: #ecf0f1;
  }
}

.circleBox {
  height: 3rem;

  .point {
    position: absolute;
    top: 0rem;
    left: -5.2em;
    color: #636e72;
  }
}
.circle {
  top: -1rem;
  left: -7em;
  position: absolute !important;
}
.disabled {
  pointer-events: none; /* Disable pointer events */
  opacity: 0.6; /* Apply a visual indication of disabled state */
}
</style>
