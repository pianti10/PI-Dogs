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

  const handleChange =(name) => {
    setName(name);
    dispatch(getDogsByName(name));
    // setCurrentPage(1);
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
