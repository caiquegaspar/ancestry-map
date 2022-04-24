import { defineStore } from 'pinia';

import state from './state';
// import * as getters from "./getters";
// import * as actions from "./actions";
import getters from './getters';
import actions from './actions';

export const useMapStore = defineStore('map', {
  state,
  getters,
  actions,
});
