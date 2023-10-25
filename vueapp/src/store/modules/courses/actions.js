export default {
  async AllCourses(context) {
    const response = await fetch("https://localhost:7243/arid/courses");
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "failed to get courses");

      throw error;
    }
    const courses = [];
    responseData.forEach((element) => {
      courses.push(element);
    });

    context.commit("LoadAllCourses", courses);
  },
  async userCourses(context) {
    const response = await fetch("https://localhost:7243/arid/usercourse");

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "failed to get courses");

      throw error;
    }
    const Usercourses = [];
    responseData.forEach((element) => {
      Usercourses.push(element);
    });

    context.commit("LoadUserCourses", Usercourses);
  },
  async userchapters(context) {
    const response = await fetch("https://localhost:7243/arid/coursechapter");

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "failed to get chapters");

      throw error;
    }
    const chapters = [];
    responseData.forEach((element) => {
      chapters.push(element);
    });

    context.commit("LoadCoureChapters", chapters);
  },
  async LoadLessons(context) {
    const response = await fetch("https://localhost:7243/arid/lesson");

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "failed to get lessons");

      throw error;
    }

    const lessons = responseData.lessonData;
    const slides = responseData.slides;
    const questions = responseData.questions;
    const combinedData = lessons.map((lesson) => ({
      ...lesson,
      slides: slides
        .filter((slide) => slide.lessonId === lesson.id)
        .map((slide) => ({
          ...slide,
          questions: questions.filter(
            (question) => question.slideId === slide.customId
          ),
        })),
    }));

    context.commit("LoadLessons", combinedData);
  },

  //........................ course curd operations..........
  async deleteCourse(_, payload) {
    const response = await fetch(
      `https://localhost:7243/arid/courses/${payload}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const Error = new Error(response.message || "failed to delete");
    }
  },
  async UpdateCourse(_, payload) {
    const response = await fetch(
      `https://localhost:7243/arid/courses/${payload.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to application/json
        },
        body: JSON.stringify(payload),
      }
    );
    // const responseData = await response.json();

    if (!response.ok) {
      // const err = new Error(responseData.message|| 'failed ');
      console.log(response);
    }
  },

  async AddCourse(_, payload) {
    const token = localStorage.getItem("token");
    console.log(token);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(`https://localhost:7243/arid/courses`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    // const responseData = await response.json();

    console.log(JSON.stringify(payload));
    if (!response.ok) {
      // const err = new Error(responseData.message|| 'failed ');
      console.log(response);
    }
  },

  //........................ chapter curd operations..........

  async deletechapter(_, payload) {
    const response = await fetch(
      `https://localhost:7243/arid/coursechapter/${payload}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const Error = new Error(response.message || "failed to delete");
    }
  },

  async UpdateChapter(_, payload) {
    const response = await fetch(
      `https://localhost:7243/arid/coursechapter/${payload.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to application/json
        },
        body: JSON.stringify(payload),
      }
    );
    // const responseData = await response.json();

    if (!response.ok) {
      // const err = new Error(responseData.message|| 'failed ');
      console.log(response);
    }
  },

  async AddChapter(_, payload) {
    const response = await fetch(`https://localhost:7243/arid/coursechapter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header to application/json
      },
      body: JSON.stringify(payload),
    });
    // const responseData = await response.json();

    if (!response.ok) {
      // const err = new Error(responseData.message|| 'failed ');
      console.log(response);
    }

    console.log(response);
  },

  //.................................... curd for lesssons

  async deletelesson(_, payload) {
    const response = await fetch(
      `https://localhost:7243/arid/lesson/${payload}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const Error = new Error(response.message || "failed to delete");
    }
  },

  async UpdateLesson(_, payload) {
    const response = await fetch(
      `https://localhost:7243/arid/lesson/${payload.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to application/json
        },
        body: JSON.stringify(payload),
      }
    );
    // const responseData = await response.json();

    if (!response.ok) {
      // const err = new Error(responseData.message|| 'failed ');
      console.log(response);
    }
  },

  async AddLesson(_, payload) {
    const response = await fetch(`https://localhost:7243/arid/lesson`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header to application/json
      },
      body: JSON.stringify(payload),
    });
    // const responseData = await response.json();

    if (!response.ok) {
      // const err = new Error(responseData.message|| 'failed ');
      console.log(response);
    }

    console.log(response);
  },

  async AddSlides(_, payload) {
    console.log(payload, "action");
    const response = await fetch(
      `https://localhost:7243/arid/lesson/AddSlides`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to application/json
        },
        body: JSON.stringify(payload),
      }
    );
    // const responseData = await response.json();

    if (!response.ok) {
      // const err = new Error(responseData.message|| 'failed ');
      console.log(response);
    }

    console.log(JSON.stringify(payload));
    console.log(response);
  },

  async AddUserCourse(_, payload) {
    const response = await fetch(`https://localhost:7243/arid/usercourse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header to application/json
      },
      body: JSON.stringify(payload),
    });
    // const responseData = await response.json();

    if (!response.ok) {
      // const err = new Error(responseData.message|| 'failed ');
      console.log(response);
    }
  },

  async updateUserCourse(_, payload) {
    const response = await fetch(
      `https://localhost:7243/arid/usercourse/${payload.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header to application/json
        },
        body: JSON.stringify(payload),
      }
    );
    // const responseData = await response.json();

    if (!response.ok) {
      // const err = new Error(responseData.message|| 'failed ');
      console.log(response);
    }
  },

  async SlideComments(context) {
    const response = await fetch("https://localhost:7243/arid/slideComment");

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "failed to get comments");

      throw error;
    }

    const comments = [];
    responseData.allComments.forEach((element) => {
      comments.push(element);
    });

    const count = responseData.count;

    context.commit("LoadComments", comments);
    context.commit("loadCommentsCount", count);
  },

  async AddComment(_, payload) {
    const response = await fetch("https://localhost:7243/arid/slideComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log(JSON.stringify(payload));

    if (!response.ok) {
      console.log(response);
    }

    console.log(response);
  },
};
