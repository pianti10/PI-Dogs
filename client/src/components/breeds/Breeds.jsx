import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, postDogs } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import "./breeds.css";

function validate(input) {
  let errors = {};
  let altMin = Number(input.heightMin);
  let altMax = Number(input.heightMax);
  let pesoMin = Number(input.weightMin);
  let pesoMax = Number(input.weightMax);

  if (!input.name) errors.name = "Required field";
  else if (/[^A-Za-z0-9 ]+/g.test(input.name))
    errors.name = "Name cannot have special characters or accents";

  if (!input.heightMin) errors.heightMin = "Required field";
  else if (altMin > 0) errors.heightMin = "Must be greater than zero";

  if (!input.heightMax) errors.heightMax = "Required field";
  else if (altMax > 0) errors.heightMax = "Must be greater than zero";

  if (!input.weightMin) errors.weightMin = "Required field";
  else if (pesoMin > 0) errors.weightMin = "Must be greater than zero";

  if (!input.weightMax) errors.weightMax = "Required field";
  else if (pesoMax > 0) errors.weightMax = "Must be greater than zero";

  if (!input.lifeSpan || input.lifeSpan === "empty")
    errors.lifeSpan = "Required field";

  if (!input.dogs || input.dogs.length === 0)
    errors.dogs = "Required field";

  return errors;
}

const Breeds = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const dogs = useSelector((state) => state.dogs);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  const handleMultiple = (e) => {
    e.preventDefault();
    setInput((estado) => {
      console.log(estado.dogs);

      //SI EL PERRO NO EXISTIA EN EL ARRAY LO GUARDA
      if (estado.dogs.includes(e.target.value) === false) {
        return {
          ...estado,
          dogs: [...estado.dogs, e.target.value],
        };
      } else {
        // EN CASO DE QUE EL PERRO YA ESTE EN LA LISTA NO LO GUARDA - ESTO LO HACE PARA QUE NO GUARDE PERROS REPETIDOS EN EL ARRAY
        return {
          ...estado,
          dogs: [...estado.dogs],
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      input.name.length > 0 &&
      input.heightMin.length > 0 &&
      input.heightMax.length > 0 &&
      input.weightMin.length > 0 &&
      input.weightMax.length > 0 &&
      input.lifeSpan.length > 0 &&
      input.dogs.length > 0
    ) {
      dispatch(postDogs(input));
      alert("Breed succesfully created!");

      setInput({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        lifeSpan: "",
        dogs: [],
      });
      history.push(`/home`);
    } else {
      alert("Complete correctly the form before sending it");
    }
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelect = (e) => {
    setInput((estado) => {
      return {
        ...estado,
        [e.target.name]: e.target.value,
      };
    });
  };

  //esto es para controlar el formulario
  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    lifeSpan: "",
    dogs: ""
  });

  return (
    <form className="form-tenmperament" onSubmit={handleSubmit}>
      <h2>Create your own breed</h2>

      <div className="form-div">
        <label className="label-form">Name: </label>
        <input
          className="form-input"
          type="text"
          placeholder="Ej: Skate"
          name="name"
          value={input.name}
          onChange={handleChange}
        />
      </div>
      <div className="multiple form-div">
        <label className="label-form">Choose a country: </label>
        <select
          className="form-select"
          name="countries"
          value={input.dogs}
          id="countries"
          placeholder="Ej: Burkina Faso"
          onChange={handleSelect}
        >
          <option value="empty">...</option>
          {dogs.map((e) => (
            <option value={e.id} key={e.id} onClick={handleMultiple}>
              {e.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-div">
        <label className="label-form">Season: </label>
        <select className="form-select" name="season" id="season">
          <option value="empty">...</option>
          <option value={"Verano"}>Summer </option>
          <option value={"Invierno"}>Winter </option>
          <option value={"Primavera"}>Spring </option>
          <option value={"Otoño"}>Autumn/Fall </option>
        </select>
      </div>
      <div className="form-div">
        <label className="label-form">Difficulty: </label>
        <input
          className="form-input"
          type="number"
          placeholder="Between 1 and 5"
          name="difficulty"
          value={input.difficulty}
        />
      </div>
      <div className="form-div">
        <label className="label-form">Duration: </label>
        <input
          className="form-input label-form"
          type="number"
          placeholder="Between 1 and 24"
          name="duration"
          value={input.duration}
        />
      </div>
      <div>
        <button
          className="form-button"
          type="submit"
          disabled={Object.keys(errors).length === 0 ? false : true}
        >
          Add Activity
        </button>
      </div>
    </form>
  );
};

export default Breeds;
