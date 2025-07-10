import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // ❗ JSX'in dışına aldık

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TopicDetail from "./pages/TopicDetail";
import TopicCreate from "./pages/TopicCreate";

function App() {
  return (
    <Router>
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/topics/:id" element={<TopicDetail />} />
        <Route path="/topics/new" element={<TopicCreate />} />
      </Routes>
    </Router>
  );
}

export default App;
