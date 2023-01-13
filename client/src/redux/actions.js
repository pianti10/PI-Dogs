import axios from "axios";

export const ERROR = "ERROR";
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG_ID = "GET_DOG_ID";
export const DELETE_DOG_ID = "DELETE_DOG_ID"
export const GET_DOGS_BY_QUERY = "GET_DOGS_BY_QUERY";
export const FILTER_BY_BREED = "FILTER_BY_BREED";
export const FILTER_CREATED = "FILTER_CREATED"
export const FILTER_BY_TEMPERAMENTS = "FILTER_BY_TEMPERAMENTS";
export const ORDER_DOGS_ALF = "ORDER_DOGS_ALF";
export const ORDER_DOGS_POP = "ORDER_DOGS_POP";
// export const ORDER_DOGS_BY_WEIGHT = "ORDER_DOGS_BY_WEIGHT";
export const FILTER_DOGS_BY_MAX_WEIGHT = "FILTER_DOGS_BY_MAX_WEIGHT";
export const FILTER_DOGS_BY_MIN_WEIGHT = "FILTER_DOGS_BY_MIN_WEIGHT";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const POST_DOGS = "POST_DOGS";

export const getAllDogs = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(`http://localhost:3001/dogs`);
      dispatch({
        type: GET_ALL_DOGS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error
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
        payload: json.data
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error
      });
    }
  };
}

export function deleteDogId() {
  return async function (dispatch){
  return dispatch({
      type: 'DELETE_DETAILS'
  })
}
}

export function getDogsQuery(name) {
  return async (dispatch) => {
    try {
      let json = await axios.get(
        `http://localhost:3001/dogs?name=${name}`
      );
      dispatch({
        type: GET_DOGS_BY_QUERY,
        payload: json.data
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error
      });
    }
  };
}

export function filterByBreeds(payload) {
  return {
    type: FILTER_BY_BREED,
    payload
  };
}

export function filterCreated(payload) {
  return {
      type: 'FILTER_CREATED',
      payload
  }
}


export function filterByTemp(Temperaments) {
  return {
    type: FILTER_BY_TEMPERAMENTS,
    payload: Temperaments,
  };
}

export const orderDogsAlf = (payload) => {
  return {
    type: ORDER_DOGS_ALF,
    payload
  };
};

export function orderByPop(payload) {
  return {
    type: ORDER_DOGS_POP,
    payload
  };
}

// export function orderByWeight(payload) {
//   return {
//       type: 'ORDER_BY_WEIGHT',
//       payload
//   }
// }

export function filterDogsByMAXWeight(payload) {
  return {
      type: 'FILTER_BY_MAX_WEIGHT',
      payload
  }
}

export function filterDogsByMINWeight(payload) {
  return {
      type: 'FILTER_BY_MIN_WEIGHT',
      payload
  }
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
        payload: error
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
