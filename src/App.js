import React, { Component } from 'react';
import {fetchData} from './api';
import Cards from './components/Cards/Cards';
import SelectCountry from './components/SelectCountry/SelectCountry';
import './App.scss';

class App extends Component {

  state = {
    data: {},
    country: ''
  }

  async componentDidMount() {
    let data = await fetchData();
    this.setState({ data })
    console.log(this.state.data);
  }

  render() {

    const { data } = this.state;

    return (
      <div className="App">
        <Cards data = {data}/>
        <SelectCountry />
        <div>Graph</div>
      </div>
    );
  }
}

export default App;
