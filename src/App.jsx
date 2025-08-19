import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Welcome from "./pages/Welcome.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Year from "./pages/Year.jsx"
import Navbar from "./components/Navbar.jsx"

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/year" element={<Year />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
