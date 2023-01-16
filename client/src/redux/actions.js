import axios from "axios";

export const ERROR = "ERROR";
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG_ID = "GET_DOG_ID";
export const DELETE_DOG_ID = "DELETE_DOG_ID";
export const GET_DOGS_BY_QUERY = "GET_DOGS_BY_QUERY";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const POST_DOGS = "POST_DOGS";
//export const FILTER_BY_API_BREED = "FILTER_BY_BREED";
export const FILTER_CREATED = "FILTER_CREATED";
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
export const ORDER_DOGS_ALF = "ORDER_DOGS_ALF";
export const ORDER_DOGS_BY_WEIGHT = "ORDER_DOGS_BY_WEIGHT";

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

export const getTemperaments = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`http://localhost:3001/temperaments`);
      let tempArray = response.data.map((objeto) => objeto.name);
      dispatch({
        type: GET_TEMPERAMENTS,
        payload: tempArray,
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

export function deleteDog(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: DELETE_DOG_ID,
        payload: id,
      });
    } catch (error) {
      alert("no se pudo borrar el perro");
    }
  };
}

export function getDogsQuery(name) {
  return async (dispatch) => {
    try {
      let json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
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

export const postDogs = (payload) => {
  return async () => {
    try {
      let json = await axios.post(`http://localhost:3001/dogs`, payload);
      return json;
    } catch (error) {
      console.log(error);
    }
  };
};

// export function filterByApiBreeds(payload) {
//   return {
//     type: FILTER_BY_API_BREED,
//     payload
//   };
// }

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export function filterByTemp(payload) {
  return {
    type: FILTER_BY_TEMPERAMENTS,
    payload,
  };
}

export const orderDogsAlf = (payload) => {
  return {
    type: ORDER_DOGS_ALF,
    payload,
  };
};

export function orderByWeight(payload) {
  return {
    type: "ORDER_DOGS_BY_WEIGHT",
    payload,
  };
}
