export default {
  setQuizis(state, payload) {
    state.Quiziz = payload;
  },
  setmultipleQuiziz(state, payload) {
    state.multipleQuiziz = payload;
  },
  setFillblankQuizis(state, payload) {
    state.fillBlankQuizis = payload;
  },
  SetmatchQuiziz(state, payload) {
    state.matchQuiziz = payload;
  },
  QuizResults(state, payload) {
    state.QuizResults = payload;
    console.log(state.QuizResults);
  },
  singleQuizResult(state,payload){
    state.singleQuizResult = payload
  }
};
