import agent from "../consumingApi/agent";
import { Todo } from "../models/Todo";
import { PayloadAction,  createSlice } from "@reduxjs/toolkit";

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};


export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setLoading: (state,action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setItems: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addItem: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<{id: number; text: string}>) => {
      const { id, text } = action.payload;
      const updatedIndex = state.todos.findIndex(
        (todo) => todo.id === id);
      if (updatedIndex !== -1) {
        state.todos[updatedIndex].text = text;
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const {setLoading, setError, setItems, addItem, updateItem, deleteItem } = todoSlice.actions;
