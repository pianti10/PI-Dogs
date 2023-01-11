import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, postDogs, getTemperament } from "../../redux/actions";
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

  const allDogs = useSelector((state) => state.dogs);
  const dispatch = useDispatch();
  const history = useHistory();
  const allTemperament = [];

  //all dogs es un array que contiene el listado de temperamentos posibles del animal
  allDogs.map(function (dog) {
    let dogTemperament = "";
    if (dog.temperament) {
      dogTemperament = dog.temperament.split(",");
      dogTemperament.forEach((doggy) => {
        !allTemperament.includes(doggy) && allTemperament.push(doggy);
      });
    }
    return allTemperament;
  });

  const [errorsForm, setErrorsForm] = useState({});
  const [errorButton, setErrorButton] = useState(true);

  const handleChange = (e) => {
    setBreed({
      ...breed,
      [e.target.name]: e.target.value,
    });
  };


  const handleMultiple = (e) => {
    console.log(e.target)
    console.log("temperamento que elegi " + e.target.value);
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
      breed.name.length > 0 &&
      breed.weight_min > 0 &&
      breed.weight_max < 70
    ) {
      dispatch(postDogs(breed));
      console.log(breed)
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
      alert("Complete correctly the form before sending it");
    }
  };

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <div className="formData">
          <label className="formLabel">Name</label>
          <input
            key={"name"}
            className="inputFrom"
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

          <label className="formLabel">Height min</label>
          <input
            key={"height_min"}
            className="inputFrom"
            type="number"
            name="height_min"
            value={breed.height_min}
            onChange={handleChange}
          ></input>
         

          <label className="formLabel">Height max</label>
          <input
            key={"height_max"}
            className="inputFrom"
            name="height_max"
            type="number"
            value={breed.height_max}
            onChange={handleChange}
          ></input>
         

          <label className="formLabel">Weight min</label>
          <input
            key={"weight_min"}
            className="inputFrom"
            name="weight_min"
            type="number"
            placeholder={"greater than 0"}
            value={breed.weight_min}
            onChange={handleChange}
          ></input>
          {errorsForm.name ? (
            <h4>
              <small>{errorsForm.name}</small>
            </h4>
          ) : (
            false
          )}

          <label className="formLabel">Weight max</label>
          <input
            key={"weight_max"}
            className="inputFrom"
            name="weight_max"
            type="number"
            placeholder={"Less than 70"}
            value={breed.weight_max}
            onChange={handleChange}
          ></input>
          {errorsForm.name ? (
            <h4>
              <small>{errorsForm.name}</small>
            </h4>
          ) : (
            false
          )}

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
            onChange={handleMultiple}
          >
            <option value="empty">...</option>
            {allTemperament.map((e) => (
              <option value={e} onClick={handleMultiple}>
                {e}
              </option>
            ))}
          </select>
          <button type="submit">CREATE</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
