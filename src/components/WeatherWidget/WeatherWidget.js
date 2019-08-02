import React, { Component } from 'react'
import ApiHandler from '../../API/ApiHandler';
import './WeatherWidget.css';
import {toFarenheit} from '../toFarenheit';
import {weatherImage} from './getWeatherImage';
import WeatherWidgetDayItem from './WeatherWidgetDayItem';
import AppDropdown from '../AppDropdown';
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
    render() {
        const { cityWeather, cityList, loading } = this.state
        let weather = cityWeather ? cityWeather[0] : []
        return (
            <div>
                {loading ? <div>Loading...</div> :
                    <div>
                        <div className="WeatherWidgetHeader">
                            <div className="WeatherWidgetTitle">
                                <AppDropdown cityList={cityList} onClick={(city) => this.setChoosenCity(city)} />
                                <p>{`${moment(weather.date).format("dddd")}, ${moment(weather.date).format("MMMM Do")}`}</p>
                                <p>{weather.type}</p>
                            </div>
                            <div className="WeatherWidgetBody">
                                <div className="WeatherWidgetBody__left">
                                    <img src={weatherImage(cityWeather)}
                                        alt="This is it"
                                        width="80"
                                        height="80">
                                    </img>
                                    <p>{toFarenheit(weather.temperature)}</p>
                                    <p>&#x2109;</p>
                                </div>
                                <div className="WeatherWidgetBody__right">
                                    <p>Precipitation: {weather.precipitation}%</p>
                                    <p>Humidity: {weather.humidity}%</p>
                                    <p>Wind: {weather.windInfo ? weather.windInfo.speed : 0} mph {weather.windInfo ? weather.windInfo.direction : "N"} </p>
                                    <p>Pollen Count: {weather.pollenCount}</p>
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
