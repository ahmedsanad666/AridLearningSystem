import actions from "./actions";

import getters from "./getters";

import mutations from "./mutations";

export default {
  namespaced:true,
  state() {
    return {
      CommentsCount:0,
      slideComments:[],
      UserCourses:[
      
    ],
         courses:[
 
      ],
      CoureChapters:[
      
       
      ],
      lessons:[
       
     
      ]
    };
  },
  mutations,
  getters,
  actions,
};
