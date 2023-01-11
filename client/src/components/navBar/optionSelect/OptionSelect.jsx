import "./optionSelect.css";
import { getTemperaments } from "../../../redux/actions";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const OptionSelect = () => {

  // const [temperament, SetTemperament] = useState("");
  const allDogs = useSelector((state) => state.dogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleChange = (e) => {
    dispatch(getTemperaments(e));
  }
};