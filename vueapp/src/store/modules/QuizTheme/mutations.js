export default {
  setQuizis(state, payload) {
    state.Quiziz = payload;
  },
  setmultipleQuiziz(state, payload) {
    state.multipleQuiziz = payload;
    console.log(state.multipleQuiziz);
  },
  setFillblankQuizis(state, payload) {
    state.fillBlankQuizis = payload;
    console.log(state.fillBlankQuizis);
  },
};
