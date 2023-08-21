<template>
  <nav class="relative" :class="currentRoute ? 'h-0' : 'bg-gray'" v-if="ShowNav">
    <div
      class="md:container w-full md:space-x-20 pt-6 text-lightColor md:px-12 flex items-center justify-between shadow-sm pb-4"
    >
      <div class="logo">
        <!-- <img src="../assets/images/logo.png" alt="logo" /> -->
        <h2 class="text-center text-lightGreen font-bold text-2xl">
          AVCD Pysycology
        </h2>
      </div>
      <ul class="space-x-6 grow justify-center hidden md:flex">
        <li :class="!dir ? 'mx-6 ' : ''">
          <router-link :to="{ name: 'home' }"> الرئيسية</router-link>
        </li>
        <!-- <li>
          <router-link :to="{ name: 'about' }">{{ $t("about") }}</router-link>
        </li> -->
        <li>
          <router-link :to="{ name: 'courses' }">الدورات </router-link>
        </li>
        <!-- <li>
          <router-link :to="{ name: 'gallery' }">{{
            $t("gallery")
          }}</router-link>
        </li> -->
        <li v-if="isLoggedIn">
          <router-link :to="{ name: 'LeaderBoard' }"> LeaderBoard </router-link>
        </li>

        <li v-if="isLoggedIn && isAdmin">
          <router-link :to="{ name: 'admin' }">لوحة التحكم</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Blogs' }">المدونة </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'QuizTheme' }">quizTheme </router-link>
        </li>
      </ul>

      <div
        class="cursor-pointer flex items-center justify-center"
        v-if="isLoggedIn"
      >
        <span
          class="border md:py-1 md:px-3 md:rounded-full text- mx-3 md:block hidden"
        >
          {{ allPoints }} Point
        </span>
        <router-link :to="{ name: 'Profile' }">
          <!-- <font-awesome-icon
            :icon="['fas', 'user']"
            size="xl"
            class="p-2 rounded-full hover:bg-redColor shadow-slate-900 shadow-sm hover:border-none hover:shadow-md transition-all"
          /> -->
          <img :src="imgUrl" class="w-[2rem] rounded-full" alt="" />
        </router-link>
      </div>
      <div class="cursor-pointer">
        <button v-if="isLoggedIn" @click="logOut()">تسجيل الخروج</button>
        <router-link v-else to="/auth">تسجيل الدخول</router-link>
      </div>
      <!-- <locale-switcher ></locale-switcher> -->
      <!-- ............. -->
      <!-- hamburger menu -->
      <button
        @click="show"
        class="hamburger md:hidden focus:outline-none"
        :class="showMenu ? 'open ' : ''"
      >
        <span class="bamburger-top"></span>
        <span class="bamburger-middle"></span>
        <span class="bamburger-bottom"></span>
      </button>

      <!-- meneu -->
      <div class="md:hidden">
        <div
          v-show="showMenu"
          class="menu absolute flex flex-col items-center bg-veryLightGray space-y-6 font-bold mt-6 drop-shadow-md right-6 py-5 left-6 rounded-lg bg-black/80 mx-auto w-3/4"
        >
          <router-link :to="{ name: 'home' }"> الرئيسية</router-link>
          <router-link :to="{ name: 'courses' }">الدورات </router-link>
          <router-link :to="{ name: 'Blogs' }">المدونة </router-link>
          <div class="cursor-pointer">
            <button v-if="isLoggedIn" @click="logOut()">تسجيل الخروج</button>
            <router-link v-else to="/auth">تسجيل الدخول</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navBar",
  data() {
    return {
      showMenu: false,
      allPoints: 0,
      imgUrl: "",
      ShowNav: true,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    isAdmin() {
      return this.$store.getters["auth/isAdmin"];
    },
    currentRoute() {
      return this.$route.name == "home";
    },
    dir() {
      return this.$store.getters.getDir == "ltr";
    },
  },

  methods: {
    checkcurrentroute(route) {
      if (route.meta.title === "QuizTheme") {
        this.ShowNav = false;
      } else {
        this.ShowNav = true;
      }
    },
    async currentUser() {
      let userId = this.$store.getters["auth/userId"];

      try {
        await this.$store.dispatch("students/AllUsers");
        let user = this.$store.getters["students/allUsers"].find(
          (el) => el.id == userId
        );

        this.imgUrl = "data:image/jpeg;base64," + user.imgByte;
      } catch (e) {
        console.log(e);
      }
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.replace("/home");
    },
    show() {
      this.showMenu = !this.showMenu;
    },
    async userPoints() {
      try {
        await this.$store.dispatch("courses/userCourses");
        const currentUserId = this.$store.getters["auth/userId"];

        const userCoursesData = this.$store.getters[
          "courses/UserCourses"
        ].filter((el) => el.apiUserId === currentUserId);

        userCoursesData.forEach((element) => {
          this.allPoints = this.allPoints + element.userPoints;
        });
        console.log(this.allPoints);
      } catch (e) {
        this.Error = "failed to Get Courses" || e.message;
        console.log;
      }
    },
  },
  watch: {
    $route(newRoute) {
      this.checkcurrentroute(newRoute);
    },
  },
  created() {
    this.userPoints();
    this.currentUser();
  },
};
</script>

<style scoped lang="scss">
nav {
  z-index: 9999;
  .logo {
    width: 230px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  ul {
    li {
      transition: 0.2s all ease-in-out;
      letter-spacing: 1px;

      &:hover {
        color: #16b0a6;
      }
    }
    li a.router-link-active,
    li a.router-link-exact-active {
      color: #16b0a6;
      position: relative;
      &::after {
        position: absolute;
        content: "";
        width: 50px;
        height: 1px;
        background: #16b0a6;
        left: 0;
        bottom: -2px;
      }
    }
  }
  button {
    transition: all 0.2s ease-in-out;
  }
  /* hamburger */
  .hamburger {
    position: relative;
    margin-left: 10rem;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  .bamburger-top,
  .bamburger-middle,
  .bamburger-bottom {
    position: absolute;
    top: 0;
    left: 0;
    width: 26px;
    height: 2px;
    background: white;
    transform: rotate(0);
    transition: all 0.5s;
  }

  .bamburger-middle {
    transform: translateY(7px);
  }
  .bamburger-bottom {
    transform: translateY(14px);
  }

  .open {
    transform: rotate(90deg);
    transform: translateY(0);
  }

  .open .bamburger-top {
    transform: rotate(45deg) translateY(6px) translate(6px);
  }
  .open .bamburger-middle {
    display: none;
  }
  .open .bamburger-bottom {
    transform: rotate(-45deg) translateY(6px) translate(-6px);
  }

  a {
    &:hover {
      color: #16b0a6;
    }
  }
}
</style>
