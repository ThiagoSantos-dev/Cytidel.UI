import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import Tasks from "./components/Tasks";
import TaskDetail from "./components/TaskDetail";
import CreateTask from "./components/CreateTask";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="tasks" element={<Tasks />} />
        <Route path="task/:id" element={<TaskDetail />} />
        <Route path="create" element={<CreateTask />} />
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
