import React from "react";
import "./card.css";

export const Card = ({name, imageDog, temperament, minWeight, maxWeight}) => {
  
  return (
    <div className="card">
      <div className="imageContainer">
        <img src={imageDog} alt="dog" className="dogImage"/>
      </div>
      <div className="textContainer">
        <h2 className="texts">Name: <br/>{name}</h2>
        <h3 className="texts">Temperament: <br/>{temperament}</h3>
        <h3 className="texts"> Weight: <br/>From { minWeight } to { maxWeight }</h3>
      </div>
    </div>
  );
};

export default Card;
