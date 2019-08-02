import React, { Component } from 'react';
import './App.css';
import WeatherWidget from './components/WeatherWidget.js';
class App extends Component {
  render() {
    return (
      <div className="App">
        <WeatherWidget />
        <WeatherWidget />
      </div>
    )
  }
}

export default App;
