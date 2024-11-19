import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "example",
  initialState: {},
  reducers: {
    // tus reducers aquí
  },
});

const store = configureStore({
  reducer: {
    example: slice.reducer,
  },
});

export default store;
