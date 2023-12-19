/* eslint-disable no-unused-vars */
import { Button, Grid, TextField } from "@mui/material";
import TaskComponent from "./TaskComponent";
import React, { useEffect, useState } from "react";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { addItem, deleteItem, setError, setItems, setLoading } from "./todoSlice";
import agent from "../consumingApi/agent";

export default function TextInput() {
  const dispatch = useAppDispatch();

  const [newTodo, setNewTodo] = useState("");
  const [idCounter, setIdCounter] = useState(1);
  const todos = useAppSelector((state) => state.todo.todos);

  useEffect(() => {
    const fetchData = async () => {
      try{
        dispatch(setLoading(true));

        const todos = await agent.TODO.getAll();

        console.log(todos);

        dispatch(setItems(todos));
        dispatch(setLoading(false));
      }
      catch(error)
      {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      }
    };

    fetchData();

  },[dispatch])


  const handleAddTodo = () => {
    setIdCounter((prev) => prev + 1);
    dispatch(addItem({ id: idCounter, text: newTodo }));
    setNewTodo("");
  };

 

  const customButtonStyle = {
    height: "55px", // Set your desired height
  };

  return (
    <Grid container spacing={1} sx={{ mb: 3 }}>
      <Grid item xs={5}>
        <TextField
          id="outlined-basic"
          label="Be productive!"
          variant="outlined"
          fullWidth
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
      </Grid>
      <Grid item xs={5}>
        <Button
          style={customButtonStyle}
          variant="contained"
          color="success"
          size="large"
          onClick={handleAddTodo}
        >
          <LibraryAddOutlinedIcon></LibraryAddOutlinedIcon>
        </Button>
      </Grid>
      <Grid item xs={5}>
        <TaskComponent  />
      </Grid>
    </Grid>
  );
}
