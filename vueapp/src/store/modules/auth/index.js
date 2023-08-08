import actions from './actions';

import getters from './getters';

import mutations from './mutations';

export default {
  namespaced:true,
  state() {
    return {
      userId:null,
      token: null,
      // tokenExpiration: null,
      role:0
    };
  },
  mutations,
  getters,
  actions,
};
