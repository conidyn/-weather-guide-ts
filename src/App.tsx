import { useEffect, useState } from "react";
import { Input } from "./components/Input";
import { WeatherCard } from "./components/WeatherCard";
import { WeatherApi } from "./API/WeatherApi";
import { DailyWeather, CurrentWeather, Day, Days, Coordinate } from "./types/weatherType";
import { RawWeatherList } from "./types/rawWeatherType";
// []
type Week = {
  [K in Days]: Array<Day> | []
}

export const App = () => {
  const [cityInput, setCityInput] = useState<string>("");
  const [coordinate, setCoordinate] = useState<Coordinate>({ lat: null, lon: null });
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [dailyWeather, setDailyWeather] = useState<DailyWeather | Record<string, never>>({})

  const handleChangeInput = (value: string) => setCityInput(value);

  const handleSubmit = () => {
    if (cityInput) {
      WeatherApi.getLatLonByCityName(cityInput).then(([{ lat, lon }]) => {
        setCoordinate({ lat, lon })
      })
      setCityInput("")
      setDailyWeather({});
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
        const week: Week = {
          sunday: [],
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
        }
        list.forEach((item: RawWeatherList) => {
          // console.log(JSON.stringify(item));
          // LOGIQUE POUR FILTRER PAR JOUR

          const currentDay = new Date(item.dt_txt).getDay();
          // Omit<Day, "temp_average"
          const result: Day = {
            dt: item.dt,
            dt_txt: item.dt_txt,
            id: item.weather[0].id,
            temp: item.main?.temp,
            temp_max: item.main?.temp_max,
            temp_min: item.main?.temp_min,
            feelsLike: item.main?.feels_like,
            main_description: item.weather[0].main,
            description: item.weather[0].main,
          }

          switch (currentDay) {
            case 0:
              // if(week.sunday.length > 0) {
              // week.sunday.push(result) as []Omit<Day, "temp_average">
              // @ts-expect-error: Object is possibly 'null'.

              week.monday.push(result)

              break;
            case 1:
              // @ts-expect-error: Object is possibly 'null'.
              week.tuesday.push(result)
              break;
            case 2:
              // @ts-expect-error: Object is possibly 'null'.
              week.wednesday.push(result)
              break;
            case 3:
              // @ts-expect-error: Object is possibly 'null'.
              week.thursday.push(result)
              break;
            case 4:
              // @ts-expect-error: Object is possibly 'null'.
              week.friday.push(result)
              break;
            case 5:
              // @ts-expect-error: Object is possibly 'null'.
              week.saturday.push(result)
              break;
            case 6:
              // @ts-expect-error: Object is possibly 'null'.
              week.sunday.push(result)
              break;
            default:
              break;
          }
        })
        // syntax object vide mais qui a comme cler string (generic)
        const formattedObject: DailyWeather | Record<string, never> = {}
        for (const [key, value] of Object.entries(week)) {
          if (value.length > 0) {
            let temp_average = 0;
            const newObj: Omit<Day, "temp_average"> = value.reduce((acc, current) => {
              temp_average += current.temp
              if (current.temp_min < acc.temp_min) acc = { ...acc, temp_min: current.temp_min }
              if (current.temp_max > acc.temp_max) acc = { ...acc, temp_max: current.temp_max }
              return acc
            })

            // @ts-expect-error: Object is possibly 'null'
            formattedObject[key] = { ...newObj, temp_average: Math.round(temp_average / value.length) };
          }
        }

        setDailyWeather(formattedObject)
        // console.log(JSON.stringify(week));
        // console.log(dailyWeather);
      })
    }
  }, [coordinate])
  console.log(dailyWeather);
  return (
    <>
      <h1>Weather App</h1>
      <div>
        <Input value={cityInput} handleChange={handleChangeInput} handleSubmit={handleSubmit} />
        {currentWeather && <WeatherCard currentWeather={currentWeather} deleteCity={deleteCity} />}
        {Object.keys(dailyWeather).length > 0 && (
          <>
            {Object.entries(dailyWeather).map(([key, value]) => (
              <div key={value.id}>
                <p>{key}</p>
                <p>{JSON.stringify(value)}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  )
}





