import React from "react";
import "./optionSelect.css";

export const OptionSelect = ({ name }) => {
  if (name === "Temperament") {
    return (
      <select>
        <option value={"All"}>{name}</option>
      </select>
    );
  } else {
    return (
      <select>
        <option value={"All"}>{"All"}</option>
        <option value={"South America"}>{"South America"}</option>
        <option value={"North America"}>North America</option>
        <option value={"Africa"}>Africa</option>
        <option value={"Asia"}>Asia</option>
        <option value={"Europe"}>Europe</option>
        <option value={"Oceania"}>Oceania</option>
        <option value={"Antarctica"}>Antarctica</option>
      </select>
    );
  }
};