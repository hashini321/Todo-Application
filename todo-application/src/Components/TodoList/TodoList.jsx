import React, { useEffect, useState } from "react";
import AddTodoList from "./AddTodoList";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateTodoList from "./UpdateTodoList";
import { Alert, Stack } from "@mui/material";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [alert, setAlert] = useState(false);
  const [updateAlert, setUpdateAlert] = useState(false);

  //Add a new task
  const addTodo = (task) => {
    let newTodoItem = {
      task: task,
      status: "To_Do",
    };

    let updatedTodos = [...todos];
    updatedTodos.push(newTodoItem);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  //Load the tasks from the local storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  //Change the status of the task
  const handleStatusChange = (index) => {
    const updatedTodos = todos.map((t, i) =>
      i === index
        ? { ...t, status: t.status === "To_Do" ? "Completed" : "To_Do" }
        : t
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  //Delete a task
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    // Display Alert
    setAlert(true); 
    setTimeout(() => {
      setAlert(false);
    }, 300);
  };

  //Update a task
  const updateTodoListArr = (index, updatedTask) => {
    const updatedTodos = todos.map((t, i) =>
      i === index ? { ...t, task: updatedTask } : t
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setUpdateAlert(true); 
    setTimeout(() => {
        setUpdateAlert(false);
    }, 300);
  };

  return (
    <div className="bg-gray-700 md:w-1/2 w-[350px] mx-10 sm-mx-5 p-4 rounded-lg shadow-lg text-white">
      <div>
        
        <AddTodoList onValueChange={addTodo} />
      </div>
      <div className="flex justify-center items-center mx-10">
         {/* Display Alert */}
            {alert && (
                <Stack sx={{ width: "100%", marginBottom: 2 }} spacing={2} className="mt-5">
                <Alert variant="filled" severity="error">
                    The Task Deleted !
                </Alert>
                </Stack>
            )}
      </div>
      <div className="flex justify-center items-center">
            {/* Display Alert */}
                {updateAlert && (
                    <Stack sx={{ width: "100%", marginBottom: 2 }} spacing={2} className="mt-5">
                    <Alert variant="filled" severity="success">
                        Updated Successfully !
                    </Alert>
                    </Stack>
                )}
        </div>
      <div className=" max-h-96 overflow-y-auto">
        {/* Display the tasks */}
        {todos.map((todo, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 my-2 rounded-lg flex justify-between items-center"
          > 
            <p>{todo.task}</p>
            <div className="flex space-x-3">
                {/* Display the status of the task */}
                <div>
                    <span
                        className={
                        todo.status === "To_Do" ? "text-white bg-emerald-500 p-2 rounded-md" : "text-white bg-green-700 p-2 rounded-md"}
                        onClick={() => handleStatusChange(index)}>{todo.status}
                    </span>
                </div>
                {/* Update the task */}
                <div>
                <UpdateTodoList
                onUpdateTask={(updatedTask) =>
                  updateTodoListArr(index, updatedTask)
                    }
                task={todo.task}/> 
              </div>
               {/* Delete the task */}
              <div><DeleteIcon
                className="cursor-pointer text-red-500"
                onClick={() => deleteTodo(index)}/>
                </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
