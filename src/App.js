
import React, { Component } from 'react';
import {fetchData} from './api';
import Cards from './components/Cards/Cards';
import SelectCountry from './components/SelectCountry/SelectCountry';
import Graph from './components/Graph/Graph';
import CountUp from 'react-countup';
import ReactGA from 'react-ga';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import './App.scss';

const theme = createMuiTheme({
  palette: {
      primary: {
          main: '#0055DE',
      },
      secondary: {
          main: '#AF3C43',
      },
  },
});

class App extends Component {

  constructor(props) {
    super(props);

    ReactGA.initialize('UA-150841502-1', {
      debug: false,
      standardImplementation: false,
    });

    ReactGA.pageview('/covidTracking');

    this.state = {
      data: {},
      country: '',
      countries: [],
      countryName: '',
      copyData: {},
      history: [],
      copyHistory: []
    }
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

  // Function to get the difference between current day and prev day total cases
  diffMaker = (array) => {
    const newArray = [];

    for (let index = 1; index < array.length; index++) {
        newArray.push(array[index] - array[index - 1]);
    }

    return newArray;
}

  render() {
    const { data, countries, history, countryName} = this.state;

    // if(true) {
    if (history.length === 0) {
      return <ThemeProvider theme={theme}> <CircularProgress color="primary" style={{width: 150, height: 150, margin: 'auto'}}/> </ThemeProvider>;
    }
    
    let dailyNewCases = this.diffMaker(history.map(day => day.Confirmed));
    let dailyNewDeaths = this.diffMaker(history.map(day => day.Deaths));
    let dailyNewRecovered = this.diffMaker(history.map(day => day.Recovered));

    // console.log(data);
    // console.log(history);
    let totalCases = +data.Confirmed;
    let newCasesToday = dailyNewCases.slice(-1);
    return (
      <div className="App">
          <header className="global_header">
            <h1>COVID-19 Tracker</h1>
            <div className="earth"></div>
            <SelectCountry countries = {countries} onCountryChange = {this.handleCountryChange}/>
          </header>
          <div className="country_name_total_cases">
            <h2 className="country_name">{countryName}</h2>
            <h3>
              Total Cases: <CountUp start={0} end={totalCases} duration={1.75} separator=","/>
            </h3>
            <h4>
              New Cases Today: ( +<CountUp start={0} end={+newCasesToday} duration={1.75} separator=","/> )
            </h4>
          </div>
          <Cards history = {[dailyNewDeaths, dailyNewRecovered]} data = {data}/>
          <Graph history = {[history, dailyNewCases, dailyNewDeaths, dailyNewRecovered]} name = {countryName}/>
      </div>
    );
  }
}

export default App;
