import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllDogs, getDogsQuery } from "../../../redux/actions";
import "../searchBar/searchBar.css";

export const Searchbar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  const handleChange =(name) => {
    dispatch(getDogsQuery(name));
  
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search your dog..."
        onChange={(name) => {
          handleChange(name.target.value);
        }}
      />
    </>
  );
};
