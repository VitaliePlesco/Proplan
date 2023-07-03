import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
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

export const initialState = {
  tasks: [],
  status: "idle",
  error: null,
};

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async ({ uid, projectId }) => {
    let allTasks = [];
    console.log(allTasks);
    try {
      const querySnapshot = await getDocs(
        collection(db, uid, projectId, "todos")
      );
      querySnapshot.docs.map((doc) => {
        allTasks.push({ ...doc.data() });
      });
    } catch (error) {
      console.log(error);
    }
    return allTasks;
  }
);

export const addTask = createAsyncThunk("tasks/addTask", async (todo) => {
  const { uid, projectId, id, summary, description, status } = todo;
  const projectTodos = doc(db, uid, projectId, "todos", id);
  try {
    await setDoc(projectTodos, {
      id,
      summary,
      description,
      status,
    });
  } catch (error) {
    console.log(error);
  }
  return {
    id,
    summary,
    description,
    status,
  };
});

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (initialTask) => {
    const { id, uid, projectId } = initialTask;

    const taskDoc = doc(db, uid, projectId, "todos", id);
    console.log(taskDoc);
    try {
      await deleteDoc(taskDoc);

      return initialTask;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (initialTask) => {
    const { uid, projectId, id } = initialTask;
    const taskDoc = doc(db, uid, projectId, "todos", id);
    console.log(taskDoc, id, initialTask.summary);
    try {
      await updateDoc(taskDoc, {
        id: initialTask.id,
        summary: initialTask.summary,
        description: initialTask.description,
        status: initialTask.status,
      });

      return initialTask;
    } catch (error) {
      console.error(error);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    resetState(state, action) {
      state.tasks = initialState;
    },
    resetStatus(state, action) {
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const { id, summary, description, status } = action.payload;
        console.log(action.payload, "task");
        state.tasks.push({ id, summary, description, status });
        console.log(current(state));
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        if (!action.payload.id) {
          console.log(action.payload.id);
          return;
        }
        const { id } = action.payload;
        state.tasks = state.tasks.filter((task) => task.id != id);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        console.log(action.payload.id, "addcase");
        if (!action.payload.id) {
          console.log("Could not update task");
          return;
        }
        const { id, description, summary, status } = action.payload;
        console.log(id, "addcase");
        const existingTask = state.tasks.find((task) => task.id == id);

        if (existingTask) {
          existingTask.id = id;
          existingTask.summary = summary;
          existingTask.description = description;
          existingTask.status = status;
        }
      });
  },
});
export const selectAllTasks = (state) => state.tasks.tasks;
export const getTasksStatus = (state) => state.tasks.status;

export const { resetState, resetStatus } = taskSlice.actions;

export default taskSlice.reducer;
