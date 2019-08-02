import React, { Component } from 'react'
import {toFarenheit} from '../toFarenheit';
import {weatherImageItem} from './getWeatherImage';
import './VerticalDayItem.css'
var moment = require('moment');

export default class VerticalDayItem extends Component {
    render() {
        const { weather, index } = this.props
        return (
            <div className="WeatherWidgetItem">
                <p>{index === 0 ? "Today" : moment(weather.date).format("dddd")}</p>
                <div className="ItemBody">
                    <img src={weatherImageItem(weather)} alt="OMG"></img>
                    <div>
                        <p>{toFarenheit(weather.temperature)}&deg;</p>
                        <p>{toFarenheit(weather.temperature)}&deg;</p>
                    </div>
                    <span>{toFarenheit(weather.temperature)}&deg;</span>
                    <span>{toFarenheit(weather.temperature)}&deg;</span>
                    <p>Pollen {weather.pollenCount}</p>
                </div>
            </div>
        )
    }
}
