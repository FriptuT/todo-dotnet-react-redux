/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import { useEffect, useState } from "react";
import agent from "../consumingApi/agent";
import React from "react";
import { Todo } from "../models/Todo";
import CardComponent from "./CardComponent";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useAppDispatch, useAppSelector } from "../store/configureStore";

interface Props {
  TodoItems: Todo[];
}

export default function TaskComponent({TodoItems}: Props) {



  return (
    <Card sx={{ minWidth: 275 }}>
      {TodoItems.map((item) => (
        <Grid item xs={12} key={item.id}>
          <CardComponent key={item.id} item={item} />
          <Divider />
          
        </Grid>
      ))}
    </Card>
  );
}
