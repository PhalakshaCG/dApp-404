import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Profile from "./pages/Profile"

export default function App() {
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