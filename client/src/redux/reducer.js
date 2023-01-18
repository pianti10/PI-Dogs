import {
  ERROR,
  GET_ALL_DOGS,
  GET_DOG_ID,
  DELETE_DOG_ID,
  GET_DOGS_BY_QUERY,
  GET_TEMPERAMENTS,
  POST_DOGS,
  FILTER_CREATED,
  FILTER_BY_TEMPERAMENTS,
  ORDER_DOGS_ALF,
  ORDER_DOGS_BY_WEIGHT,
} from "./actions";

const initialState = {
  dogs: [],
  temperaments: [],
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

    case FILTER_CREATED:
      const allDoggys = state.dogs;
      let filteredDoggys = [];

      if (action.payload === "Created") {
        allDoggys.map((e) => {
          return e.createdInDb !== undefined && filteredDoggys.push(e);
        });
        return {
          ...state,
          filterDogs: filteredDoggys,
        };
      } else if (action.payload === "Api") {
        allDoggys.map((e) => {
          return e.createdInDb === undefined && filteredDoggys.push(e);
        });
        return {
          ...state,
          filterDogs: filteredDoggys,
        };
      } else if (action.payload === "All") {
        return {
          ...state,
          filterDogs: allDoggys,
        };
      }

      break;

    case ORDER_DOGS_ALF:
      let sortedAlf;
      if (action.payload === "alf") {
        if (state.filterDogs.length > 0) {
          sortedAlf = [...state.filterDogs].sort(function (a, b) {
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
            filterDogs: sortedAlf,
          };
        } else {
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
        }
      } else if (action.payload === "pop") {
        if (state.filterDogs.length > 0) {
          sortedAlf = [...state.filterDogs].sort(function (a, b) {
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
            filterDogs: sortedAlf,
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
        }
      } else {
        return {
          ...state,
          dogs: state.allDogs,
        };
      }
      break

    case ORDER_DOGS_BY_WEIGHT:
      let sortedWeight;
      if (action.payload === "Asc") {
        if (state.filterDogs.length > 0) {
          sortedWeight = [...state.filterDogs].sort(function (a, b) {
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
            filterDogs: sortedWeight,
          };
        } else {
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
        }

      } else if (action.payload === "Desc") {
        if (state.filterDogs.length > 0) {
          sortedWeight = [...state.filterDogs].sort(function (a, b) {
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
            filterDogs: sortedWeight,
          };
        } else {
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
        }

      } else {
        return {
          ...state,
          dogs: state.allDogs,
        };
      }

    case FILTER_BY_TEMPERAMENTS:
      const allDogs2 = state.dogs;
      let filteredTemp = state.dogs;

      if (action.payload === "AllTemperaments") {
        return {
          ...state,
          dogs: state.dogs,
          filterDogs: []
        };
      } else {

        filteredTemp = allDogs2.filter((e) => {
          return e.temperament?.includes(action.payload);
        });
        return {
          ...state,
          filterDogs: filteredTemp,
        };
      }
    default:
      return { ...state };
  }
};

export default rootReducer;
