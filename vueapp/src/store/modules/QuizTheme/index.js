import actions from "./actions";

import getters from "./getters";

import mutations from "./mutations";

export default {
  namespaced: true,
  state() {
    return {
      fillBlankQuizis:[],
      multipleQuiziz:[],
      Quiziz: [
        // {
        //   id: 1,
        //   type: "multipleChoices",
        //   Questions: [
        //     {
        //       question: "من هو الملك الذي أمر ببناء الأهرامات في مصر؟",
        //       choices: ["توت عنخ آمون", "أخناتون ", "خوفو", "رمسيس الثاني "],
        //       point: 10,
        //       time: 200,
        //       answer: 1,
        //     },
        //     {
        //       question: "في أي سنة وقعت ثورة أكتوبر الروسية؟",
        //       choices: ["1917", " 1920", "1905", "1930"],
        //       point: 50,
        //       time: 200,
        //       answer: 2,
        //     },
        //     {
        //       question: "من هو الزعيم السياسي والرمز الروحي للمانديلا؟",
        //       choices: [
        //         "نيلسون مانديلا",
        //         "محمد علي جناح",
        //         "عبد الناصر",
        //         "جمال عبد الناصر",
        //       ],
        //       point: 10,
        //       time: 200,
        //       answer: 3,
        //     },
        //     {
        //       question:
        //         "ما هي المعركة التي انتصر فيها صلاح الدين الأيوبي على الصليبيين في عام 1187؟",
        //       choices: [
        //         "معركة بلاط الشهداء",
        //         " معركة حطين",
        //         "معركة عين جالوت",
        //         "معركة حطين",
        //       ],
        //       point: 20,
        //       time: 200,

        //       answer: 2,
        //     },
        //   ],
        // },
        // {
        //   id: 2,
        //   type: "fillTheBlank",
        //   Questions: [
        //     {
        //       question: "محمد رسول الله ... رسالته إلى البشرية. ",

        //       point: 10,
        //       time: 200,
        //       answer: "أوصى",
        //     },
        //     {
        //       question: "... هي عاصمة مصر.",

        //       point: 50,
        //       time: 200,
        //       answer: "القاهرة",
        //     },
        //     {
        //       question: "الثعبان حيوان ... ينتمي إلى عائلة الزواحف.",

        //       point: 10,
        //       time: 200,
        //       answer: "قار",
        //     },
        //   ],
        // },
        // {
        //   id: 3,
        //   type: "DragDrop",
        //   Questions: [
        //     {
        //       question: " الدول --- تقع في ---    ",
        //       choices: ["الشرق", "الجنوب ", "العربية", "الاسيوية "],
        //       point: 10,
        //       time: 200,
        //       answer: [3, 1],
        //     },
        //     {
        //       question: "العاصمة الإنجليزية هي ---  ",
        //       choices: ["لندن", "باريس ", "روما", "مدريد "],
        //       point: 10,
        //       time: 200,
        //       answer: [1],
        //     },
        //     {
        //       question: "النيل هو أطول نهر في ---",
        //       choices: ["أمريكا الشمالية", "آسيا", "إفريقيا ", "أوروبا"],
        //       point: 10,
        //       time: 200,
        //       answer: [3],
        //     },
        //   ],
        // },
        // {
        //   id: 4,
        //   type: "match",
        //   Questions: [
        //     {
        //       choices: ["ولد", "فتاة ", "قلم", "مصباح "],

        //       Pics: [
        //         {
        //           img: "https://cdn-icons-png.flaticon.com/512/4329/4329449.png",
        //           answer: 2,
        //         },
        //         {
        //           img: "https://cdn-icons-png.flaticon.com/512/1717/1717696.png",
        //           answer: 1,
        //         },
        //         {
        //           img: "https://cdn-icons-png.flaticon.com/512/11508/11508429.png",
        //           answer: 4,
        //         },
        //         {
        //           img: "https://cdn-icons-png.flaticon.com/512/613/613333.png",
        //           answer: 3,
        //         },
        //       ],
        //       point: 10,

        //       time: 200,
        //     },

        //     {
        //       choices: ["حليب", "تفاحة ", "اسد", "يد "],
        //       Pics: [
        //         {
        //           img: "https://cdn-icons-png.flaticon.com/512/415/415733.png",
        //           answer: 2,
        //         },
        //         {
        //           img: "https://cdn-icons-png.flaticon.com/512/869/869460.png",
        //           answer: 1,
        //         },
        //         {
        //           img: "https://cdn-icons-png.flaticon.com/512/1/1427.png",
        //           answer: 4,
        //         },
        //         {
        //           img: "https://cdn-icons-png.flaticon.com/512/1998/1998713.png",
        //           answer: 3,
        //         },
        //       ],
        //       point: 10,

        //       time: 200,
        //     },
        //     {
        //       choices: ["ولد", "بنت ", "قلم", "مصباح "],
        //       Pics: [
        //         {
        //           img: "https://cdn-icons-png.flaticon.com/512/4329/4329449.png",
        //           answer: 2,
        //         },
        //         {
        //           img: "https://cdn-icons-png.flaticon.com/512/1717/1717696.png",
        //           answer: 1,
        //         },
        //         {
        //           img: "https://cdn-icons-png.flaticon.com/512/11508/11508429.png",
        //           answer: 4,
        //         },
        //         {
        //           img: "https://cdn-icons-png.flaticon.com/512/613/613333.png",
        //           answer: 3,
        //         },
        //       ],
        //       point: 10,

        //       time: 200,
        //     },
        //   ],
        // },
      ],
    };
  },
  mutations,
  getters,
  actions,
};
