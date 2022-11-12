import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const { login, logout, isLoggedIn, getUser } = useContext(AuthContext);

  const normalStyle = "hover:underline ";
  const activeStyle = "text-[#E63A0B]";
  const [user, setUser] = useState("");

  useEffect(() => {
    if (isLoggedIn()) {
      const user = getUser();
      setUser(user?.name);
    }
  }, [isLoggedIn, getUser]);

  return (
    <div className="flex justify-between items-center between pt-[0.5vh] mb-[4rem]">
      <div className="flex items-center gap-20 ">
        <div className="flex items-center gap-3">
          <img className="w-14" src={logo} alt="" />
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
        <div className="flex gap-5">
          <NavLink
            className={normalStyle + activeStyle + " text-2xl cursor-pointer"}
            to="/profile"
          >
            {user}
          </NavLink>
          <div
            className={normalStyle + activeStyle + " text-2xl cursor-pointer"}
            onClick={() => window.location.reload(false)}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
