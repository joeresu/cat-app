const INITIAL_STATE = {
  isLoaded: false,
  items: {},
  selectedId: "",
  breeds: {
    cats: {},
    isLoaded: false,
    selectedId: "",
    options: [],
    searchItems: 10,
    searchParams: {}
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_BREEDS_SUCCESS": {
      return {
        ...state,
        ...(action.data.length && {
          breeds: {
            ...state.breeds,
            isLoaded: true,
            cats: {
              ...state.breeds.cats,
              ...action.data.filter(b => typeof state.breeds.cats[b.id] === "undefined")
                .reduce((params, obj) => {
                  return {
                    ...params,
                    [obj.id]: []
                  }
                }, {})
            },
            options: [
              ...state.breeds.options.filter(b => !action.data.some(d => b.id === d.id)),
              ...action.data.map(b => ({id: b.id, name: b.name}))],
            searchParams: {
              ...state.breeds.searchParams,
              ...action.data.filter(b => typeof state.breeds.searchParams[b.id] === "undefined")
                .reduce((params, obj) => {
                  return {
                    ...params,
                    [obj.id]: {
                      hasMore: true,
                      page: 1,
                    }
                  }
                }, {})
            }
          }
        })
      };
    }
    case "GET_CAT_BY_ID_SUCCESS": {
      return {
        ...state,
        items: {
          ...state.items,
          [action.data.id]: {
            ...state.items[action.data.id],
            ...(["id", "url", "width", "height"].reduce((obj, key) => {
              return {
                ...obj,
                [key]: action.data[key]
              }
            }, {})),
            breed: {
              ...(["id", "name", "origin", "temperament", "description"].reduce((obj, key) => {
                return {
                  ...obj,
                  [key]: action.data.breeds[0][key]
                }
              }, {})),
            }
          }
        },
        ...(action.data.breeds[0] && typeof state.breeds.searchParams[action.data.breeds[0].id] === "undefined" && {
          breeds: {
            ...state.breeds,
            cats: {
              ...state.breeds.cats,
              [action.data.breeds[0].id]: []
            },
            searchParams: {
              ...state.breeds.searchParams,
              [action.data.breeds[0].id]: {
                hasMore: true,
                page: 1,
              }
            }
          }
        })
      }
    }
    case "GET_CATS_BY_BREED_ID_SUCCESS": {
      let breedCats = {...state.breeds.cats};
      let breedId = JSON.parse(action.config.data).breed_id;
      let items = action.data.filter(c => typeof state.items[c.id] === "undefined").reduce((cats, obj) => {
        breedCats[breedId] = [...breedCats[breedId], obj.id];

        const breeds = obj["breeds"] ? obj["breeds"][0] : null;
        delete obj["breeds"];
        return {
          ...cats,
          [obj.id]: {
            ...obj,
            ...(breeds && {
              breed: {
                ...(["id", "name", "origin", "temperament", "description"].reduce((obj, key) => {
                  return {
                    ...obj,
                    [key]: breeds[key]
                  }
                }, {})),
              }
            }),
          },
        }
      }, {});

      return {
        ...state,
        items: {
          ...state.items,
          ...items,
        },
        breeds: {
          ...state.breeds,
          cats: {
            ...state.breeds.cats,
            ...breedCats
          },
          searchParams: {
            ...state.breeds.searchParams,
            [breedId]: {
              ...state.breeds.searchParams[breedId],
              hasMore: (breedCats[breedId].length / state.breeds.searchParams[breedId].page)  === state.breeds.searchItems,
              page: state.breeds.searchParams[breedId].page + 1,
            }
          }
        }
      }
    }
    case "SET_SELECTED_CAT_ID": {
      return {
        ...state,
        selectedId: action.data.id
      }
    }
    case "SET_SELECTED_BREED_ID": {
      return {
        ...state,
        breeds: {
          ...state.breeds,
          selectedId: action.data.id
        }
      }
    }
    default:
      return state;
  }
};
