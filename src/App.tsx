import { useEffect, useState } from "react";
import { Input } from "./components/Input";
import { WeatherCard } from "./components/WeatherCard";
import { WeatherApi } from "./API/WeatherApi";
import { CurrentWeather, DailyWeather, Coordinate } from "./types";


export const App = () => {
  const [cityInput, setCityInput] = useState<string>("");
  const [coordinate, setCoordinate] = useState<Coordinate>({ lat: null, lon: null });
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [dailyWeather, setDailyWeather] = useState<any>(null)

  const handleChangeInput = (value: string) => setCityInput(value);

  const handleSubmit = () => {
    if (cityInput) {
      WeatherApi.getLatLonByCityName(cityInput).then(([{ lat, lon }]) => {
        setCoordinate({ lat, lon })
      })
      setCityInput("")
      setDailyWeather([]);
    }
  };

  const deleteCity = () => {
    setCurrentWeather(null);
    setCoordinate({ lat: null, lon: null });
  }


  // pour destucturer objet style data plus bas faire (({})) et mettre les proprieter destructurer seulement (({main, weather, name}))
  useEffect(() => {
    if (coordinate.lat && coordinate.lon) {
      WeatherApi.getCurrentWeather(coordinate.lat, coordinate.lon).then((data) => {
        const weatherFormatted: CurrentWeather = {
          temp: Math.trunc(data.main.temp),
          feelsLike: Math.trunc(data.main.feels_like),
          cityName: data.name,
          state: data.weather[0].main,
          id: data.id,
        }
        setCurrentWeather(weatherFormatted)
      })

      WeatherApi.getDailyWeather(coordinate.lat, coordinate.lon).then(({ list }) => {
        const week = {
          sunday: [],
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
        }
        list.forEach((item) => {
          // LOGIQUE POUR FILTRER PAR JOUR

          const currentDay = new Date(item.dt_txt).getDay();

          const result = {
            dt: item.dt,
            dt_txt: item.dt_txt,
            id: item.weather[0].id,
            temp: item.main?.temp,
            temp_max: item.main?.temp_max,
            temp_min: item.main?.temp_min,
            feels_like: item.main?.feels_like,
            main_description: item.weather[0].main,
            description: item.weather[0].main,
          }
          // on utilise le set dailyWeather afin de mettre les element result dans un tableau ci dessous
          switch (currentDay) {
            case 0:
              week.sunday.push(result)
              break;
            case 1:
              week.monday.push(result)
              break;
            case 2:
              week.tuesday.push(result)
              break;
            case 3:
              week.wednesday.push(result)
              break;
            case 4:
              week.thursday.push(result)
              break;
            case 5:
              week.friday.push(result)
              break;
            case 6:
              week.saturday.push(result)
              break;
            default:
              break;
          }
        })
        // next step : formater week pour n'avoir qu'un seul objet au lieu d'un array pour une journée
        setDailyWeather(week)
      })
    }
  }, [coordinate])

  if (dailyWeather) console.log(dailyWeather);
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





