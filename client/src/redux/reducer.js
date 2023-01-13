import {
  ERROR,
  GET_ALL_DOGS,
  GET_DOG_ID,
  DELETE_DOG_ID,
  GET_DOGS_BY_QUERY,
  FILTER_BY_BREED,
  FILTER_CREATED,
  FILTER_BY_TEMPERAMENTS,
  ORDER_DOGS_ALF,
  ORDER_DOGS_POP,
  // ORDER_DOGS_BY_WEIGHT,
  FILTER_DOGS_BY_MAX_WEIGHT,
  FILTER_DOGS_BY_MIN_WEIGHT,
  GET_TEMPERAMENTS,
  POST_DOGS,
} from "./actions";

const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  allTemperaments: [],
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


    case GET_DOGS_BY_QUERY:
      return {
        ...state,
        dogs: action.payload,
      };

    case FILTER_BY_BREED:
      const allDogs = state.allDogs;
      let breedFiltered = allDogs;
      if (action.payload === "All") {
        console.log("all");
        breedFiltered = allDogs;
      } else if (action.payload === "Api") {
        console.log("api");
      } else if (action.payload === "Created") {
        console.log("Created");
      } else {
        allDogs.filter((e) => e.breed === action.payload);
      }
      
      // const breedFiltered =
      //   action.payload === "All"
      //     ? allDogs
      //     : allDogs.filter((e) => e.breed === action.payload);
      return {
        ...state,
        countries: breedFiltered,
      };

      case FILTER_CREATED:
            const createdFilter = action.payload === 'created' ?
                state.dogs.filter(el => el.createdInDB === true) :
                state.dogs.filter(el => !el.createdInDB);
            return {
                ...state,
                allDogs: createdFilter,
            }

    case ORDER_DOGS_ALF:
      let sortedAlf =
        action.payload === "alf"
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
        action.payload === "pop"
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

    // case ORDER_DOGS_BY_WEIGHT:
    //   const sortedWeight =
    //     action.payload === "asc"
    //       ? [...state.dogs].sort(function (a, b) {
    //           if (a.weight_min === null) {
    //             return 0;
    //           }
    //           if (a.weight_min < b.weight_min) {
    //             return 1;
    //           }
    //           if (b.weight_min < a.weight_min) {
    //             return -1;
    //           }
    //           return 0;
    //         })
    //       : [...state.dogs].sort(function (a, b) {
    //           if (a.weight_min === null) {
    //             return 0;
    //           }
    //           if (a.weight_min < b.weight_min) {
    //             return -1;
    //           }
    //           if (b.weight_min < a.weight_min) {
    //             return 1;
    //           }
    //           return 0;
    //         });
    //   return {
    //     ...state,
    //     allDogs: sortedWeight,
    //   };

    case FILTER_DOGS_BY_MAX_WEIGHT:
      const everyDog = state.allDogs;
      const weightMAXFiltered =
        action.payload === "asc"
          ? everyDog
          : everyDog.filter((el) => el.weight_max <= action.payload);
      return {
        ...state,
        allDogs: weightMAXFiltered,
      };

    case FILTER_DOGS_BY_MIN_WEIGHT:
      const allDoguis = state.allDogs;
      const weightMINFiltered =
        action.payload === "dec"
          ? allDoguis
          : allDoguis.filter((el) => el.weight_min >= action.payload);
      return {
        ...state,
        allDogs: weightMINFiltered,
      };

    case FILTER_BY_TEMPERAMENTS:
      let array = [];
      const allDogs2 = state.allDogs;
      const solo = allDogs2.filter((dog) => {
        return dog.Temperaments.length > 0;
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

      case GET_TEMPERAMENTS:
        return {
          ...state,
          temperaments: action.payload,
          allTemperaments: action.payload
        }

    case POST_DOGS:
      return {
        ...state,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
