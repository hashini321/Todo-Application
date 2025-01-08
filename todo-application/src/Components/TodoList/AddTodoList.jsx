import { Alert, Box, Button, Modal, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
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

const AddTodoList = ({ onValueChange }) => {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setError("");
  };
  // Add a new task
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (task.trim() === "") {
      setError("Task cannot be empty.");
      return;
    }
    onValueChange(task);// Pass the task to the parent
    setTask(""); // Clear the input field
    setOpen(false); // Close the modal
    setAlert(true); // Show success alert
    setTimeout(() => {
      setAlert(false);
    }, 300);  
  };
  return (
    <div>
        
      <div className="flex justify-start items-start mb-1">

      <Button
        variant="contained"
        className=" text-white font-bold py-2 px-4 rounded"
        onClick={handleOpen}
      >
        Add ToDo
        <AddIcon className="ml-2" />
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         {/* Modal content */}
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-center pb-5">
            Add Task
            <CloseIcon
              className="float-right cursor-pointer text-gray-400"
              onClick={() => setOpen(false)}/>
          </Typography>

        {/* Form to add a new task */}
          <form onSubmit={handleAddTodo}>
            <div className="space-y-4">
              <input
                required
                type="text"
                placeholder="Add Task"
                className="w-full bg-gray-800 text-white p-2 rounded"
                value={task}
                onChange={(e) => {
                  setTask(e.target.value);
                  setError(""); // Clear error while typing
                }}
              />
              {error && (
                <Typography color="error" variant="caption">
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                className=" text-white w-full font-bold py-2 px-4 rounded flex justify-center items-center"
              >
                Add Task
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
      </div>
       {/* Display Alert */}
      <div className="flex justify-center items-center">
         {/* Display Alert */}
            {alert && (
                <Stack sx={{ width: "100%", marginBottom: 2 }} spacing={2} className="mt-5">
                <Alert variant="filled" severity="success">
                    Task Added successfully!
                </Alert>
                </Stack>
            )}
      </div>
      
    </div>
   
  );
};

export default AddTodoList;
