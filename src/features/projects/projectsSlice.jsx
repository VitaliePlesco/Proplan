import { sub } from "date-fns";
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 0,
    title: "Flying Cars",
    type: "Software",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    todos: [
      {
        id: 0,
        title: "Clean the windows",
        description: "Get a cloth spray on it some cleaning liquid. Wipe",
        status: "to do",
      },
      {
        id: 1,
        title:
          "Windows the clean. Get a cloth spray on it some cleaning liquid. Wipe",
        description: "Get a cloth spray on it some cleaning liquid. Wipe",
        status: "done",
      },
      {
        id: 2,
        title: "Clean the room",
        description: "Get a cloth spray on it some cleaning liquid. Wipe",
        status: "to do",
      },
      {
        id: 3,
        title: "Clean the bathroom",
        description: "Get a cloth spray on it some cleaning liquid. Wipe",
        status: "in progress",
      },
      {
        id: 4,
        title: "Tidy up the kitchen",
        description: "Get a cloth spray on it some cleaning liquid. Wipe",
        status: "in progress",
      },
    ],
  },
  {
    id: 1,
    title: "Room Cleaning",
    type: "Design",
    date: sub(new Date(), { minutes: 15 }).toISOString(),
    todos: [
      {
        id: 2,
        title: "Tidy up your room",
        description: "Get a cloth spray on it some cleaning liquid. Wipe",
        status: "done",
      },
    ],
  },
];

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    projectAdded(state, action) {
      state.push(action.payload);
    },
    projectUpdated(state, action) {
      const { id, title, type } = action.payload;
      const existingProject = state.find((project) => project.id == id);
      if (existingProject) {
        existingProject.title = title;
        existingProject.type = type;
      }
    },
    projectDeleted(state, action) {
      const { id } = action.payload;
      return state.filter((project) => project.id != id);
    },
    todoAdded(state, action) {
      const { projectId, id, title, status } = action.payload;

      const existingProject = state.find((project) => project.id == projectId);
      console.log(existingProject);
      if (existingProject) {
        console.log(action.payload);
        existingProject.todos.push({
          id,
          title,
          status,
        });
      }
    },
  },
});

export const { projectAdded, projectUpdated, projectDeleted, todoAdded } =
  projectsSlice.actions;

export const selectProjectById = (state, projectId) => {
  state.projects.find((project) => project.id === projectId);
};

export default projectsSlice.reducer;
