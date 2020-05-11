
import React, { Component } from 'react';
import {fetchData} from './api';
import Cards from './components/Cards/Cards';
import SelectCountry from './components/SelectCountry/SelectCountry';
import Graph from './components/Graph/Graph';
import './App.scss';

class App extends Component {

  state = {
    data: {},
    country: '',
    countries: [],
    countryName: '',
    copyData: {},
    history: [],
    copyHistory: []
  }

  async componentDidMount() {
    let data = await fetchData();
    let countriesArray = [];
    const ascendingHistory = data.History.reverse();
    data.Regions.map(country => {
      return countriesArray.push(country.Name);
    });

    this.setState({ 
      ...this.state,
      data: data,
      countries: countriesArray,
      copyData: data,
      history: ascendingHistory,
      copyHistory: ascendingHistory,
      countryName: data.Name
    });
  }

  handleCountryChange = async (event, value) => {
    const oldData = this.state.copyData;
    const oldHistory = this.state.copyHistory;
    let selectedCountryData;
    let selectedCountryHistory;
    if (value) {
      let countryData = oldData.Regions.find(country => country.Name === value);
      selectedCountryData = await fetchData(countryData.Api);
      selectedCountryHistory = selectedCountryData.History.reverse();
    } else {
      selectedCountryData = oldData;
      selectedCountryHistory = oldHistory;
    }
    
    this.setState({
      ...this.state,
      data: selectedCountryData,
      history: selectedCountryHistory,
      countryName: selectedCountryData.Name
    });
  }

  render() {

    const { data, countries, history, countryName} = this.state;
    console.log(data);
    console.log(history);
    return (
      <div className="App">
          <header className="global_header">
            <h1>COVID-19 Tracker</h1>
            <div class="earth"></div>
            {/* <EarthLogo className="earth_logo"/> */}
            <SelectCountry countries = {countries} onCountryChange = {this.handleCountryChange}/>
          </header>
          <h2 className="country_name">{countryName}</h2>
          <Cards data = {data}/>
          <Graph history = {history} name = {countryName}/>
      </div>
    );
  }
}

export default App;
