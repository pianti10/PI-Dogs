import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, postDogs } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import "./form.css";
const axios = require("axios");

export const Form = () => {
  const [breed, setBreed] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    lifeSpan: "",
    temperaments: [],
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const allDogs = useSelector((state) => state.dogs);
  const [errorButton, setErrorButton] = useState(
    Object.keys(errorsForm).length < 1 ? false : true
  );
  const [errorsForm, setErrorsForm] = useState({});

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  const handleChange = (e) => {
    setBreed({
      ...breed,
      [e.target.name]: e.target.value,
    });
    setErrorsForm(validate(breed));
  };

  const handleTemperaments = (e) => {
    setBreed({
      ...breed,
      temperaments: [...new Set([breed.temperaments, e.target.value])],
    });
  };

  //   const handleMultiple = (e) => {
  //     console.log("temperamento que elegi " + e.target.value);
  //     e.preventDefault();
  //     setBreed((state) => {
  //       console.log(state.dogs);

  //       if (state.dogs.includes(e.target.value) === false) {
  //         return {
  //           ...state,
  //           dogs: [...state.dogs, e.target.value],
  //         };
  //       } else {
  //         return {
  //           ...state,
  //           dogs: [...state.dogs],
  //         };
  //       }
  //     });
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorsForm(validate(breed));
    await axios.post("http://localhost:3001/dogs", breed);
    console.log(breed);
    setBreed({
      name: "",
      heightMin: "",
      heightMax: "",
      weightMin: "",
      weightMax: "",
      lifeSpan: "",
      temperaments: [],
    });
    alert("Breed has been created");
  };

  const validate = (data) => {
    let errors = {};
    if (validateName(data.name)) errors.name = "There are error in the form";
    if (!data.heightMin) errors.heightMin = "There are error in the form";

    return errors;
  };

  const validateName = (str) => {
    if (typeof str !== "string") return true;
    if (str.length < 3) return true;
  };

  // useEffect()

  console.log("allDogs " + allDogs);
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              name="name"
              value={breed.name}
              onChange={handleChange}
            ></input>
            {errorsForm.name ? (
              <h4>
                <small>{errorsForm.name}</small>
              </h4>
            ) : (
              false
            )}

            <label>Height min</label>
            <input
              name="heightMin"
              value={breed.heightMin}
              onChange={handleChange}
            ></input>
            {errorsForm.name ? (
              <h4>
                <small>{errorsForm.name}</small>
              </h4>
            ) : (
              false
            )}

            <label>Height max</label>
            <input
              name="heightMax"
              value={breed.heightMax}
              onChange={handleChange}
            ></input>

            <label>Weight min</label>
            <input
              name="weightMin"
              value={breed.weightMin}
              onChange={handleChange}
            ></input>

            <label>Weight max</label>
            <input
              name="weightMax"
              value={breed.weightMax}
              onChange={handleChange}
            ></input>

            <label>Life Span</label>
            <input
              name="lifeSpan"
              value={breed.lifeSpan}
              onChange={handleChange}
            ></input>

            <label>Temperaments</label>
            <select
              name="temperaments"
              value={breed.temperaments}
              onChange={handleChange}
            >
              {/* <option value="empty">...</option>
              {breed.map((e) => (
                <option
                  value={e.temperaments}
                  key={e.temperaments}
                  onClick={handleMultiple}
                ></option>
              ))} */}
            </select>
            <button type="submit" disabled={errorButton ? true : false}>
              CREATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
