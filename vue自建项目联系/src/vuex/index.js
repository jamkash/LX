import Vue from 'vue';
import Vuex from 'vuex'
import state from './states'
import * as mutations from "./mutations";
import * as actions from "./actions";
Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions
})
