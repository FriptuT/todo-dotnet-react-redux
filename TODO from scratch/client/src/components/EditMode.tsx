import { TextField, Button } from "@mui/material";
import React from "react";
import { useState } from "react";

interface EditModeProps {
  id: number;
  initialText: string;
  onSave: (id: number, text: string) => void;
  onCancel: () => void;
}

export default function EditMode({ id, initialText, onSave, onCancel }) {
  const [editedText, setEditedText] = useState(initialText);

  const handleSave = () => {
    onSave(id, editedText);
  };

  return (
    <>
      <TextField
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
      />
      <Button variant="contained" onClick={handleSave}>
        Save
      </Button>
      <Button variant="outlined" onClick={onCancel}>
        Cancel
      </Button>
    </>
  );
}
