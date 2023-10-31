import { createStore } from "vuex";
import authModule from './modules/auth/index';
import coursesmodule from './modules/courses/index'
import Studentsmodule from "./modules/Students";
import Blogmodule from "./modules/Blog/index";
import QuizTheme from "./modules/QuizTheme/index";

const store = createStore({
  state: {
    dir: "rtl",
   
  },
  getters:{
    getDir(state) {
      return state.dir;
    },
  },

  actions: {
    changeDir(context, payload) {
      context.commit("dir", payload);
    },
  },
  modules: {
    auth:authModule,
    courses:coursesmodule,
   students: Studentsmodule,
   blog:Blogmodule,
   Quiz:QuizTheme
  },

});
export const ApiOriginUrl = 'https://localhost:7243';
export const BaseUrl  = `${ApiOriginUrl}/arid/Quiz`;
export default store;