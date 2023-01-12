import {
  ERROR,
  GET_ALL_DOGS,
  GET_DOG_ID,
  DELETE_DOG_ID,
  GET_DOGS_BY_NAME,
  GET_DOGS_BY_QUERY,
  FILTER_BY_BREED,
  FILTER_BY_TEMPERAMENTS,
  ORDER_DOGS_ALF,
  ORDER_DOGS_POP,
  ORDER_DOGS_BY_WEIGHT,
  FILTER_DOGS_BY_MAX_WEIGHT,
  FILTER_DOGS_BY_MIN_WEIGHT,
  POST_DOGS,
} from "./actions";

const initialState = {
  dogs: [],
  allDogs: [],
  allTemperaments: [],
  temperaments: [],
  detail: [],
  error: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case GET_DOG_ID:
      return {
        ...state,
        detail: action.payload,
      };

    case DELETE_DOG_ID:
      return {
        ...state,
        details: [],
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

    case ORDER_DOGS_BY_WEIGHT:
      const sortedWeight =
        action.payload === "asc"
          ? [...state.dogs].sort(function (a, b) {
              if (a.weight_min === null) {
                return 0;
              }
              if (a.weight_min < b.weight_min) {
                return 1;
              }
              if (b.weight_min < a.weight_min) {
                return -1;
              }
              return 0;
            })
          : [...state.dogs].sort(function (a, b) {
              if (a.weight_min === null) {
                return 0;
              }
              if (a.weight_min < b.weight_min) {
                return -1;
              }
              if (b.weight_min < a.weight_min) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allDogs: sortedWeight,
      };

    case FILTER_DOGS_BY_MAX_WEIGHT:
      const everyDog = state.allDogs;
      const weightMAXFiltered =
        action.payload === "all"
          ? everyDog
          : everyDog.filter((el) => el.weight_max <= action.payload);
      return {
        ...state,
        allDogs: weightMAXFiltered,
      };

    case FILTER_DOGS_BY_MIN_WEIGHT:
      const allDoguis = state.allDogs;
      const weightMINFiltered =
        action.payload === "all"
          ? allDoguis
          : allDoguis.filter((el) => el.weight_min >= action.payload);
      return {
        ...state,
        allDogs: weightMINFiltered,
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

    case POST_DOGS:
      return {
        ...state,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
