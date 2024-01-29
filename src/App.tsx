import { useEffect, useState } from "react";
import { Input } from "./components/Input";
import { WeatherCard } from "./components/WeatherCard";
import { WeatherApi } from "./API/WeatherApi";
import { CurrentWeather, DailyWeather, Coordinate } from "./types";


export const App = () => {
  const [cityInput, setCityInput] = useState<string>("");
  const [coordinate, setCoordinate] = useState<Coordinate>({ lat: null, lon: null });
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [dailyWeather, setDailyWeather] = useState<any>([])

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
        const mercredi = [];
        const jeudi = []
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
            case 0: {
              return result;
              break;
            }
            case 1:
              break;
            case 2:
              break;
            case 3: {
              mercredi.push(result)
              break;
            }
            case 4:
              jeudi.push(result)
              break;
            case 5:

              break;
            case 6:

              break;

            default:
              break;
          }
          // console.log(result);
        })
        setDailyWeather([mercredi, jeudi])
      })
    }
  }, [coordinate])

  if (dailyWeather.length > 0) console.log(dailyWeather);
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





