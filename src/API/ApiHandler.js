import axios from 'axios';

export default class ApiHandler {
    static getAxios(baseURL) {
        return axios.create({
            baseURL: baseURL || 'http://dev-weather-api.azurewebsites.net/api/'
        })
    }

    static getCityList = async () => {
        try {
            let apiResponse = await ApiHandler.getAxios().get("city")
            return apiResponse.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static getTodayWeather = async (cityId) => {
        let date = new Date().toISOString()
        console.log("city/" + cityId + "/weather?date=" + date.slice(0, 10))
        try {
            let apiResponse = await ApiHandler.getAxios().get("city/" + cityId + "/weather?date=" + date.slice(0, 10))
            return apiResponse.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}