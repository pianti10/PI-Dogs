import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDogs } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import "./form.css";

export const Form = () => {
  const [breed, setBreed] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span: "",
    image: "",
    temperaments: []
  });

  const [nameVerification, setNameVerification] = useState(false);
  const [minHeightVerification, setMinHeightVerification] = useState(false);
  const [maxHeightVerification, setMaxHeightVerification] = useState(false);
  const [minWeightVerification, setMinWeightVerification] = useState(false);
  const [maxWeightVerification, setMaxWeightVerification] = useState(false);
  
  const allTemperaments = useSelector((state) => state.temperaments)
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getTemperaments())
  }, [dispatch]);
 

  const handleChange = (e) => {
    setBreed({
      ...breed,
      [e.target.name]: e.target.value,
    });
  };


  const handleMultiple = (e) => {
    e.preventDefault();
    setBreed((state) => {
      if (state.temperaments.includes(e.target.value) === false) {
        return {
          ...state,
          temperaments: [...state.temperaments, e.target.value],
        };
      } else {
        return {
          ...state,
          temperaments: [...state.temperaments],
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      breed.name.length > 2 &&
      breed.weight_min > 0 &&
      breed.weight_max < 95 &&
      breed.height_min > 10 &&
      breed.height_max < 120
      
    ) {
      dispatch(postDogs(breed));
      alert("Breed has been created");

      setBreed({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span: "",
        image: "",
        temperaments: []
      });
      history.push("/home");
    } else {
      alert("Complete the form correctly before sending it");
    }
  };

  const inputNameVerification = (e) => {
    e.target.value.length < 3 ? setNameVerification(true) : setNameVerification(false) ;
  }

  const inputMinHeightVerification = (e) => {
    Number(e.target.value) <= 10 ? setMinHeightVerification(true) : setMinHeightVerification(false) ;
  }

  const inputMaxHeightVerification = (e) => {
    Number(e.target.value) > 119 ? setMaxHeightVerification(true) : setMaxHeightVerification(false) ;
  }

  const inputMinWeightVerification = (e) => {
    Number(e.target.value) <= 0 ? setMinWeightVerification(true) : setMinWeightVerification(false) ;
  }

  const inputMaxWeightVerification = (e) => {
    Number(e.target.value) >= 95 ? setMaxWeightVerification(true) : setMaxWeightVerification(false) ;
  }
  
  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <div className="formData">
          <label className="formLabel">Name</label>
          {nameVerification === true && (<h3 className="errorText">Name must be at least 3 characters long</h3>)}
          <input
            key={"name"}
            className="inputFrom"
            name="name"
            placeholder="At least three letters"
            value={breed.name}
            onChange={handleChange}
            onKeyUp={inputNameVerification}
            maxLength = {20}
          ></input>
         
          <label className="formLabel">Height min</label>
          {minHeightVerification === true && (<h3 className="errorText">The minimum must be greater then 10</h3>)}
          <input
            key={"height_min"}
            className="inputFrom"
            name="height_min"
            type="number"
            placeholder="Greater than 10"
            value={breed.height_min}
            onChange={handleChange}
            onKeyUp={inputMinHeightVerification}
          ></input>
         

          <label className="formLabel">Height max</label>
          {maxHeightVerification === true && (<h3 className="errorText">The Maximum must be less then 120</h3>)}
          <input
            key={"height_max"}
            className="inputFrom"
            name="height_max"
            type="number"
            placeholder="Less than 120"
            value={breed.height_max}
            onChange={handleChange}
            onKeyUp={inputMaxHeightVerification}
          ></input>
         

          <label className="formLabel">Weight min</label>
          {minWeightVerification === true && (<h3 className="errorText">The Minimum must be greater then 0</h3>)}
          <input
            key={"weight_min"}
            className="inputFrom"
            name="weight_min"
            type="number"
            placeholder={"Greater than 0"}
            value={breed.weight_min}
            onChange={handleChange}
            onKeyUp={inputMinWeightVerification}
          ></input>
         

          <label className="formLabel">Weight max</label>
          {maxWeightVerification === true && (<h3 className="errorText">The Maximum must be less then 95</h3>)}
          <input
            key={"weight_max"}
            className="inputFrom"
            name="weight_max"
            type="number"
            placeholder={"Less than 95"}
            value={breed.weight_max}
            onChange={handleChange}
            onKeyUp={inputMaxWeightVerification}
          ></input>
         

          <label className="formLabel">Life Span</label>
          <input
            key={"life_span"}
            className="inputFrom"
            name="life_span"
            value={breed.life_span}
            onChange={handleChange}
          ></input>

          <label className="formLabel">Image</label>
          <input
            key={"image"}
            className="inputFrom"
            name="image"
            value={breed.image}
            onChange={handleChange}
          ></input>

          <label className="formLabel">Temperaments</label>
          <select
            key={"temperaments"}
            className="inputSelect"
            name="temperaments"
            value={breed.temperaments}
            onChange={handleMultiple}
            multiple
          >
            <option value="empty">...</option>
            {allTemperaments.map((e) => (
              <option key={e} value={e} onClick={handleMultiple}>
                {e}
              </option>
            ))}
          </select>
          <button className="submitButton" type="submit">CREATE</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
