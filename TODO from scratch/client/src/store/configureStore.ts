/* eslint-disable no-undef */
import { configureStore } from "@reduxjs/toolkit";
import {todoSlice} from "../components/todoSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer:{
        todo: todoSlice.reducer
    }
});




export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;