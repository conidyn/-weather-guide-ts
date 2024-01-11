import { useEffect } from "react";
import { WeatherApi } from "./API/WeatherApi";

export const App = () => {
    const lat = "50.6324127197283";
    const lon = "5.568375721181737";
    useEffect(() => {
      WeatherApi.getCurrentWeather(lat, lon).then((data) => console.log(data))
    }, [])
  return (
    <h1>Weather App</h1>
  )
}
