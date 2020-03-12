import React from 'react';
import './App.css';
import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './app_component/weather.component';
import Form from './app_component/form.component';

const API_KEY = "32b3079ab847125ac3e4bc7d5fa485ef"
// const USAPI_key = "bf41980b3f13f19a064dc35104bb2fdf"

//api.openweathermap.org/data/2.5/weather?q=London,uk

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      latitude: null,
      longitude: null,
      userAddress: null,
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    // this.reverseGeocodeCoordinates = this.reverseGeocodeCoordinates(this);

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"

    };
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15)
    return cell;
  }

  get_WeatherIcon(icons, rangeID) {
    switch (true) {
      case rangeID >= 200 && rangeID <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;

      case rangeID >= 300 && rangeID <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;

      case rangeID >= 500 && rangeID <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;

      case rangeID >= 600 && rangeID <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;

      case rangeID >= 701 && rangeID <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;

      case rangeID === 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;

      case rangeID >= 801 && rangeID <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;

      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }

  }
  //---------------------------
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates,this.handleLocationError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }


  getCoordinates(position) {
    // console.log(position);
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
    // this.reverseGeocodeCoordinates();
  }

  handleLocationError(error){
    switch(error.code){
      case error.PERMISSION_DENIED:
        alert('User denied the request for Geolocation');
        break;
      case error.POSITION_UNAVAILABLE:
        alert('Location information is unavailable');
        break;
      case error.TIMEOUT:
        alert('Request to user location timed out');
        break;
      case error.UNKNOWN_ERROR:
        alert('An unknown error occurred');
        break;
      default:
        alert('An unknown error occurred');
    }
  }

  // reverseGeocodeCoordinates(){
  //   fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&sensor=false&key=${GOOGLE_API_KEY}`)
  //   .then(response => response.json())
  //   // .then(data => console.log(data))
  //   .then(data => this.setState({
  //     userAddress: data.results[0].formatted_address
  //   }))
  //   .then(error => alert(error))
  // }



  getWeather = async (e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
      const response = await api_call.json();

      console.log(response);

      this.setState({
        city: `${response.name},${response.sys.country}`,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
      });

      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
    } else {
      this.setState({ error: true })
    }
  };

  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />

        <div className="w3-display-topleft text-light">
         
          <div className="btn-coords">
            <button className="btn btn-success" onClick={this.getLocation}>Get Coordinated</button>
          </div>
          <p>Latitude: {this.state.latitude}</p>
          <p>Longitude: {this.state.longitude}</p>
          {/* <p>Address: {this.state.userAddress}</p> */}

        </div>
      </div>
    );
  }
}


export default App;
