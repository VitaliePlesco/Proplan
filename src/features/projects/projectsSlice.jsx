import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
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
  projects: [],
  status: "idle",
  error: null,
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const response = await getDocs(projectsCollection);
    const projects = [];

    response.docs.map((doc) => {
      projects.push({ ...doc.data() });
    });

    return projects;
  }
);

export const addNewProject = createAsyncThunk(
  "projects/addNewProject",
  async (initialProject) => {
    try {
      await addDoc(projectsCollection, initialProject);
      console.log(initialProject.id);
      return initialProject;
    } catch (error) {
      console.error(error);
    }
  }
);

export const setNewProject = createAsyncThunk(
  "projects/setNewProject",
  async (initialProject) => {
    try {
      await setDoc(doc(db, "Projects", initialProject.id), initialProject);
      console.log(initialProject.id);
      return initialProject;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (initialProject) => {
    const { id } = initialProject;
    const projectDoc = doc(db, "Projects", id);
    try {
      await deleteDoc(projectDoc);
      console.log(id, "delete thunk");
      return initialProject;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (initialProject) => {
    const { id } = initialProject;
    const projectDoc = doc(db, "Projects", id);
    try {
      await updateDoc(projectDoc, {
        title: initialProject.title,
        type: initialProject.type,
      });

      return initialProject;
    } catch (error) {
      console.error(error);
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    todoAdded(state, action) {
      const { projectId, id, title, description, status } = action.payload;
      const existingProject = state.projects.find(
        (project) => project.id == projectId
      );
      console.log(existingProject, "added");
      if (existingProject) {
        existingProject.todos.push({
          id,
          title,
          status,
          description,
        });
      }
    },
    todoStatusUpdated(state, action) {
      const { projectId, id, status } = action.payload;
      const project = state.projects.find((project) => project.id == projectId);
      const todo = project.todos.find((todo) => todo.id === id);
      todo.status = status;
    },
    todoSummaryUpdated(state, action) {
      const { projectId, id, summary } = action.payload;
      const project = state.projects.find((project) => project.id == projectId);
      const todo = project.todos.find((todo) => todo.id === id);
      todo.title = summary;
    },
    todoDescriptionUpdated(state, action) {
      const { projectId, id, value } = action.payload;
      const project = state.projects.find((project) => project.id == projectId);
      const todo = project.todos.find((todo) => todo.id === id);
      todo.description = value;
    },
    todoDeleted(state, action) {
      const { projectId, id } = action.payload;
      const project = state.projects.find((project) => project.id == projectId);
      const todos = project.todos.filter((todo) => todo.id !== id);
      project.todos = todos;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProjects.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(setNewProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        if (!action.payload.id) {
          console.log("Could not delete project");
          return;
        }
        const { id } = action.payload;
        state.projects = state.projects.filter((project) => project.id != id);
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        if (!action.payload.id) {
          console.log("Could not update project");
          return;
        }
        const { id, title, type } = action.payload;
        const existingProject = state.projects.find(
          (project) => project.id == id
        );

        if (existingProject) {
          existingProject.title = title;
          existingProject.type = type;
        }
      });
  },
});

export const {
  todoAdded,
  todoStatusUpdated,
  todoSummaryUpdated,
  todoDescriptionUpdated,
  todoDeleted,
} = projectsSlice.actions;

export const selectAllProjects = (state) => state.projects.projects;
export const getProjectsStatus = (state) => state.projects.status;

export const selectProjectById = (state, projectId) => {
  state.projects.projects.find((project) => project.id === projectId);
};

export default projectsSlice.reducer;
