import React, { Component } from 'react'
import ApiHandler from '../API/ApiHandler';
import './WeatherWidget.css';
/* Weather Images */
import Cloudy from '../assets/cloudy.png'
import RainLight from '../assets/rain_light.png'
import PartlyCloudy from '../assets/partly_cloudy.png'
import Sunny from '../assets/sunny.png'
import RainAndCloudy from '../assets/rain_s_cloudy.png'

import WeatherWidgetDayItem from './WeatherWidgetDayItem';
import AppDropdown from './AppDropdown';
import VerticalDayItem from './VerticalDayItem';
var moment = require('moment');
class WeatherWidget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cityList: '',
            loading: true,
            err: false,
            errMessage: "Sth goes wrong.",
            choosenCity: [],
            cityWeather: '',
            dropdownOpen: false
        }
    }
    async componentDidMount() {
        await ApiHandler.getCityList()
            .then(cityList => {
                this.setState({
                    cityList,
                    loading: false
                })
            }).catch(err => {
                this.setState({
                    loading: false,
                    err: true
                })
                throw err
            })
        await ApiHandler.getTodayWeather(1)
            .then(cityWeather => {
                this.setState({
                    cityWeather
                })
            })

    }
    handleOpen = () => {
        if (this.state.dropdownOpen) {
            this.setState({
                dropdownOpen: false
            })
        }
        this.setState({
            dropdownOpen: true
        })
    }
    async setChoosenCity(value) {
        console.log("Value", value)
        this.setState({
            choosenCity: value,
            dropdownOpen: false
        })
        await ApiHandler.getTodayWeather(value.id)
            .then(cityWeather => {
                this.setState({
                    cityWeather
                })
            })
    }
    toFarenheit() {
        const { cityWeather } = this.state
        let celcius = cityWeather ? cityWeather[0].temperature : 0
        let farenheit = (celcius * 1.8) + 32
        farenheit = parseInt(farenheit)
        return farenheit
    }
    render() {
        const { cityWeather, cityList, loading } = this.state
        let Weather = cityWeather ? cityWeather[0] : []
        let weatherImage = cityWeather ?
            cityWeather[0].type === "RainAndCloudy" ? RainAndCloudy
                : cityWeather[0].type === "RainLight" ? RainLight
                    : cityWeather[0].type === "Cloudy" ? Cloudy
                        : cityWeather[0].type === "Sunny" ? Sunny
                            : PartlyCloudy
            : Sunny
        console.log(cityWeather)
        return (
            <div>
                {loading ? <div>Loading...</div> :
                    <div>
                        <div className="WeatherWidgetHeader">
                            <div className="WeatherWidgetTitle">
                                <AppDropdown cityList={cityList} onClick={(city) => this.setChoosenCity(city)} />
                                <p>
                                    {
                                        `${moment(Weather.date).format("dddd")}`
                                        + ", "
                                        + `${moment(Weather.date).format("MMMM Do")}`
                                    }
                                </p>
                                <p>{Weather.type}</p>
                            </div>
                            <div className="WeatherWidgetBody">
                                <div className="WeatherWidgetBody__left">
                                    <img src={weatherImage}
                                        alt="This is it"
                                        width="80"
                                        height="80">
                                    </img>
                                    <p>{this.toFarenheit()}</p>
                                    <p>&#x2109;</p>
                                </div>
                                <div className="WeatherWidgetBody__right">
                                    <p>Precipitation: {Weather.precipitation}%</p>
                                    <p>Humidity: {Weather.humidity}%</p>
                                    <p>Wind: {Weather.windInfo ? Weather.windInfo.speed : 0} mph {Weather.windInfo ? Weather.windInfo.direction : "N"} </p>
                                    <p>Pollen Count: {Weather.pollenCount}</p>
                                </div>
                            </div>
                            <div className="WeatherWidgetDaysContainer">
                                {this.state.cityWeather ? this.state.cityWeather.map((oneDayWeather, index) =>
                                    <WeatherWidgetDayItem key={index} weather={oneDayWeather} index={index} />
                                ) : null}
                            </div>
                        </div>
                        {this.state.cityWeather ? this.state.cityWeather.map((oneDayWeather, index) =>
                                <VerticalDayItem key={index} weather={oneDayWeather} index={index} />
                            ) : null}
                        
                    </div>
                }
            </div>
        )
    }
}
export default WeatherWidget;
