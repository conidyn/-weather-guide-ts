import { useEffect, useState } from "react";
import { WeatherApi } from "./API/WeatherApi";
import { Input } from "./components/Input";
import { WHEATER_URL } from "./API/WeatherApi";
import { GEO_URL } from "./API/WeatherApi";
type Coordinate = { lat: string | null, lon: string | null };

export interface Weather {
  cityName: string;
  temp: number;
  feelsLike: number;
  state: string;
}

export const App = () => {
  const [cityInput, setCityInput] = useState<string>("");
  const [coordinate, setCoordinate] = useState<Coordinate>({ lat: null, lon: null });
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);
  
  const handleChangeInput = (value: string) => setCityInput(value);

  const handleSubmit = () => {
    WeatherApi.getLatLonByCityName(cityInput).then(([{ lat, lon }]) => {
      setCoordinate({ lat, lon })
    })
  };

  useEffect(() => {
    if (coordinate.lat && coordinate.lon) {
      WeatherApi.getCurrentWeather(coordinate.lat, coordinate.lon).then((data) => {
      const weatherFormatted: Weather = {
        temp: Math.trunc(data.main.temp),
        feelsLike: Math.trunc(data.main.feels_like),
        cityName: data.name,
        state: data.weather[0].main
      }
        setCurrentWeather(weatherFormatted)
      })
    }
  }, [coordinate])

  return (
    <>
      <h1>Weather App</h1>
      <div>
        <Input value={cityInput} handleChange={handleChangeInput} handleSubmit={handleSubmit} />
      </div>
    </>

  )
}
