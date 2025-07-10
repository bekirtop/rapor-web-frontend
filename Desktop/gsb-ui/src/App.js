import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TopicDetail from "./pages/TopicDetail";
import TopicCreate from "./pages/TopicCreate";
import Navbar from "./components/Navbar";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/topics/new" element={<TopicCreate />} />
          <Route path="/topics/:id" element={<TopicDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
