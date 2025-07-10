// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex space-x-6">
        <Link to="/"       className="text-gray-600 hover:text-gray-800">Login</Link>
        <Link to="/register" className="text-gray-600 hover:text-gray-800">Register</Link>
        <Link to="/dashboard" className="text-gray-600 hover:text-gray-800">Dashboard</Link>
        <Link to="/topics/new" className="text-gray-600 hover:text-gray-800">Add New</Link>
      </div>
    </header>
  );
}
