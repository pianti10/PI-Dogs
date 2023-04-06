import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../home/card/Card";
import { getAllDogs } from "../../../redux/actions";
import { Link } from "react-router-dom";
import "./allCards.css";
import { Pages } from "../pages/Pages";

export default function AllCards() {
  const dispatch = useDispatch();
  let allDogs = useSelector((state) => state.dogs);
  const filteredDogs = useSelector((state) => state.filterDogs);
  filteredDogs.length > 0 && (allDogs = filteredDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  const handleBack = () => {
    currentPage > 1 && setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  if (allDogs.length > 0) {
    return (
      <>
        <button className="breedButton" onClick={handleBack}>
          Back
        </button>
        <button className="breedButton" onClick={handleNext}>
          Next
        </button>
        <Pages
          DogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
        <div className="cardList ">
          {allDogs.length > 0 ? (
            currentDogs.map((e) => (
              <Link key={e.id} to={`/dogs/${e.id}`}>
                <Card
                  id={e.id}
                  name={e.name}
                  imageDog={e.image}
                  temperament={e.temperament}
                  minWeight={e.weight_min}
                  maxWeight={e.weight_max}
                  origin={e.origin}
                />
              </Link>
            ))
          ) : (
            <div className="whiteBackground">
              <div className="loadingDog"></div>
            </div>
          )}
        </div>
      </>
    );
  } else {
    return (
      <div className="whiteBackground">
        <div className="loadingDog"></div>
      </div>
    );
  }
}
