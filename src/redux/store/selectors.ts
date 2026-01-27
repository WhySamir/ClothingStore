// selectors are used to select the data or return slice from the store

import { createSelector } from "reselect";
// createSelector(
//   ...inputSelectors,
//   resultFunc)
import initialState from "./initialState";

const selectRoot = (state: any) => state || initialState; //main selector logic
const createInitialSelectors = () => {
  const selectors: any = {};
  Object.keys(initialState).map((key) => {
    selectors[key] = createSelector(selectRoot, (state) => state[key]);
    //selectors.user = createSelector(selectRoot, (state) => state.user)
  });
  return selectors;
};
const selectors = createInitialSelectors();
export default selectors;
