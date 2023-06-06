import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "../features/projects/projectsSlice";
import tasksReducer from "../features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    todos: tasksReducer,
  },
});
