import { React, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogId, getTemperaments } from "../../redux/actions";
import { Link } from "react-router-dom";
import "./detail.css";

export const Detail = ({
  name,
  imageDog,
  temperament,
  minWeight,
  maxWeight,
}) => {
  const dispatch = useDispatch();
  const dogId = useSelector((state) => state.dogId);

  useEffect(() => {
    dispatch(getDogId());
  }, [dispatch]);

  return (
    <div className="detailContainer">
      <div className="Detail">
        <div className="imageContainer">
          <img src={imageDog} alt="dog" className="dogImage" />
        </div>
        <div className="textContainer">
          <h2 className="texts">
            Name: <br />
            {name}
          </h2>
          <h3 className="texts">
            Temperament: <br />
            {temperament}
          </h3>
          <h3 className="texts">
            {" "}
            Weight: <br />
            From {minWeight} to {maxWeight}
          </h3>
          <h3 className="texts"> </h3>
        </div>
      </div>
    </div>
  );
};

export default Detail;
