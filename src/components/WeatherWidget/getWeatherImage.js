module.exports = {
    weatherImage(cityWeather) {
        let Image = cityWeather ?
            cityWeather[0].type === "RainAndCloudy" ? require('../../assets/rain_s_cloudy.png')
                : cityWeather[0].type === "RainLight" ? require('../../assets/rain_light.png')
                    : cityWeather[0].type === "Cloudy" ? require('../../assets/cloudy.png')
                        : cityWeather[0].type === "Sunny" ? require('../../assets/sunny.png')
                            : require('../../assets/partly_cloudy.png')
            : require('../../assets/sunny.png')
        return Image
    },
    weatherImageItem(cityWeather) {
        let Image = cityWeather ?
            cityWeather.type === "RainAndCloudy" ? require('../../assets/rain_s_cloudy.png')
                : cityWeather.type === "RainLight" ? require('../../assets/rain_light.png')
                    : cityWeather.type === "Cloudy" ? require('../../assets/cloudy.png')
                        : cityWeather.type === "Sunny" ? require('../../assets/sunny.png')
                            : require('../../assets/partly_cloudy.png')
            : require('../../assets/sunny.png')
        return Image
    }
}