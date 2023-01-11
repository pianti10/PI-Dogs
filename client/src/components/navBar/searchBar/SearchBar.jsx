import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, getDogsByName } from "../../../redux/actions";
import "../searchBar/searchBar.css";

export const Searchbar = (setCurrentPage) => {
  const [name, setName] = useState("");
  const allDogs = useSelector((state) => state.dogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  const handleChange =(e) => {
    console.log("hola", e)
    dispatch(getDogsByName(e));
    // setCurrentPage(1);
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search your dog..."
        onChange={(e) => {
          setName(e.target.value);
          handleChange(e.target.value);
        }}
      />
    </>
  );
};
