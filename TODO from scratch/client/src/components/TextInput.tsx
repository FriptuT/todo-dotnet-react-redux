/* eslint-disable no-unused-vars */
import { Button, Grid, TextField } from "@mui/material";
import TaskComponent from "./TaskComponent";
import React, { useEffect, useState } from "react";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import agent from "../consumingApi/agent";

export default function TextInput() {

  const [newTodo, setNewTodo] = useState('');
  const [todoItems, setTodoItems] = useState([]);
  

  useEffect(() => {
    agent.TODO.getAll()
      .then(todos => setTodoItems(todos))
      .catch(error => console.log(error))
  }, [])

  const addTodo = (text : string) => {
     agent.TODO.addItem(text)
      .catch(error => console.log(error))
      .then(() => {
        agent.TODO.getAll()
          .then(todos => setTodoItems(todos))
      })
      .finally(() => setNewTodo(''))
      console.log("added");
  };

  const handleInputChange = (event: any) => {
    setNewTodo(event.target.value);
  }

  const updateTodoItems = (newTodoItems) => {
    setTodoItems(newTodoItems);
  }
  
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
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={5}>
        <Button
          style={customButtonStyle}
          variant="contained"
          color="success"
          size="large"
          onClick={() => addTodo(newTodo)}
        >
          <LibraryAddOutlinedIcon></LibraryAddOutlinedIcon>
        </Button>
      </Grid>
      <Grid item xs={5}>
        <TaskComponent todoItems={todoItems} updateTodoItems={updateTodoItems} />
      </Grid>
    </Grid>
  );
}
