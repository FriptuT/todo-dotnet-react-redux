/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Button,
  Card,
  Divider,
  Grid,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Todo } from "../models/Todo";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditIcon from "@mui/icons-material/Edit";
import MailIcon from "@mui/icons-material/Mail";
import {
  deleteItem,
  setError,
  setItems,
  setLoading,
  updateItem,
} from "./todoSlice";
import agent from "../consumingApi/agent";
import EditMode from "./EditMode";

interface Props {
  TodoItems: Todo[];
}

export default function TaskComponent() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todo.todos);

  const [editMode, setEditMode] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));

        const todos = await agent.TODO.getAll();

        // console.log(todos);

        dispatch(setItems(todos));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteItem(id));
  };

  const handleEditTodo = (id: number, text: string) => {
    setEditMode(id);
    setEditedText(text);
  };

  const handleSaveEdit = (id: number, editedText: string) => {
    dispatch(updateItem({ id, text: editedText }));
    setEditMode(null);
    setEditedText("");
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedText("");
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      {todos.map((item) => (
        <Grid item xs={12} key={item.id}>
          <Stack spacing={3}>
            <ListItem key={item.id}>
              <MailIcon color="action" />
              <Typography>{item.id}</Typography>

              {editMode === item.id ? (
                <EditMode
                  id={item.id}
                  initialText={item.text}
                  onSave={(id, text) => handleSaveEdit(id, text)}
                  onCancel={() => handleCancelEdit()}
                />
              ) : (
                <>
                  <Typography>{item.text}</Typography>

                  <Button
                    color="error"
                    variant="contained"
                    sx={{ ml: 19 }}
                    onClick={() => handleDeleteTodo(item.id)}
                  >
                    <DeleteForeverOutlinedIcon />
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => handleEditTodo(item.id, item.text)}
                  >
                    <EditIcon />
                  </Button>
                </>
              )}
            </ListItem>
          </Stack>

          <Divider />
        </Grid>
      ))}
    </Card>
  );
}
