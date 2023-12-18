/* eslint-disable no-unused-vars */
import { Box, Button, Grid, TextField } from "@mui/material";
import TaskComponent from "./TaskComponent";
import { useEffect, useState } from "react";
import agent from "../consumingApi/agent";
import React from "react";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import { addItem, setItems, deleteItem, updateItem } from "./todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { Todo } from "../models/Todo";
import { useAppDispatch, useAppSelector } from "../store/configureStore";



export default function TextInput() {
  

  const [TodoItems, setTodoItems] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');

    useEffect(() => {
      agent.TODO.getAll()
        .then((TodoItems) => setTodoItems(TodoItems))
        .catch((error) => console.log(error))
        
    },[]);

    function handleInputChange(event: any) {
      setInput(event.target.value);
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
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={5}>
        <Button
          style={customButtonStyle}
          variant="contained"
          color="success"
          size="large"
        >
          <LibraryAddOutlinedIcon></LibraryAddOutlinedIcon>
        </Button>
      </Grid>
      <Grid item xs={5}>
        <TaskComponent TodoItems={TodoItems} />
      </Grid>
    </Grid>
  );
}
