import React from "react";
import "./navBar.css";
import { Searchbar } from "./searchBar/SearchBar";

export const NavBar = () => {
  return (
    <div className="navBar">
        <div className="logo"></div>
        <Searchbar/>
        
    </div>
  );
};

export default NavBar;