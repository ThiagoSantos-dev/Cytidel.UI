import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import AuthService from "../hooks/AuthService";

//base path to access endpoint create task
const CREATE_TASK_URL = "/create-task";
function CreateTask() {
  //initiate navigation
  const navigate = useNavigate();
  //check if the user had been authenticated
  const token = AuthService.getToken();
  if (!token) {
    //navigate the user to the login page present unauthorised user
    navigate("/");
  }
  //payload to create a task
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "low",
    dueTime: "",
    status: "pending",
  });

  //handle any changes on the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  //send request to the api to CREATE TASK
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(CREATE_TASK_URL, task)
      .then((response) => {
        //navigate the user to the list of tasks
        navigate("/tasks");
      })
      .catch((error) => {
        //notify user if some error has occured
        alert("Failed to create task");
      });
  };

  return (
    <>
      <Navbar />
      <div>
        <br />
        <h2>Create Task</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                placeholder="Enter Title"
                value={task.title}
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <br />
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                name="description"
                placeholder="Enter Description"
                value={task.description}
                onChange={handleChange}
              />
            </div>
            <br />
            <br />
            <div className="form-group">
              <label>Priority:</label>
              <select
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
            <br />
            <div className="form-group">
              <label>Due Date:</label>
              <input
                type="datetime-local"
                name="dueTime"
                value={task.dueTime}
                onChange={handleChange}
              />
            </div>
            <br />
            <br />
            <div className="form-group">
              <label>Status:</label>
              <select name="status" value={task.status} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <button type="submit">Create Task</button>
        </form>
      </div>
    </>
  );
}

export default CreateTask;
