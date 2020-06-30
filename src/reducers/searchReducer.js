const INITIAL_STATE = {
  searchTerm: '',
  restaurantData: []
};

function searchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SEARCH_SET':
      return { ...state, searchTerm: action.searchTerm };
    case 'RESTAURANTS_DATA_LOADED':
      return { ...state, restaurantData: action.restaurantsData.restaurants };
    default: return state;
  }
}

export default searchReducer;
