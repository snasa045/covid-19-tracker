
import React, { Component } from 'react';
import {fetchData, fetchIndianData, fetchDataRegions, fetchCountryFlag, fetchCountries, fetchDailyData} from './api';
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
      countryFlag: '',
      countries: [],
      history: [],
      subRegions: [],
      subRegionName: '',
      indianSubRegionCodes: [],
      indianSubRegionData: [],
      indiaCountryData: [],
      subRegionUpdated: false,
      copyData: {},
      // copyHistory: [],
      copyCountryData: {},
      // copyCountryHistory: [],
      copyCountryName: '',
      copyIndianSubRegionData: [],
      copyindiaCountryData: []
    }
  }

  async componentDidMount() {
    let data = await fetchData();
    let countriesArray = await fetchCountries();
    let historyArray = await fetchDailyData();
    // let locateCountry = await locatedCountry();
    // console.log(data);
    // console.log(locateCountry);
    // console.log(data);
    // console.log(countriesArray);
    // Removing history for now due to updated API doesn't provide history data
    // const ascendingHistory = data.History.reverse();

    // const countryFlagData = await fetchCountryFlag();
    // const notFoundCountryFlagData = [];
    // console.log(countryFlagData);
    // countriesArray.forEach(country => {
      // for (let index = 0; index < countryFlagData.length; index++) {
      //   if(country.toLowerCase() !== countryFlagData[index].name.toLowerCase()) {

      //   }
      // }
    //   const filterArray = [];

    //   countryFlagData.forEach(flagData => {
    //     filterArray.push(flagData.name);
    //     flagData.altSpellings.forEach(data => filterArray.push(data));
    //   });

    //   let exist = filterArray.findIndex(flagData => country.toLowerCase() === flagData.toLowerCase());
    //   if (exist === -1) {notFoundCountryFlagData.push(country)};
    // });

    // console.log(notFoundCountryFlagData);


    this.setState({ 
      ...this.state,
      data: data,
      countries: countriesArray,
      history: historyArray,
      copyData: data,
      // copyHistory: ascendingHistory,
      countryName: 'World',
      copyCountryName: 'World'
    });
  }

  handleCountryChange = async (event, value) => {
    // console.log(value);

    const oldData = this.state.copyData;
    let oldSelectedCountryName = this.state.countryName;
    // const oldHistory = this.state.copyHistory;
    const convertCountryNameData = {
      "Russia": "Russian Federation",
      "Iran": "Iran (Islamic Republic of)",
      "S. Korea": "Korea (Republic of)",
      "Czechia": "Czech Republic",
      "Moldova": "Moldova (Republic of)",
      "Bolivia": "Bolivia (Plurinational State of)",
      "North Macedonia": "Republic of Macedonia",
      "Venezuela": "Bolivarian Republic of Venezuela",
      "CAR": "Central African Republic",
      "Tanzania": "United Republic of Tanzania",
      "Palestine": "State of Palestine",
      "Vietnam": "Viet Nam",
      "Eswatini": "Swaziland",
      "Faeroe Islands": "Faroe Islands",
      "Brunei": "Nation of Brunei",
      "Syria": "Syrian Arab Republic",
      "Sint Maarten": "Sint Maarten (Dutch part)",
      "Saint Martin": "Saint Martin (French part)",
      "St. Vincent Grenadines": "Saint Vincent and the Grenadines",
      "Falkland Islands": "Falkland Islands (Malvinas)",
      "Turks and Caicos": "Turks and Caicos Islands",
      "Vatican City": "Holy See",
      "British Virgin Islands": "Virgin Islands (British)",
      "St. Barth": "Saint Barthélemy",
      "Saint Pierre Miquelon": "Saint Pierre and Miquelon"
    };
    
    let selectedCountryData;
    // let selectedCountryHistory;
    let selectedCountrySubRegionArray = [];
    let selectedCountryDataForFlag = [];
    let selectedCountryFlag = '';
    const indianSubRegionData = [];
    const indianSubRegionCodes = [];
    let indiaCountryData = [];
    let selectedCountryName = '';

    if (value) {
      selectedCountryName = value;
      // let countryData = oldData.Regions.find(country => country.Name === value);
      selectedCountryData = await fetchData(value);
      // fetching a country flag from the api
      selectedCountryDataForFlag = await fetchCountryFlag(value);
      // console.log(selectedCountryData);
      // console.log(selectedCountryDataForFlag);
      if (selectedCountryDataForFlag.length) {
        selectedCountryDataForFlag.forEach(data => selectedCountryFlag = data.flag);
      } else {
        for (const key in convertCountryNameData) {
          if(key === value) {
            // console.log(convertCountryNameData[key])
            selectedCountryDataForFlag = await fetchCountryFlag(convertCountryNameData[key]);
          } 
        }

        if (selectedCountryDataForFlag.length) {
          selectedCountryDataForFlag.forEach(data => selectedCountryFlag = data.flag);
        }
      }

      // selectedCountryHistory = selectedCountryData.History.reverse();
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
      selectedCountryName = 'World';
      // selectedCountryHistory = oldHistory;
      selectedCountrySubRegionArray = [];
      selectedCountryFlag = value;
    }

    
    this.setState({
      ...this.state,
      data: selectedCountryData,
      // history: selectedCountryHistory,
      countryName: selectedCountryName,
      countryFlag: selectedCountryFlag,
      subRegions: selectedCountrySubRegionArray,
      subRegionName: '',
      indianSubRegionCodes: indianSubRegionCodes,
      indianSubRegionData: indianSubRegionData,
      indiaCountryData: indiaCountryData,
      subRegionUpdated: false,
      copyCountryName: selectedCountryName,
      copyCountryData: selectedCountryData,
      // copyCountryHistory: selectedCountryHistory,
      copyIndianSubRegionData: indianSubRegionData,
      copyindiaCountryData: indiaCountryData
    });
  }

  handleSubRegionChange = async (event, value) => {
    // console.log(value);

    const oldData = this.state.copyCountryData;
    // const oldHistory = this.state.copyCountryHistory;
    const oldCountryName = this.state.copyCountryName;
    const oldIndianSubRegionData = this.state.copyIndianSubRegionData;
    let indianSubRegion = false;
    // console.log(oldData);
    let selectedSubRegionName;
    let selectedSubRegionData;
    // let selectedSubRegionHistory;
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
        // selectedSubRegionHistory = oldHistory;
      } else {
        let subRegionData = oldData.Regions.find(region => region.State === value);
        selectedSubRegionData = await fetchDataRegions(subRegionData.Api);
        // selectedSubRegionHistory = selectedSubRegionData.History.reverse();
        selectedSubRegionName = selectedSubRegionData.State;
        indianSubRegion = false;
      }
    } else {
      selectedSubRegionData = oldData;
      // selectedSubRegionHistory = oldHistory;
      selectedSubRegionName = oldCountryName;
      value = '';
      indianSubRegion = false;
    }

    this.setState({
      ...this.state,
      data: selectedSubRegionData,
      // history: selectedSubRegionHistory,
      countryName: selectedSubRegionName,
      subRegionUpdated: indianSubRegion,
      subRegionName: value
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
    const { data, history, countries, countryName, subRegions, subRegionName, copyCountryData, subRegionUpdated, countryFlag } = this.state;

    let dailyNewCases;
    let dailyNewDeaths;
    let dailyNewRecovered;
    let totalCases;
    let newCasesToday
    
    if (!data.confirmed) {
      return <ThemeProvider theme={theme}> <CircularProgress color="primary" style={{width: 150, height: 150, margin: 'auto'}}/> </ThemeProvider>;
    }

    if (copyCountryData.Country === "India" && subRegionUpdated) {
      totalCases = +data.confirmed.value;
      newCasesToday = +history?.slice(-1).newCasesToday;
      // newCasesToday = +data.newCasesToday;
    } else {
      dailyNewCases = this.diffMaker(history.map(day => day.Confirmed));
      // dailyNewDeaths = this.diffMaker(history.map(day => day.Deaths));
      // dailyNewRecovered = this.diffMaker(history.map(day => day.Recovered));

      totalCases = +data.confirmed.value;
      newCasesToday = +history?.slice(-1)[0].newCasesToday;
    }


    
    return (
      <div className="App">
          <header className="global_header">
            <h1>COVID-19 Tracker</h1>
            <div className="earth"></div>
            <div className="dropdown_wrapper">
              <SelectCountry countries = {countries} onCountryChange = {this.handleCountryChange}/>
              {/* { 
                subRegions.length > 0 && 
                  <SelectSubRegions subRegionName = {subRegionName} subRegions = {subRegions} onSubRegionsChange = {this.handleSubRegionChange}/>
              } */}
            </div>
          </header>
          <div className="country_name_total_cases">
            <div className="country_name_and_flag_div">
              { countryFlag && <img className="country_img" src={`${countryFlag}`} alt="country flag"/>}
              <h2 className="country_name">{countryName}</h2>
            </div>
            <h3>
              Total Cases: <CountUp start={0} end={totalCases} duration={1.75} separator=","/>
            </h3>
            {/* <h4>
              New Cases Today: ( +<CountUp start={0} end={+newCasesToday} duration={1.75} separator=","/> )
            </h4> */}
          </div>
          <Cards subRegionUpdated = {subRegionUpdated} history = {history} data = {data}/>
          {/* {
            !subRegionUpdated &&
            <Graph history = {[history, dailyNewCases, dailyNewDeaths, dailyNewRecovered]} name = {countryName}/>
          } */}
      </div>
    );
  }
}

export default App;
