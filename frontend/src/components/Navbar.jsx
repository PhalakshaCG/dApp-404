import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";

function Navbar() {
  const { login, logout, isLoggedIn } = useContext(AuthContext);
  const normalStyle = "hover:underline ";
  const activeStyle = "text-[#E63A0B]";
  return (
    <div className="flex justify-between items-center between pt-[0.5vh] mb-[4rem]">
      <div className="flex items-center gap-20 ">
        <div className="flex items-center gap-3">
          <img className="w-10" src={logo} alt="" />
          <span className="text-xl">CheckMate</span>
        </div>
        <nav className="flex text-xl gap-8">
          <NavLink
            className={({ isActive }) => {
              return isActive ? normalStyle + activeStyle : normalStyle;
            }}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => {
              return isActive ? normalStyle + activeStyle : normalStyle;
            }}
            to="/search"
          >
            Search
          </NavLink>
          <NavLink
            className={({ isActive }) => {
              return isActive ? normalStyle + activeStyle : normalStyle;
            }}
            to="/profile"
          >
            Profile
          </NavLink>
        </nav>
      </div>
      {!isLoggedIn() ? (
        <div
          className={normalStyle + activeStyle + " text-2xl cursor-pointer"}
          onClick={login}
        >
          Login
        </div>
      ) : (
        <div
          className={normalStyle + activeStyle + " text-2xl cursor-pointer"}
          onClick={logout}
        >
          Logout
        </div>
      )}
    </div>
  );
}

export default Navbar;
