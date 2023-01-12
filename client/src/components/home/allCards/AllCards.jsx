import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../home/card/Card";
import { getAllDogs, getTemperaments } from "../../../redux/actions";
import { Link } from "react-router-dom";
import "./allCards.css";
import { Pages } from "../pages/Pages";


export default function AllCards() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // useEffect(() => {
  //   dispatch(getAllDogs());
  //   dispatch(getTemperaments);
  // }, [dispatch]);


  return (
    <>
      <Pages
        DogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginado={paginado}
      />
      <div className="cardList ">
        {allDogs.length > 0 ? (
          currentDogs.map((e) => (
            <Link Key={e.id} to={`/dogs/${e.id}`}>
              <Card
                id={e.id}
                name={e.name}
                imageDog={e.image}
                temperament={e.temperament}
                minWeight={e.weight_min}
                maxWeight={e.weight_max}
              />
            </Link>
          ))
        ) : (
          <h2>No hay nada</h2>
        )}
      </div>
    </>
  );
}
