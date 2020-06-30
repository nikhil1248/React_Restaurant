import React from 'react';
import { connect } from 'react-redux';

const applyFilter = searchTerm => article =>
  article.name.toLowerCase().includes(searchTerm.toLowerCase()) ||article.address.toLowerCase().includes(searchTerm.toLowerCase()) || article.area.toLowerCase().includes(searchTerm.toLowerCase());

const App = ({ restaurantsData, searchTerm, onSearch, onReceivedData }) => {

  const [city, setCity] = React.useState(
    ''
  );
  const getRestaurantData = async (city) => {
    const res = await fetch(`http://opentable.herokuapp.com/api/restaurants?city=${city}`);
    const restaurantsData = await res.json()
    console.log(restaurantsData);
    onReceivedData(restaurantsData)
  } 
  
  const getRestaurantDataByCity = () => {
    getRestaurantData(city)
  }

  const handleCityChange = (e) => {
    setCity(e.target.value)
  }
  
  return (<div className="container">
    <div className="form-container">
    <div>
      <input type="text" value={city} onChange={(event) => handleCityChange(event)} placeholder="Enter City Name"/> 
      <button className="button" onClick={getRestaurantDataByCity}>Get Data</button>
    </div> 
  <Search value={searchTerm} onSearch={onSearch}>
    <p>Search By Name, Address, Area</p>
  </Search>
  </div>
  <Restaurants restaurants={restaurantsData.filter(applyFilter(searchTerm))} />

</div>)

}
  
const Search = ({ value, onSearch, children }) =>
  <div>
    {children} <input
      value={value}
      onChange={event => onSearch(event.target.value)}
      type="text"
    placeholder="Search By Name, Address, Area"
    />
  </div>

const Restaurants = ({ restaurants }) =>
  <table id="restaurants">
    <thead>
  <tr>
    <th>Name</th>
    <th>Address</th>
    <th>Area</th>
      </tr>
    </thead>
    <tbody>
    {restaurants.map(restaurant =>
      <tr key={restaurant.id}>
        <td>
          {restaurant.name}
        </td>
        <td>
          {restaurant.address}
        </td>
        <td>
          {restaurant.area}
        </td>
      </tr>
    
      )}
      </tbody>
  </table>



// connecting view layer to state layer with react-redux

const mapStateToProps = state => ({
  articles: state.articlesState.articles,
  restaurantsData: state.searchState.restaurantData,
  searchTerm: state.searchState.searchTerm,
});

const mapDispatchToProps = dispatch => ({
  onSearch: searchTerm => dispatch({ type: 'SEARCH_SET', searchTerm }),
  onReceivedData: restaurantsData => dispatch({ type: 'RESTAURANTS_DATA_LOADED', restaurantsData }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
