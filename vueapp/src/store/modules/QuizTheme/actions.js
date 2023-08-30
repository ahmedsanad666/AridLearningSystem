const BaseUrl = "https://localhost:7243/arid/Quiz";
export default {
  async AddQuiz(_, payload) {
    const response = await fetch(BaseUrl, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: payload,
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
    console.log(responseData);

    const Quiziz = responseData.quizis.map((el) => {
      let Questions = [];
      if (el.type === "multipleChoices") {
        Questions = responseData.multiQuesitn.filter((u) => u.quizId === el.id);
      } else if (el.type === "fillTheBlank") {
        Questions = responseData.fillBlankQuestions.filter(
          (u) => u.quizId === el.id
        );
      } else if (el.type === "DragDrop") {
        Questions = responseData.dragDropQ.filter((u) => u.quizId === el.id);
      }

      return {
        ...el,
        Questions: { ...Questions },
      };
    });
    console.log(Quiziz);

    context.commit("setQuizis", Quiziz);
  },
  //..............
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
  async MultipleQuizis(context, payload) {
    const response = await fetch(`${BaseUrl}/${payload}`);
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "failed to get data");
      throw error;
    }

    context.commit("setmultipleQuiziz", responseData);
  },

  //......................
  async fillBlankQuizis(context, payload) {
    const response = await fetch(`${BaseUrl}/${payload}`);
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "failed to get data");
      throw error;
    }

    context.commit("setFillblankQuizis", responseData);
  },
  async AddFillblankQuestion(_, payload) {
    const response = await fetch(`${BaseUrl}/AddFillBlank`, {
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
  //....................
  async AddDragDropQuiz(_, payload) {
    const response = await fetch(`${BaseUrl}/addDragDrop`, {
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
  //....................
  async addmatchQuestion(_, payload) {
    const response = await fetch(`${BaseUrl}/match`, {
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
  async uploadImage(_, payload) {
    const response = await fetch(`${BaseUrl}/addPic`, {
      method: "POST",

      body: payload,
    });

    if (!response.ok) {
      console.log(response);

      const error =  "failed to add quiz";
      throw error;
    }
    console.log(response);
  },
};
