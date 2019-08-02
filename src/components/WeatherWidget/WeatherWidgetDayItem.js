import React, { Component } from 'react'
import {toFarenheit} from '../toFarenheit';
import {weatherImageItem} from './getWeatherImage';
var moment = require('moment');
class WeatherWidgetDayItem extends Component {
    render() {
        const { weather, index } = this.props
        return (
            <div className="DayItem">
                <p>{index === 0 ? "Today" : moment(weather.date).format("dddd")}</p>
                <img src={weatherImageItem(weather)} alt="Weather"></img>
                <div>
                    <p>{toFarenheit(weather.temperature)}&deg;</p>
                    <p>{toFarenheit(weather.temperature)}&deg;</p>
                </div>
                <p>Pollen {weather.pollenCount}</p>
            </div>
        )
    }
}
export default WeatherWidgetDayItem;