import { configureStore } from '@reduxjs/toolkit';
import ThreadSlice from "./newThreatSlice"
const store = configureStore({
  reducer: {
    newThreadSlice: ThreadSlice
  },
});

export default store;

