
import React, { Component } from 'react';
import {fetchData, fetchIndianData, fetchDataRegions} from './api';
import Cards from './components/Cards/Cards';
import SelectCountry from './components/SelectCountry/SelectCountry';
import SelectSubRegions from './components/SelectSubRegions/SelectSubRegions';
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
      countryName: '',
      countries: [],
      history: [],
      subRegions: [],
      subRegionName: '',
      indianSubRegionCodes: [],
      indianSubRegionData: [],
      indiaCountryData: [],
      subRegionUpdated: false,
      copyData: {},
      copyHistory: [],
      copyCountryData: {},
      copyCountryHistory: [],
      copyCountryName: '',
      copyIndianSubRegionData: [],
      copyindiaCountryData: []
    }
  }

  async componentDidMount() {
    let data = await fetchData();
    // let locateCountry = await locatedCountry();
    // console.log(data);
    // console.log(locateCountry);
    let countriesArray = [];
    const ascendingHistory = data.History.reverse();
    data.Regions.map(country => {
      return countriesArray.push(country.Name);
    });


    this.setState({ 
      ...this.state,
      data: data,
      countries: countriesArray,
      history: ascendingHistory,
      copyData: data,
      copyHistory: ascendingHistory,
      countryName: data.Name
    });
  }

  handleCountryChange = async (event, value) => {
    // console.log(value);
    const oldData = this.state.copyData;
    const oldHistory = this.state.copyHistory;
    
    let selectedCountryData;
    let selectedCountryHistory;
    let selectedCountrySubRegionArray = [];
    const indianSubRegionData = [];
    const indianSubRegionCodes = [];
    let indiaCountryData = [];
    if (value) {
      let countryData = oldData.Regions.find(country => country.Name === value);
      selectedCountryData = await fetchData(countryData.Api);
      selectedCountryHistory = selectedCountryData.History.reverse();
      if(selectedCountryData.Regions || value === "India") {
        if(selectedCountryData.Regions) {
          selectedCountryData.Regions.map(region => {
            return selectedCountrySubRegionArray.push(region.State);
          });
        } else {
          let {data: [data]} = await fetchIndianData();
          // console.log(data);
          indiaCountryData = data.table[0];
          for (let index = 1; index < data.table.length; index++) {
            selectedCountrySubRegionArray.push(data.table[index].state);
            indianSubRegionCodes.push(data.table[index].statecode);
            indianSubRegionData.push(data.table[index]);
          }
        }
      }
    } else {
      selectedCountryData = oldData;
      selectedCountryHistory = oldHistory;
      selectedCountrySubRegionArray = [];
    }

    
    this.setState({
      ...this.state,
      data: selectedCountryData,
      history: selectedCountryHistory,
      countryName: selectedCountryData.Name,
      subRegions: selectedCountrySubRegionArray,
      subRegionName: '',
      indianSubRegionCodes: indianSubRegionCodes,
      indianSubRegionData: indianSubRegionData,
      indiaCountryData: indiaCountryData,
      subRegionUpdated: false,
      copyCountryName: selectedCountryData.Name,
      copyCountryData: selectedCountryData,
      copyCountryHistory: selectedCountryHistory,
      copyIndianSubRegionData: indianSubRegionData,
      copyindiaCountryData: indiaCountryData
    });

    // console.log(this.state.data);
    // console.log(this.state.subRegions);
    // console.log(this.state.indianSubRegionData);
    // console.log(this.state.indianSubRegionCodes);

  }

  handleSubRegionChange = async (event, value) => {
    // console.log(value);

    const oldData = this.state.copyCountryData;
    const oldHistory = this.state.copyCountryHistory;
    const oldCountryName = this.state.copyCountryName;
    const oldIndianSubRegionData = this.state.copyIndianSubRegionData;
    let indianSubRegion = false;
    // console.log(oldData);
    let selectedSubRegionName;
    let selectedSubRegionData;
    let selectedSubRegionHistory;
    if (value) {
      if (oldData.Country === "India") {
        indianSubRegion = true;
        const data = oldIndianSubRegionData.find(region => region.state === value);
        const transformedData = [];
        transformedData.push({
          totalActiveCases: data.active,
          Confirmed: data.confirmed,
          Deaths: data.deaths,
          newCasesToday: data.deltaconfirmed,
          newDeaths: data.deltadeaths,
          newRecoveries: data.deltarecovered,
          Recovered: data.recovered,
          State: data.state,
          Statecode: data.statecode
        })
        selectedSubRegionData = transformedData[0];
        selectedSubRegionName = selectedSubRegionData.State;
        selectedSubRegionHistory = oldHistory;
      } else {
        let subRegionData = oldData.Regions.find(region => region.State === value);
        selectedSubRegionData = await fetchDataRegions(subRegionData.Api);
        selectedSubRegionHistory = selectedSubRegionData.History.reverse();
        selectedSubRegionName = selectedSubRegionData.State;
        indianSubRegion = false;
      }
    } else {
      selectedSubRegionData = oldData;
      selectedSubRegionHistory = oldHistory;
      selectedSubRegionName = oldCountryName;
      value = '';
      indianSubRegion = false;
    }

    this.setState({
      ...this.state,
      data: selectedSubRegionData,
      history: selectedSubRegionHistory,
      countryName: selectedSubRegionName,
      subRegionUpdated: indianSubRegion,
      subRegionName: value
    });
    // console.log(this.state.data); 
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
    const { data, countries, history, countryName, subRegions, subRegionName, copyCountryData, subRegionUpdated } = this.state;

    let dailyNewCases;
    let dailyNewDeaths;
    let dailyNewRecovered;
    let totalCases;
    let newCasesToday
    // console.log(data);
    // if(true) {
    if (!data.Confirmed) {
      return <ThemeProvider theme={theme}> <CircularProgress color="primary" style={{width: 150, height: 150, margin: 'auto'}}/> </ThemeProvider>;
    }

    if (copyCountryData.Country === "India" && subRegionUpdated) {
      // console.log("Subregion updated");
      totalCases = +data.Confirmed;
      newCasesToday = +data.newCasesToday;
    } else {
      dailyNewCases = this.diffMaker(history.map(day => day.Confirmed));
      dailyNewDeaths = this.diffMaker(history.map(day => day.Deaths));
      dailyNewRecovered = this.diffMaker(history.map(day => day.Recovered));

      totalCases = +data.Confirmed;
      newCasesToday = dailyNewCases.slice(-1);
    }
    // console.log(subRegionUpdated);
    // console.log(this.state.copyCountryData);
    // console.log(data);
    // console.log(history);
    return (
      <div className="App">
          <header className="global_header">
            <h1>COVID-19 Tracker</h1>
            <div className="earth"></div>
            <div className="dropdown_wrapper">
              <SelectCountry countries = {countries} onCountryChange = {this.handleCountryChange}/>
              { 
                subRegions.length > 0 && 
                  <SelectSubRegions subRegionName = {subRegionName} subRegions = {subRegions} onSubRegionsChange = {this.handleSubRegionChange}/>
              }
            </div>
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
          <Cards subRegionUpdated = {subRegionUpdated} history = {[dailyNewDeaths, dailyNewRecovered]} data = {data}/>
          {
            !subRegionUpdated &&
            <Graph history = {[history, dailyNewCases, dailyNewDeaths, dailyNewRecovered]} name = {countryName}/>
          }
      </div>
    );
  }
}

export default App;
