import React from "react";
import "./navBar.css";
import { Searchbar } from "./searchBar/SearchBar";

export const NavBar = () => {
  return (
    <div className="navBar">
        <div className="logo"></div>
        <Searchbar/>
        <select name="" id="">
        <option value="none">All temperaments</option>
          <option value=""></option>
        </select>

        <select name="" id="">
          <option value="none">Any race</option>
          <option value="">Created races</option>
          <option value="">Api races</option>
        </select>

        <select name="" id="">
        <option value="none">Sort by weight</option>
          <option value="">Ascendent</option>
          <option value="">Descendent</option>
        </select>

        <select name="" id="">
          <option value="none">Alphabetical</option>
          <option value="">A - Z</option>
          <option value="">Z - A</option>
        </select>
    </div>
  );
};

export default NavBar;