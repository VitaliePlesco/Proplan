import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  doc,
  setDoc,
  deleteDoc,
  addDoc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";

import { db } from "../auth/firebase-config";

const projectsCollection = collection(db, "Projects");

const initialState = {
  tasks: [],
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTask", async () => {});

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  // extraReducers(builder) {
  //   builder.addCase();
  // },
});

export const taskAdded = taskSlice.actions;

export default taskSlice.reducer;
