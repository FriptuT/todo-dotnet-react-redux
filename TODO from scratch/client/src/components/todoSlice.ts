import { Todo } from "../models/Todo";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface todoState {
  items: Todo[]
}

const initialState: todoState = {
  items: []
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setInitialState: (state,action) => {
      state.items = action.payload;
    }
    ,
    setItems: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
    },
    addItem: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<Todo>) => {
      const updatedIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (updatedIndex !== -1) {
        state.items[updatedIndex] = action.payload;
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== id);
    },
  }
});

export const { setItems, addItem, updateItem, deleteItem } = todoSlice.actions;

