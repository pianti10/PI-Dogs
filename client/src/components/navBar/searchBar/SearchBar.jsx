import React from "react";
import { OptionButton } from "../optionButton/OptionButton";
import { OptionSelect } from "../optionSelect/OptionSelect";
import "../searchBar/searchBar.css";

export const Searchbar = () => {
  return (
    <>
      <input type="text" placeholder="Search your dog..." />
      <OptionSelect name = "Activity" />
      <OptionSelect name = "Continent" />
      <OptionButton name = "population"/>
      <OptionButton name = "alphabetical"/>
    </>
  );
};