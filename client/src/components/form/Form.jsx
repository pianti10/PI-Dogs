import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, getTemperaments, postDogs } from "../../redux/actions";
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
      alert("Complete correctly the form before sending it");
    }
  };


  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <div className="formData">
          <label className="formLabel">Name</label>
          <input
            key={"name"}
            className="inputFrom"
            name="name"
            placeholder="At least three letters"
            value={breed.name}
            onChange={handleChange}
          ></input>
         

          <label className="formLabel">Height min</label>
          <input
            key={"height_min"}
            className="inputFrom"
            name="height_min"
            type="number"
            placeholder="Greater than 10"
            value={breed.height_min}
            onChange={handleChange}
          ></input>
         

          <label className="formLabel">Height max</label>
          <input
            key={"height_max"}
            className="inputFrom"
            name="height_max"
            type="number"
            placeholder="Less than 120"
            value={breed.height_max}
            onChange={handleChange}
          ></input>
         

          <label className="formLabel">Weight min</label>
          <input
            key={"weight_min"}
            className="inputFrom"
            name="weight_min"
            type="number"
            placeholder={"Greater than 0"}
            value={breed.weight_min}
            onChange={handleChange}
          ></input>
         

          <label className="formLabel">Weight max</label>
          <input
            key={"weight_max"}
            className="inputFrom"
            name="weight_max"
            type="number"
            placeholder={"Less than 95"}
            value={breed.weight_max}
            onChange={handleChange}
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
          >
            <option value="empty">...</option>
            {allTemperaments.map((e) => (
              <option key={e} value={e} onClick={handleMultiple}>
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
