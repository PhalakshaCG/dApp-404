import React, { useContext } from "react"
import { AuthContext } from "./context/AuthContext"
import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"

export default function App() {
  const { isLoggedIn } = useContext(AuthContext)
  if (isLoggedIn()) {
    return (
      <div className="min-h-[100vh] px-[8vw] py-[3vh] bg-[#434955] text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    )
  }
  else {
    return (
      <div className="min-h-[100vh] px-[8vw] py-[3vh] bg-[#434955] text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    )
  }
}