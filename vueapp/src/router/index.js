import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import AboutPage from "../views/AboutPage.vue";
import CoursePage from "../views/CoursePage.vue";
import GalleryPage from "../views/GalleryPage.vue";
import ContactPage from "../views/ContactPage.vue";
import SesstionPage from "../views/SesstionPage.vue";
import CourseDetailsPage from "../views/CourseDetailsPage.vue";
import LessonPage from "../views/LessonPage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import CurrentCourse from "../views/CurrentCourse.vue";
import AdminPage from "../views/Admin/AdminPage.vue";
import ChaptersPage from "../views/Admin/ChaptersPage.vue";
import ManageLesson from "../views/Admin/ManageLesson.vue";
import ManageSlides from "../views/Admin/ManageSlides.vue";
import LeaderBoard from "../views/LeaderBoard.vue";
import AuthPage from "../views/Auth/AuthPage.vue";
import AllBlogs from "../views/Blog/AllBlogs.vue";
import SingleBlog from "../views/Blog/SingleBlog.vue";
import AddBlog from "../views/Blog/AddBlog.vue";

// ..............................
// quiz theme
import QuizTheme from "../views/QuizTheme/QuizTheme.vue";
import FillBlank from "../components/QuizTheme/FillBlank.vue";
import QuizList from "../views/QuizTheme/QuizList.vue";
import AllQuiziz from "../views/QuizTheme/AllQuiziz.vue";
/// quiz Admin
import AddQuiz from "../views/QuizAdmin/AddQuiz.vue";
import CreateQuestion from "../views/QuizAdmin/CreateQuestion.vue";
import AddQuestion from "../views/QuizAdmin/AddQuesiton.vue";

// live quiz
import LiveQuiz from "../views/LiveQuiz/LiveQuiz.vue";
import QuizLink from "@/views/LiveQuiz/QuizLink.vue";
import AdminQuiz from '../views/LiveQuiz/AdminQuiz.vue'



const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePage,
    meta: {
      title: "profile",
    },
  },
  {
    path: "/Admin",
    name: "admin",
    component: AdminPage,
    meta: {
      title: "Admin",
    },
  },
  {
    path: "/Admin/:CourseId",
    name: "editChapter",
    component: ChaptersPage,
    meta: {
      title: "Edit Chapter",
    },
  },
  {
    path: "/profile/:userCourse",
    name: "UserCourse",
    component: CurrentCourse,
    meta: {
      title: "Course",
    },
  },
  {
    path: "/courses/:courseName/:lessonId/",
    name: "lesson",
    component: LessonPage,
    meta: {
      title: "lesson",
    },
  },
  {
    path: "/courses/:CourseDetails",
    name: "CourseDetails",
    component: CourseDetailsPage,
    props: true,
    meta: {
      title: "Lessons",
    },
  },
  {
    path: "/Admin/:CourseId/:ChapterId",
    name: "ManageLesson",
    component: ManageLesson,
    meta: {
      title: "Manage Lesson",
    },
  },
  {
    path: "/Admin/Lessons/:lessonId",
    name: "ManageSlides",
    component: ManageSlides,
    meta: {
      title: "Manage slides",
    },
  },
  {
    path: "/LeaderBoard",
    name: "LeaderBoard",
    component: LeaderBoard,
    meta: {
      title: "LeaderBoard",
    },
  },
  {
    path: "/auth",
    name: "auth",
    component: AuthPage,
    meta: {
      title: "auth page",
    },
  },
  {
    path: "/Blogs",
    name: "Blogs",
    component: AllBlogs,
    meta: {
      title: "blogs",
    },
  },
  {
    path: "/Blogs/AddBlog",
    name: "AddBlog",
    component: AddBlog,
    meta: {
      title: "add blog",
    },
  },
  {
    path: "/Blogs/:BlogId",
    name: "SingleBlog",
    component: SingleBlog,
    meta: {
      title: "blog",
    },
  },

  {
    path: "/sesstions",
    name: "sesstions",
    component: SesstionPage,
    meta: {
      title: "psychological support",
    },
  },
  {
    path: "/home",
    name: "home",
    component: HomePage,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
    meta: {
      title: "about",
    },
  },
  {
    path: "/courses",
    name: "courses",
    component: CoursePage,
    meta: {
      title: "courses",
    },
  },
  {
    path: "/gallery",
    name: "gallery",
    component: GalleryPage,
    meta: {
      title: "gallery",
    },
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactPage,
    meta: {
      title: "contact",
    },
  },
  ///.......... quiz theme
  {
    path: "/quizTheme/:quizId",
    component: QuizTheme,
    name: "QuizTheme",
    meta: {
      title: "QuizTheme",
    },
  },
  {
    path: "/quizList",
    component: QuizList,
    name: "quizList",
    meta: {
      title: "quizlist",
    },
  },
  {
    path: "/AllQuiziz/:QuizType",
    component: AllQuiziz,
    name: "AllQuiziz",
    meta: {
      title: "AllQuiziz",
    },
  },
  {
    path: "/FillBlank",
    component: FillBlank,
    name: "fillBlank",
    meta: {
      title: "fillBlank",
    },
  },
  {
    path: "/AddQuiz",
    component: AddQuiz,
    name: "AddQuiz",
    meta: {
      title: "Add Quiz",
    },
  },
  {
    path: "/CreateQuestion/:QuizId/:QuizType",
    component: CreateQuestion,
    name: "CreateQuestion",
    meta: {
      title: "AddQuestion",
    },
  },
  {
    path: "/AddQuestion/:QuizId/:QuizType",
    component: AddQuestion,
    name: "AddQuestion",
    meta: {
      title: "AddQuestion",
    },
  },
  // live quiz
  {
    path: "/liveQuiz/:quizId/:presentationId",
    component: LiveQuiz,
    name: "liveQuiz",
    meta: {
      title: "liveQuiz",
    },
  },
  {
    path: "/QuizLink/:quizId",
    component: QuizLink,
    name: "QuizLink",
    meta: {
      title: "QuizLink",
    },
  },
  {
    path: "/presentation/:quizId",
    component: AdminQuiz,
    name: "presentation",
    meta: {
      title: "presentation",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  document.title = to.meta.title;

  next();
});

export default router;
