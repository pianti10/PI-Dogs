import {
    ERROR,
    GET_ALL_DOGS,
    ORDER_DOGS_ALF,
    GET_DOGS_BY_NAME,
    FILTER_BY_TEMPERAMENTS,
    GET_DOG_ID,
    GET_DOGS_BY_QUERY,
    ORDER_DOGS_POP,
    FILTER_BY_BREED
  } from "./actions";

  const initialState = {
    dogs: [],
    allDogs: [],
    allTemperaments: [],
    temperaments: [],
    detail: [],
    error: []
  };

  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_ALL_DOGS:
        return {
          ...state,
          dogs: action.payload,
          allDogs: action.payload,
        };
      case ERROR:
        return {
          ...state,
          error: action.payload,
        };
  
      case GET_DOGS_BY_NAME:
        let nombre =
          action.payload === ""
            ? state.allDogs
            : state.dogs.filter((e) =>
                e.name.toLowerCase().includes(action.payload.toLowerCase())
              );
  
        return {
          ...state,
          dogs: nombre,
        };
  
      case GET_DOG_ID:
        return {
          ...state,
          detail: action.payload,
        };
  
      case GET_DOGS_BY_QUERY:
        return {
          ...state,
          dogs: action.payload,
        };
  
      case FILTER_BY_BREED:
        const allDogs = state.allDogs;
        const breedFiltered =
          action.payload === "All"
            ? allDogs
            : allDogs.filter((e) => e.breed === action.payload);
        return {
          ...state,
          countries: breedFiltered,
        };
  
      case ORDER_DOGS_ALF:
        let sortedAlf =
          action.payload === "asc"
            ? state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                  return 1;
                }
                if (b.name > a.name) {
                  return -1;
                }
                return 0;
              })
            : state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                  return -1;
                }
                if (b.name > a.name) {
                  return 1;
                }
                return 0;
              });
        return {
          ...state,
          dogs: sortedAlf,
        };
  
        case ORDER_DOGS_POP:
            let sortedPop =
          action.payload === "asc"
            ? state.dogs.sort(function (a, b) {
                if (a.name < b.name) {
                  return 1;
                }
                if (b.name < a.name) {
                  return -1;
                }
                return 0;
              })
            : state.dogs.sort(function (a, b) {
                if (a.name < b.name) {
                  return -1;
                }
                if (b.name < a.name) {
                  return 1;
                }
                return 0;
              });
        return {
          ...state,
          dogs: sortedPop,
        };
            
  
      case FILTER_BY_TEMPERAMENTS:
        let array = [];
        const allDogs2 = state.allDogs;
        const solo = allDogs2.filter((pais) => {
          return pais.Temperaments.length > 0;
        });
  
        for (let i = 0; i < solo.length; i++) {
          for (let j = 0; j < solo[i].Temperaments.length; j++) {
            if (solo[i].Temperaments[j].name === action.payload) {
              array.push(solo[i]);
            }
          }
        }
  
        const filtro = action.payload === "Todos" ? allDogs2 : array;
  
        return {
          ...state,
          dogs: filtro,
        };
  
      default:
        return { ...state };
    }
  }
  
  export default rootReducer;