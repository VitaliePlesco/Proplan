import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  doc,
  setDoc,
  deleteDoc,
  addDoc,
  getDocs,
  collection,
  updateDoc,
  query,
  where,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../auth/firebase-config";

const initialState = {
  projects: [],
  status: "idle",
  error: null,
};

export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async ({ uid }) => {
    let allProjects = [];
    try {
      const querySnapshot = await getDocs(collection(db, uid));
      querySnapshot.docs.map((doc) => {
        allProjects.push({ ...doc.data(), id: doc.id });
      });
    } catch (error) {
      console.log(error);
    }
    return allProjects;
  }
);

export const setNewProject = createAsyncThunk(
  "projects/setNewProject",
  async (initialProject) => {
    const { uid } = initialProject;
    try {
      await setDoc(doc(db, uid, initialProject.id), initialProject);

      return initialProject;
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (initialProject) => {
    const { id, uid } = initialProject;

    const projectDoc = doc(db, uid, id);
    try {
      await deleteDoc(projectDoc);

      return initialProject;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (initialProject) => {
    const { uid, id } = initialProject;
    const projectDoc = doc(db, uid, id);
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
    // todoAdded(state, action) {
    //   const { projectId, id, title, description, status } = action.payload;
    //   const existingProject = state.projects.find(
    //     (project) => project.id == projectId
    //   );
    //   console.log(existingProject, "added");
    //   if (existingProject) {
    //     existingProject.todos.push({
    //       id,
    //       title,
    //       status,
    //       description,
    //     });
    //   }
    // },
    // todoStatusUpdated(state, action) {
    //   const { projectId, id, status } = action.payload;
    //   const project = state.projects.find((project) => project.id == projectId);
    //   const todo = project.todos.find((todo) => todo.id === id);
    //   todo.status = status;
    // },
    // todoSummaryUpdated(state, action) {
    //   const { projectId, id, summary } = action.payload;
    //   const project = state.projects.find((project) => project.id == projectId);
    //   const todo = project.todos.find((todo) => todo.id === id);
    //   todo.title = summary;
    // },
    // todoDescriptionUpdated(state, action) {
    //   const { projectId, id, value } = action.payload;
    //   const project = state.projects.find((project) => project.id == projectId);
    //   const todo = project.todos.find((todo) => todo.id === id);
    //   todo.description = value;
    // },
    // todoDeleted(state, action) {
    //   const { projectId, id } = action.payload;
    //   const project = state.projects.find((project) => project.id == projectId);
    //   const todos = project.todos.filter((todo) => todo.id !== id);
    //   project.todos = todos;
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(getProjects.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(setNewProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
        state.status = "idle";
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
        state.status = "idle";
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
