import {
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Stack,
  ListItem,
  Badge,
  ButtonGroup,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { Todo } from "../models/Todo";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditIcon from "@mui/icons-material/Edit";
import MailIcon from "@mui/icons-material/Mail";
import { useAppDispatch } from "../store/configureStore";
import { deleteItem, setItems, updateItem } from "./todoSlice";
import agent from "../consumingApi/agent";

interface Props {
  item: Todo;
}

export default function CardComponent({ item }: Props) {

  const dispatch = useAppDispatch();

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteItem(id));
  }

  const handeEditTodo = (id: number, text:string) => {
    dispatch(updateItem({id, text}));
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={3}>
        <ListItem>
          <MailIcon color="action" />
          <Typography>{item.id}</Typography>

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
          onClick={() => handeEditTodo(item.id, item.text)}
          >
            <EditIcon />
          </Button>


        </ListItem>
      </Stack>
    </Box>
  );
}
