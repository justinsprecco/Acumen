import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import ProjectEdit from "./pages/ProjectEdit";
import TaskEdit from "./pages/TaskEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/project/:id" element={<Tasks />} />
        <Route path="/project/edit" element={<ProjectEdit />} />
        <Route path="/project/edit/:id" element={<ProjectEdit />} />
        <Route path="/task/create/:projectId" element={<TaskEdit />} />
        <Route path="/task/edit/:id" element={<TaskEdit />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
