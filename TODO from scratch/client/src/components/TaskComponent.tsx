/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Badge,
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
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditIcon from "@mui/icons-material/Edit";
import MailIcon from "@mui/icons-material/Mail";
import agent from "../consumingApi/agent";

interface Props {
  todoItems: Todo[];
  updateTodoItems: (newTodoItems: Todo[]) => void;
}

export default function TaskComponent({ todoItems, updateTodoItems }: Props) {
  const handleDelete = async (id: number) => {
    try {
      await agent.TODO.deleteItem(id);

      const updatedTodoItems = todoItems.filter((item) => item.id !== id);
      updateTodoItems(updatedTodoItems);
    } catch (error) {
      console.error("Erro deleting item:", error);
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      {todoItems.map((item) => (
        <Grid item xs={12} key={item.id}>
          <Stack spacing={3}>
            <ListItem key={item.id}>
              <Badge badgeContent={item.id} color="primary" sx={{ mr: 3 }}>
                <MailIcon color="action" />
              </Badge>

              <Typography variant="h6">{item.text}</Typography>

              <Button
                color="error"
                variant="contained"
                sx={{ ml: 19 }}
                onClick={() => handleDelete(item.id)}
              >
                <DeleteForeverOutlinedIcon />
              </Button>

              <Button variant="contained">
                <EditIcon />
              </Button>
            </ListItem>
          </Stack>

          <Divider />
        </Grid>
      ))}
    </Card>
  );
}
