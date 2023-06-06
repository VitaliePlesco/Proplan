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
        status: "todo",
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
        status: "todo",
      },
      {
        id: 3,
        title: "Clean the bathroom",
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

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    taskAdded(state, action) {
      state.todos.push(action.payload);
    },
  },
});

export const taskAdded = taskSlice.actions;

export default taskSlice.reducer;
