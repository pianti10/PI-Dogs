import React from "react";
import "./navBar.css";
import { Searchbar } from "./searchBar/SearchBar";
import {
  //filterByApiBreeds,
  filterCreated,
  orderByWeight,
  orderDogsAlf,
  filterByTemp,
  getTemperaments
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const NavBar = () => {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getTemperaments())
  }, [dispatch]);

  // const handleFilterBreeds = (filtro) => {
  //   dispatch(filterCreated(filtro));
  // };

  const handleFilterCreated = (filtro) => {
    dispatch(filterCreated(filtro));
  };

  const handleFilterWeight = (filtro) => {
    dispatch(orderByWeight(filtro));
  };

  const handleFilterAlf = (filtro) => {
    dispatch(orderDogsAlf(filtro));
  };

  const handleFilterByTemperaments = (filtro) => {
    dispatch(filterByTemp(filtro));
  };

  return (
    <div className="navBar">
      <div className="logo"></div>
      <Searchbar />
      <select
        onChange={(e) => {
          handleFilterByTemperaments(e.target.value);
        }}
        name="temperamentos"
        id="temperaments"
      >
        <option key={"AllTemperaments"} value={"AllTemperaments"}>
          All
        </option>
        {allTemperaments &&
          allTemperaments.map((temperament) => {
            return (
              <option key={temperament} value={temperament}>{temperament}</option>
            );
          })}
      </select>

      <select
        onChange={(e) => {
          handleFilterCreated(e.target.value);
        }}
        name=""
        id=""
      >
        <option value="All">Any race</option>
        <option value="Api">Api races</option>
        <option value="Created">Created races</option>
      </select>

      <select
        onChange={(e) => {
          handleFilterWeight(e.target.value);
        }}
        name=""
        id=""
      >
        {
          <option hidden={true} value="All">
            Any weight
          </option>
        }
        <option value="Asc">Ascendent</option>
        <option value="Desc">Descendent</option>
      </select>

      <select
        onChange={(e) => {
          handleFilterAlf(e.target.value);
        }}
        name=""
        id=""
      >
        <option hidden={true} value="All">
          Alphabetical
        </option>
        <option value="alf">A - Z</option>
        <option value="pop">Z - A</option>
      </select>
    </div>
  );
};

export default NavBar;
