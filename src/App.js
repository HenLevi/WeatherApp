import React, { Component } from 'react';
// import React from 'react';

import xhr from 'xhr';
import './css/App.css';
import './css/font-awesome.css';



class App extends React.Component {
 state = {
    location: '',
    data: {}
  };

  fetchData = (evt) => {
    evt.preventDefault();

    var location = encodeURIComponent(this.state.location);
    var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    var urlSuffix = '&APPID=61b935f622c15e73e1626d2c9f3f5ece&units=metric';
    var url = urlPrefix + location + urlSuffix;
    var self = this;
    xhr({
      url: url
    }, function (err, data) {
      self.setState({
        data: JSON.parse(data.body)
      });
    });
  };

  changeLocation = (evt) => {
    this.setState({
      location: evt.target.value
    });
  };

  render() {
    var currentTemp = '';
    var currentSpeed = '';
    var currentDescription = '';
    var currentHumidity = '';
 



    if (this.state.data.list) {

      currentTemp = this.state.data.list[0].main.temp;
      currentDescription = this.state.data.list[0].weather[0].description;
      currentSpeed = this.state.data.list[0].wind.speed;
      currentHumidity = this.state.data.list[0].main.humidity;
    }
    return (
      <div className="App">
        <header className="App-header">

          <h1 className="App-title">Weather Applicaion</h1>


          <form onSubmit={this.fetchData}  >
           <label >I want to know the weather for:
            <i className="fa fa-map-marker fa-2x locationColor" aria-hidden="true"></i>
            <input
              placeholder={"City"}
              type="text"
              value={this.state.location}
              onChange={this.changeLocation}
            />
           </label>
          </form>

        </header>



  
        <p className="temp-wrapper">
           <span className="wrapper" > The temperature is:</span>
          <span className="temp"><strong >{ currentTemp }°C</strong></span>           
        </p>

        <p className="wrapper">
           <span> The speed is:</span>
           <span >{ currentSpeed }</span>
           <span > m/s</span>
        </p>

        <p className="wrapper">
           <span> The description is:</span>
           <span >{ currentDescription }</span>
        </p>

        <p className="wrapper">
           <span> The humidity is:</span>
           <span >{ currentHumidity }</span>
           <span > %</span>
        </p>


      </div>
    );
  }
}


export default App;
