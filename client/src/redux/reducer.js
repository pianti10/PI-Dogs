import {
  ERROR,
  GET_ALL_DOGS,
  GET_DOG_ID,
  DELETE_DOG_ID,
  GET_DOGS_BY_QUERY,
  GET_TEMPERAMENTS,
  POST_DOGS,
  //FILTER_BY_API_BREED,
  FILTER_CREATED,
  FILTER_BY_TEMPERAMENTS,
  ORDER_DOGS_ALF,
  ORDER_DOGS_BY_WEIGHT,
} from "./actions";

const initialState = {
  dogs: [],
  // allDogs: [],
  temperaments: [],
  // allTemperaments: [],
  detail: [],
  error: [],
  filterDogs: [],
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

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };

    case POST_DOGS:
      return {
        ...state,
      };

    // case FILTER_CREATED:
    //   const allDogsCreated = state.dogs;
    //   const filterCreated =
    //     action.payload === "Created"
    //       ? allDogsCreated.filter((dogs) => dogs.dataBaseDog)
    //       : action.payload === "api"
    //       ? allDogsCreated.filter((dogs) => !dogs.dataBaseDog)
    //       : action.payload === "all" && allDogsCreated;

    //   return {
    //     ...state,
    //     dogs: filterCreated,
    //   };

    // case FILTER_BY_API_BREED:
    //   const apiDogs = state.filterDogs;
    //   const breedsFilter = action.payload === "Api"
    //       ? apiDogs
    //       : apiDogs.filter((d) => d.breeds === action.payload);
    //   return {
    //     ...state,
    //     dogs: breedsFilter,
    //   };

    case FILTER_CREATED:
      // const createdFilter =
      // action.payload === "Created"
      // ? state.dogs.filter((el) => el.createdInDB === true)
      // : state.dogs.filter((el) => !el.createdInDB);
      // console.log(state.dogs);
      // return {
      //   ...state,
      //   dogs: createdFilter,
      // };

      const allDoggys = state.dogs;
      let filteredDoggys = [];

      if (action.payload === "Created") {
          allDoggys.map((e) => {
           return e.createdInDb !== undefined && (filteredDoggys.push(e));
         });
        return {
          ...state,
          filterDogs: filteredDoggys,
        };


      } else if (action.payload === "Api") {
        allDoggys.map((e) => {
        return e.createdInDb === undefined && (filteredDoggys.push(e));
       });
        return {
          ...state,
          filterDogs: filteredDoggys,
        };

      } else if (action.payload === "All"){
        return {
          ...state,
          filterDogs: allDoggys,
        };
      }

    case ORDER_DOGS_ALF:
      let sortedAlf;
      if (action.payload === "alf") {
        sortedAlf = [...state.dogs].sort(function (a, b) {
          if (a.name === null) {
            return 0;
          }
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        });
        return {
          ...state,
          dogs: sortedAlf,
        };
      } else if (action.payload === "pop") {
        sortedAlf = [...state.dogs].sort(function (a, b) {
          if (b.name === null) {
            return 0;
          }
          if (a.name < b.name) {
            return 1;
          }
          if (b.name < a.name) {
            return -1;
          }
          return 0;
        });
        return {
          ...state,
          dogs: sortedAlf,
        };
      } else {
        return {
          ...state,
          dogs: state.allDogs,
        };
      }

    case ORDER_DOGS_BY_WEIGHT:
      let sortedWeight;
      if (action.payload === "Asc") {
        sortedWeight = [...state.dogs].sort(function (a, b) {
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
          dogs: sortedWeight,
        };
      } else if (action.payload === "Desc") {
        sortedWeight = [...state.dogs].sort(function (a, b) {
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
        });
        return {
          ...state,
          dogs: sortedWeight,
        };
      } else {
        return {
          ...state,
          dogs: state.allDogs,
        };
      }

    case FILTER_BY_TEMPERAMENTS:
      const allDogs2 = state.dogs;
      let filteredTemp = state.dogs;
      filteredTemp =
        action.payload === "AllTemperaments"
          ? state.dogs
          : allDogs2.filter((e) => {
              return e.temperament?.includes(action.payload);
            });

      return {
        ...state,
        filterDogs: filteredTemp,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
