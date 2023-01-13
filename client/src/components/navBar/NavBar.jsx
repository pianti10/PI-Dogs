import React from "react";
import "./navBar.css";
import { Searchbar } from "./searchBar/SearchBar";
import { filterByBreeds,filterDogsByMAXWeight, FILTER_DOGS_BY_MIN_WEIGHT, getAllDogs } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";



export const NavBar = () => {
  const dispatch = useDispatch()
  const [orden, setOrden] = useState("")


  
  const handleFilterBreeds = (filtro) => {
    dispatch(filterByBreeds(filtro))
  }

  const handleFilterByMaxWeight = (filtro) => {
    dispatch(filterDogsByMAXWeight(filtro))
  }
  

  useEffect(() => {
    dispatch(getAllDogs());
}, [dispatch]);


  return (
    <div className="navBar">
        <div className="logo"></div>
        <Searchbar/>
        <select name="" id="">
        <option value="All">All temperaments</option>
          <option value=""></option>
        </select>

        <select onChange={(e) => {handleFilterBreeds(e.target.value)}} name="" id="">
          <option value="All">Any race</option>
          <option value="Created">Created races</option>
          <option value="Api">Api races</option>
        </select>

        <select name="" id="">
        <option onChange={(e) => {filterDogsByMAXWeight(e.target.value)}} value="All">Sort by weight</option>
          <option value="asc">Ascendent</option>
          <option value="dec">Descendent</option>
        </select>

        <select name="" id="">
          <option value="All">Alphabetical</option>
          <option value="alf">A - Z</option>
          <option value="pop">Z - A</option>
        </select>
    </div>
  );
};

export default NavBar;