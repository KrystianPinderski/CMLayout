module.exports={
    toFarenheit(weather) {
        let celcius = weather
        let farenheit = (celcius * 1.8) + 32
        farenheit = parseInt(farenheit)
        return farenheit
    }
}