import React, { Component } from 'react'

/* Weather Images */
import Cloudy from '../assets/cloudy.png'
import RainLight from '../assets/rain_light.png'
import PartlyCloudy from '../assets/partly_cloudy.png'
import Sunny from '../assets/sunny.png'
import RainAndCloudy from '../assets/rain_s_cloudy.png'

var moment = require('moment');
export default class VerticalDayItem extends Component {
    toFarenheit() {
        const { weather } = this.props
        let celcius = weather ? weather.temperature : 0
        let farenheit = (celcius * 1.8) + 32
        farenheit = parseInt(farenheit)
        return farenheit
    }
    render() {
        const { weather, index } = this.props
        let weatherImage = weather ?
            weather.type === "RainAndCloudy" ? RainAndCloudy
                : weather.type === "RainLight" ? RainLight
                    : weather.type === "Cloudy" ? Cloudy
                        : weather.type === "Sunny" ? Sunny
                            : PartlyCloudy
            : Sunny
        return (
            <div className="WeatherWidgetItem">
                <p>{index === 0 ? "Today" : moment(weather.date).format("dddd")}</p>
                <div className="ItemBody">
                    <img src={weatherImage} alt="OMG"></img>
                    <div>
                        <p>{this.toFarenheit(weather.temperature)}&deg;</p>
                        <p>{this.toFarenheit(weather.temperature)}&deg;</p>
                    </div>
                    <span>{this.toFarenheit(weather.temperature)}&deg;</span>
                    <span>{this.toFarenheit(weather.temperature)}&deg;</span>
                    <p>Pollen {weather.pollenCount}</p>
                </div>
            </div>
        )
    }
}
