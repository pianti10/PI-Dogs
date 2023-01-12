import React from "react";
import "./pages.css";

export const Pages = ({ DogsPerPage, allDogs, paginado }) => {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allDogs / DogsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav>
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className="number" Key={number}>
              <button className="botonPaginado" onClick={() => paginado(number)}>{number}</button>
            </li>
          ))}
      </ul>
    </nav>
  );
};
