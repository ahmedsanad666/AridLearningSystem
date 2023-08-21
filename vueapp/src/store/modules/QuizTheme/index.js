import actions from "./actions";

import getters from "./getters";

import mutations from "./mutations";

export default {
  namespaced:true,
  state() {
    return {
      Quiziz:[
    {
      id:1 ,   
         type:'multiChoises',
      Questions:[
        {
          question:'this is question 1',
          choices:['this is coic1', 'this is qhid 2 ', 'thsi is choice 3'],
          point:10,
          time:10,
          answer:1
        },
          {
          question:'this is question 2',
          choices:['this is choice ', ' is qhid 2 ', 'thsi is choice 3'],
          point:10,
          time:5,
          answer:2
        },
          {
          question:'this is question 3',
          choices:['this is ', 'this is  2 ', 'thsi is choice 3'],
          point:10,
          time:4,
          answer:3
        },
          {
          question:'this is question 4',
          choices:['this is coic1', 'this is qhid 2 ', 'thsi is choice 3','th is is nadof 3 '],
          point:20,
          time:6,
          answer:2
        },
      ]
    }
      
    ]
    }
      
       
   
  },
  mutations,
  getters,
  actions,
};
