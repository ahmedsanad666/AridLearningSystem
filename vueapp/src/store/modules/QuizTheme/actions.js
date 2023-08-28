import { resolveDirective } from "vue";

const BaseUrl = "https://localhost:7243/arid/Quiz";
export default {
  async AddQuiz(_, payload) {
    const response = await fetch(BaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "failed to add quiz");
      throw error;
    }

    return responseData;
  },
  async AddMultipleQuestion(_, payload) {
    const response = await fetch(`${BaseUrl}/AddMultipleQuestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "failed to add quiz");
      throw error;
    }

    return responseData;
  },

  async GetAllQuiziz(context) {
    const response = await fetch(BaseUrl);
    const responseData = await response.json();

    if (!response.ok) {
      console.log(response);
      const error = new Error("failed to add quiz");
      throw error;
    }

    const Quiziz = responseData.quizis.map((el) => {
      const Questions = responseData.multiQuesitn.filter(
        (u) => u.quizId === el.id
      );

      return {
        ...el,
        Questions: { ...Questions },
      };
    });

    context.commit("setQuizis", Quiziz);
  },
};
