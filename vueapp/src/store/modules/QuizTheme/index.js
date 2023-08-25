import actions from "./actions";

import getters from "./getters";

import mutations from "./mutations";

export default {
  namespaced: true,
  state() {
    return {
      Quiziz: [
        {
          id: 1,
          type: "multipleChoices",
          Questions: [
            {
              question: "this is question 1",
              choices: [
                "this is coic1",
                "this is qhid 2 ",
                "thsi is choice 3",
                "dsaf",
              ],
              point: 10,
              time: 200,
              answer: 1,
            },
            {
              question: "this is question 2",
              choices: [
                "this is choice ",
                " is qhid 2 ",
                "thsi is choice 3",
                "dsafds",
              ],
              point: 50,
              time: 200,
              answer: 2,
            },
            {
              question: "this is question 3",
              choices: [
                "this is ",
                "this is  2 ",
                "thsi is choice 3",
                "dsafjlkds",
              ],
              point: 10,
              time: 200,
              answer: 3,
            },
            {
              question: "this is question 4",
              choices: [
                "this is coic1",
                "this is qhid 2 ",
                "thsi is choice 3",
                "th is is nadof 3 ",
                "kldsfjk",
              ],
              point: 20,
              time: 200,

              answer: 2,
            },
          ],
        },
        {
          id: 2,
          type: "fillTheBlank",
          Questions: [
            {
              question: "__ is is question ",

              point: 10,
              time: 200,
              answer: "this",
            },
            {
              question: "this......... question 2",

              point: 50,
              time: 200,
              answer: "is",
            },
            {
              question: "this.......... question 3",

              point: 10,
              time: 200,
              answer: "mohamed",
            },
          ],
        },
        {
          id: 3,
          type: "DragDrop",
          Questions: [
            {
              rightQ: "الدول العلربية تقع فى الشرق",
              question: " الدول --- تقع في ---    ",
              choices: ["الشرق", "يسششيسب ", "العربية", "شيسبيسب "],
              point: 10,

              time: 200,
              answer: [3, 1],
            },
            {
              question: "i will ---  that morning ",
              choices: ["go", "fap ", "drop", "fop "],
              point: 10,
              time: 200,
              answer: [1],
            },
            {
              question: "when --- done --- raady",
              choices: ["drag", "we", "drop", "be"],
              point: 10,
              time: 200,
              answer: [2, 4],
            },
          ],
        },
        {
          id: 4,
          type: "match",
          Questions: [
            {
              choices: ["boy", "girl ", "pen", "lamp "],
              Pics: [
                {
                  img: "https://cdn-icons-png.flaticon.com/512/4329/4329449.png",
                  answer: 2,
                },
                {
                  img: "https://cdn-icons-png.flaticon.com/512/1717/1717696.png",
                  answer: 1,
                },
                {
                  img: "https://cdn-icons-png.flaticon.com/512/11508/11508429.png",
                  answer: 4,
                },
                {
                  img: "https://cdn-icons-png.flaticon.com/512/613/613333.png",
                  answer: 3,
                },
              ],
              point: 10,

              time: 200,
            },
           
            {
              choices: ["milk", "apple ", "lion", "hand "],
              Pics: [
                {
                  img: "https://cdn-icons-png.flaticon.com/512/415/415733.png",
                  answer: 2,
                },
                {
                  img: "https://cdn-icons-png.flaticon.com/512/869/869460.png",
                  answer: 1,
                },
                {
                  img: "https://cdn-icons-png.flaticon.com/512/1/1427.png",
                  answer: 4,
                },
                {
                  img: "https://cdn-icons-png.flaticon.com/512/1998/1998713.png",
                  answer: 3,
                },
              ],
              point: 10,

              time: 200,
            },
            {
              choices: ["boy", "girl ", "pen", "lamp "],
              Pics: [
                {
                  img: "https://cdn-icons-png.flaticon.com/512/4329/4329449.png",
                  answer: 2,
                },
                {
                  img: "https://cdn-icons-png.flaticon.com/512/1717/1717696.png",
                  answer: 1,
                },
                {
                  img: "https://cdn-icons-png.flaticon.com/512/11508/11508429.png",
                  answer: 4,
                },
                {
                  img: "https://cdn-icons-png.flaticon.com/512/613/613333.png",
                  answer: 3,
                },
              ],
              point: 10,

              time: 200,
            },
           
          ],
        },
      ],
    };
  },
  mutations,
  getters,
  actions,
};
