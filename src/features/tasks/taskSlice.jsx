import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  status: "idle",
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase();
  },
});

export const taskAdded = taskSlice.actions;

export default taskSlice.reducer;
