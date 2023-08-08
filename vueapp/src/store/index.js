import { createStore } from "vuex";
import authModule from './modules/auth/index';
import coursesmodule from './modules/courses/index'
import Studentsmodule from "./modules/Students";
import Blogmodule from "./modules/Blog/index";

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
   blog:Blogmodule
  },

});

export default store;