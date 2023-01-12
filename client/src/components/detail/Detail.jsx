import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogId } from "../../redux/actions";
import "./detail.css";
import { useParams } from "react-router-dom";

export const DetailDog = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const dogArr = useSelector((state) => state.detail);
  // const [estado, setEstado] = useState[0];

  useEffect(() => {
    dispatch(getDogId(id));
  }, [dispatch, id]);

  if (dogArr.length < 1) {
    return <div>"LOADING"</div>;
  }

  const myDog = dogArr[0];

  return (
    <div key={myDog.id} className="detailContainer">
      <div className="Detail">
        <div className="imageContainer">
          <img src={myDog.image} alt="dog" className="dogImage" />
        </div>
        <div className="textContainer">
          <h2 className="texts">{myDog.name}</h2>
          <h3 className="texts">
            {" "}
            Height: <br /> From {myDog.height_min} to {myDog.height_min}
          </h3>
          <h3 className="texts">
            {" "}
            Life Span: <br /> From {myDog.life_span} to {myDog.life_span}
          </h3>
          <div className="texts">
            <h3> Temperament: </h3>
            <p>
              {myDog.createdInDB
                ? myDog.temperaments.map((el) => el.name).join(", ")
                : myDog.temperament}
            </p>
          </div>
          <h3 className="texts">
            {" "}
            Weight: <br />
            From {myDog.weight_min} to {myDog.weight_max}
          </h3>
          <h3 className="texts"> </h3>
        </div>
      </div>
    </div>
  );
};

export default DetailDog;
