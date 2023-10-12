import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate, useParams, useRoutes } from "react-router-dom";
import Navbar from "./Navbar";
import AuthService from "../hooks/AuthService";
//base path to access endpoint get task details
const GET_TASK_URL = "/get-task";
//base path to access endpoint edit task
const UPDATE_TASK = "/edit-task";
//base path to access endpoint delete task
const DELETE_TASK = "/delete-task/";
function TaskDetail() {
  //initiate navigation
  const navigate = useNavigate();
  //check if the user had been authenticated
  const token = AuthService.getToken();
  if (!token) {
    //navigate the user to the login page present unauthorised user
    navigate("/");
  }
  //receiving the task id
  const { id } = useParams();
  //task details payload
  const [task, setTask] = useState(null);
  //load task details
  useEffect(() => {
    axios
      .get(`${GET_TASK_URL}/${id}`)
      .then((response) => {
        //set the task details payload
        setTask(response.data);
      })
      .catch((error) => {
        console.error("Error fetching task:", error);
      });
  }, [id]);
  //handle any changes on the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };
  //send request to the api to UPDATE TASK
  const handleTaskUpdate = (e) => {
    e.preventDefault();

    axios
      .put(UPDATE_TASK, task)
      .then((response) => {
        //notify user task had been updated
        alert("Task Updated");
        //navigate the user to the list of tasks
        navigate("/tasks");
      })
      .catch((error) => {
        //notify user if some error has occured
        alert("Failed to edit task");
      });
  };
  //send request to the api to DELETE TASK
  const handleTaskDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`${DELETE_TASK}${id}`)
      .then((response) => {
        console.log("Task deleted:", response.data);
        //Navigate user to tasks list
        navigate("/tasks");
      })
      .catch((error) => {
        //notify user if some error has occured
        alert("Failed to delete task");
      });
  };
  return (
    <>
      <Navbar />
      <div>
        <h1>Task Detail</h1>
        {task ? (
          <form onSubmit={handleTaskUpdate}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div>
              <label>Description:</label>
              <textarea
                type="text"
                name="description"
                value={task.description}
                onChange={handleChange}
              />
            </div>
            <br />
            <div>
              <label>Priority:</label>
              <select
                type="text"
                name="priority"
                value={task.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <br />
            <div>
              <label>Due Date:</label>
              <input
                type="datetime-local"
                name="dueTime"
                value={task.dueDate}
                onChange={handleChange}
              />
            </div>
            <br />
            <div>
              <label>Status:</label>
              <select name="status" value={task.status} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <button type="submit">Update</button>
            <button onClick={handleTaskDelete}>Delete</button>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default TaskDetail;
