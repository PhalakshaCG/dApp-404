import React from "react";
import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";

function Navbar() {
  const normalStyle = "hover:underline ";
  const activeStyle = "text-[#E63A0B]";
  return (
    <div className="flex items-center gap-20 pt-[0.5vh] mb-[4rem]">
      <div className="flex items-center gap-3">
        <img className="w-10" src={logo} alt="" />
        <span className="text-xl  ">CheckMate</span>
      </div>
      <div className="flex text-xl gap-8">
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
      </div>
    </div>
  );
}

export default Navbar;
