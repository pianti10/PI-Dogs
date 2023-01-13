import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, getDogsQuery } from "../../../redux/actions";
import "../searchBar/searchBar.css";

export const Searchbar = () => {
  const [name, setName] = useState("");
  const allDogs = useSelector((state) => state.dogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  const handleChange =(name) => {
    setName(name);
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
