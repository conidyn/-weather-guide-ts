import { useEffect, useState } from "react";
import { WeatherApi } from "./API/WeatherApi";
import { Input } from "./components/Input";
import { WeatherCard } from "./components/WeatherCard";
import { Weather, Coordinate } from "./types";

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

  // pour destucturer objet style data plus bas faire (({})) et mettre les proprieter destructurer seulement (({main, weather, name}))
  useEffect(() => {
    if (coordinate.lat && coordinate.lon) {
      WeatherApi.getCurrentWeather(coordinate.lat, coordinate.lon).then((data) => {
        const weatherFormatted: Weather = {
          temp: Math.trunc(data.main.temp),
          feelsLike: Math.trunc(data.main.feels_like),
          cityName: data.name,
          state: data.weather[0].main,
          id: data.id,
        }
        setCurrentWeather(weatherFormatted)
      })
    }
  }, [coordinate])

  const deleteCity = () => {
    setCurrentWeather(null);
    setCoordinate({ lat: null, lon: null });
  }

  return (
    <>
      <h1>Weather App</h1>
      <div>
        <Input value={cityInput} handleChange={handleChangeInput} handleSubmit={handleSubmit} />
        {currentWeather && <WeatherCard currentWeather={currentWeather} deleteCity={deleteCity} />}
      </div>
    </>
  )
}
