import reducer from "./reducer";
import * as Actions from "./actions";
import Select from "./selectors";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer, //main core logic appReducer
  devTools: process.env.NODE_ENV !== "production", // DevTools only in dev
});

async function checkReducerUpdate() {
  const reducerModule = await import("./reducer");
  const updatedReducer = reducerModule.default;
  if (reducer !== updatedReducer) {
    store.replaceReducer(updatedReducer);
  }
}
store.subscribe(() => {
  checkReducerUpdate().catch(console.error);
});
export { store, Actions, Select };

export type RootState = ReturnType<typeof store.getState>;
