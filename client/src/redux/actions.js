import axios from "axios";

export const ERROR = "ERROR";
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const ORDER_DOGS_ALF = "ORDER_DOGS_ALF";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME";
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
export const GET_DOG_ID = "GET_DOG_ID";
export const GET_DOGS_BY_QUERY = "GET_DOGS_BY_QUERY";
export const ORDER_DOGS_POP = "ORDER_DOGS_POP";
export const FILTER_BY_BREED = "FILTER_BY_BREED";


export const getAllDogs = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`http://localhost:3001/dogs`);
      dispatch({
        type: GET_ALL_DOGS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
};

export function getDogId(id) {
  return async (dispatch) => {
    try {
      let json = await axios.get(`http://localhost:3001/dogs/${id}`);
      dispatch({
        type: GET_DOG_ID,
        payload: json.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
}
export function getDogsByName(name) {
  return {
    type: GET_DOGS_BY_NAME,
    payload: name,
  };
}

export function getDogsQuery(name) {
  return async (dispatch) => {
    try {
      let json = await axios.get(
        `http://localhost:3001/dogs?name=${name}`
      );
      dispatch({
        type: GET_DOGS_BY_QUERY,
        payload: json.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
}

export function filterByBreeds(payload) {
  return {
    type: FILTER_BY_BREED,
    payload,
  };
}

export function filterByTemp(Temperament) {
  return {
    type: FILTER_BY_TEMPERAMENTS,
    payload: Temperament,
  };
}

export const orderByName = (payload) => {
  return {
    type: ORDER_DOGS_ALF,
    payload,
  };
};

export function orderByPop(payload) {
  return {
    type: ORDER_DOGS_POP,
    payload,
  };
}

export const getTemperaments =() => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`http://localhost:3001/temperaments`);
      return {
        type: GET_TEMPERAMENTS,
        payload: response.data,
      };
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error,
      });
    }
  };
}

export const postDogs = (payload) => {
  return async () => {
    try {
      let json = await axios.post(`http://localhost:3001/dogs`, payload);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
}
