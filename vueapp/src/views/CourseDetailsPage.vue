<template>
  <section class="w-full bg-bgColor py-5 min-h-screen">
    <div class="container lg:w-1/2 w-3/4">
      <div>
        <base-intro
          :CourseDes="CourseDes"
          :CourseName="CourseName"
        ></base-intro>
      </div>

      <div class="py-4 mt-5 mb-2">
        <ul class="space-y-5" v-for="(el, key) in Chapters" :key="key">
          <li
            class="my-2 cursor-pointer select-none"
            @click="showLessons(el, key)"
            ref="myli"
          >
            <lesson-head :LessonName="el.name" />
          </li>

          <ul ref="list" class="subMenu itemRef space-y-2 my-2">
            <li
              v-for="(lesson, key) in courseLessons"
              :key="key"
              class="relative py-6 disabled"
              :class="lesson.chapterId == el.id ? '' : 'hidden'"
            >
              <router-link
                class="lessonLink absolute text-lg w-full h-full"
                :to="`/courses/${CourseName}/${lesson.id}`"
              >
                {{ lesson.chapterId == el.id ? lesson.name : "" }}
              </router-link>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import BaseIntro from "@/components/bases/BaseIntro.vue";
export default {
  components: { BaseIntro },

  data() {
    return {
      CourseName: "",
      CourseDes: "",
      Chapters: [],

      currentLessons: [],
    };
  },
  computed: {
    courseLessons() {
      let id = this.$route.params.CourseDetails;
      let lessons = this.$store.getters["courses/allLessons"];
      let courseLessons = lessons.filter((obj) => obj.courseId == id);
      return courseLessons;
    },
  },
  methods: {
    
    async CourseData() {
      let CourseId = this.$route.params.CourseDetails;

      try {
        await this.$store.dispatch("courses/AllCourses");
        await this.$store.dispatch('courses/userchapters')
        await this.$store.dispatch('courses/LoadLessons')
        let currentCoureData = this.$store.getters["courses/allCourses"].filter(
        (el) => el.id == CourseId
      );
      
      const [{ name: CourseName, description: CourseDes }] = currentCoureData;
      this.CourseName = CourseName;
      this.CourseDes = CourseDes;
      // ............. chapters
      let allChapters = this.$store.getters["courses/CoureChapters"].filter(
          (el) => el.courseId == CourseId
          );
          this.Chapters = allChapters;  
      
          

      } catch (e) {
        this.Error = "failed to Get Courses" || e.message;
      }

   
      

     
    },
    showLessons(el, key) {
      //  let lis = this.$refs.myli;

      let list = this.$refs.list;
      list[key].classList.toggle("subMenu");

      //  let  currentLessons =[];
      this.courseLessons.forEach((item) => {
        if (item.chapterId == el.id) {
          this.currentLessons.push(item.name);
        }
      });
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
  }

  li:nth-child(odd) {
    background: #444654;
    color: #ecf0f1;
  }
}

.c {
  border: 1px red solid;
  height: 3rem;
  position: relative;
}
.disabled {
  pointer-events: none; /* Disable pointer events */
  opacity: 0.6; /* Apply a visual indication of disabled state */
}
</style>
