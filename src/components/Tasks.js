import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import AuthService from "../hooks/AuthService";
import * as signalR from "@microsoft/signalr";
//base path to access endpoint get all tasks
const GET_TASKS_URL = "/get-tasks";
function Tasks() {
  //initiate navigation
  const navigate = useNavigate();
  //check if the user had been authenticated
  const token = AuthService.getToken();
  if (!token) {
    //navigate the user to the login page present unauthorised user
    navigate("/");
  }
  //connection signalR
  const [connection, setConnection] = useState(null);
  //payload list of tasks
  const [tasks, setTasks] = useState([]);
  //filter priority
  const [priorityFilter, setPriorityFilter] = useState("");
  //filter status
  const [statusFilter, setStatusFilter] = useState("");
  //Load the list of tasks
  useEffect(() => {
    axios
      .get(GET_TASKS_URL)
      .then((response) => {
        //set the list of tasks
        setTasks(response.data);
      })
      .catch((error) => {
        //notify user if some error has occured
        alert("Failed to retrieve tasks");
      });
  }, []);
  //open a connection with the server using SignalR
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7129/hub/tasks")
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Debug)
      .build();
    setConnection(newConnection);
  }, []);

  //on update of the tasks Create, Edit, and Delete the list going to updated.
  useEffect(() => {
    if (connection) {
      connection.start().catch((error) => console.error(error));

      connection.on("TasksHasUpdated", () => {
        axios
          .get(GET_TASKS_URL)
          .then((response) => {
            //empty the list
            setTasks([]);
            //reset the list of tasks
            setTasks(response.data);
          })
          .catch((error) => {
            //notify user if some error has occured
            alert("Failed to retrieve tasks");
          });
      });
    }
  }, [connection]);
  //handle any changes on the priority filter
  const handlePriorityFilterChange = (event) => {
    setPriorityFilter(event.target.value);
  };
  //handle any changes on the status filter
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  //Find the match between both filters
  const filteredTasks = tasks.filter((item) => {
    //check if there is filter for priority if has check match on priority
    const priorityMatch = priorityFilter
      ? item.priority.includes(priorityFilter)
      : item;
    //check if there is filter for status if has check match on status
    const statusMatch = statusFilter
      ? item.status.includes(statusFilter)
      : item;
    //return the filtering list
    return priorityMatch && statusMatch;
  });
  return (
    <>
      <Navbar />
      <div>
        <br />
        <h1>Tasks</h1>
        <br />
        <label>
          Priority:
          <select value={priorityFilter} onChange={handlePriorityFilterChange}>
            <option value="">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
        <label>
          Status:
          <select value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Complete</option>
            <option value="in_progress">Incomplete</option>
            <option value="archived">Archived</option>
          </select>
        </label>
        <br />
        <br />
        <br />
        <ul>
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <div className={task.priority}>
                <div className="row">
                  <div className="column-link">
                    <Link className="link-color" to={`/task/${task.id}`}>
                      <strong>{task.title}</strong>
                    </Link>
                  </div>

                  <div className="column-center">
                    <p>{task.description}</p>
                  </div>
                  <div className="column">
                    <p>{task.priority}</p>
                  </div>
                  <div className="column">
                    <p>{task.status}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Tasks;
