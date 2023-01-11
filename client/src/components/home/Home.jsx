import React from "react";
import { NavBar } from "../navBar/NavBar";
import { CreateBreedsButton } from "./CreateBreedsButton/CreateBreedsButton";
import AllCards from "../home/allCards/AllCards";
import "./home.css";
import Detail from "../detail/Detail";

export const Home = () => {
  return (
    <div>
      <NavBar />
      <AllCards />
      <CreateBreedsButton />
      <Detail/>
    </div>
  );
};

export default Home;
