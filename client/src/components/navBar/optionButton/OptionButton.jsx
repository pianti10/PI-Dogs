import React from "react";
import './optionButton.css'

export const OptionButton = ({ name }) => {
  if (name === "weight") {
    return <div className ="weight"/>;
  } else {
    return <div className ="alphabetical"/>;
  }
};
