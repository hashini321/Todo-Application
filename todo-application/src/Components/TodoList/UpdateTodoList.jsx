import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Style for the modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backgroundColor: "#434646",
  color: "white",
};

const UpdateTodoList = ({ onUpdateTask, task }) => {
  const [open, setOpen] = useState(false);
  const [updateTaskValue, setUpdateTaskValue] = useState(task);// Set the task to the input field
  const [error, setError] = useState("");

  const handleOpen = () => {
    setOpen(true);
    setError("");
  };
// Update a task
  const handleUpdate = (e) => {
    e.preventDefault();
    if (task.trim() === "") {
      setError("Task cannot be empty.");
      return;
    }
    onUpdateTask(updateTaskValue); // Pass the task to the parent
    setUpdateTaskValue(""); // Clear the input field
    setOpen(false); // Close the modal
  };

  return (
    <>
      <EditIcon className="cursor-pointer " onClick={handleOpen} />
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-center pb-5"
          >
            Update Task
            <CloseIcon
              className="float-right cursor-pointer text-gray-400"
              onClick={() => setOpen(false)}
            />
          </Typography>
          <form onSubmit={handleUpdate}>
            <div className="space-y-4">
              <input
                type="text"
                required
                placeholder="Add Task"
                className="w-full bg-gray-800 text-white p-2 rounded"
                value={updateTaskValue}
                onChange={(e) => {
                  setUpdateTaskValue(e.target.value);
                  setError("");
                }}
              />
              {error && (
                <Typography color="error" variant="caption">
                  {error}
                </Typography>
              )}

              <Button
                variant="contained"
                type="submit"
                className=" text-white w-full font-bold py-2 px-4 rounded flex justify-center items-center"
              >
                Updated
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
      
    </>
  );
};

export default UpdateTodoList;
