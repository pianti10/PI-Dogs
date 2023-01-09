import React from "react";
import "./card.css";

export const Card = ({name, imageDog, temperament}) => {
  return (
    <div className="card">
      <div className="imageContainer">
        <img src={imageDog} alt="dog" className="dogImage"/>
      </div>
      <div className="textContainer">
        <h2 className="texts">{name}</h2>
        <h3 className="texts">{temperament}</h3>
      </div>
    </div>
  );
};

export default Card;
