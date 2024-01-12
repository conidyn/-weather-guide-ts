import { useEffect, useState } from "react";
import { WeatherApi } from "./API/WeatherApi";
import { Input } from "./components/Input";

type Coordinate = { lat: string | null, lon: string | null };

interface Weather {
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
        console.log(data)
        // Logique à faire pour formater l'objet data et le transformer en objet Weather
        // Logique ...
        // setCurrentWeather({OBJET_FORMATÉ})
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
