import { useEffect, useState } from "react";
import { WeatherApi } from "./API/WeatherApi";
import { Input } from "./components/Input";


export const App = () => {
  const [input, setInput] = useState<string>();
  const lat = "50.6324127197283";
  const lon = "5.568375721181737";

  const handleChangeInput = (value: string) => setInput(value)

  useEffect(() => {
    WeatherApi.getCurrentWeather(lat, lon).then((data) => console.log(data))
  }, [])


  return (
    <>
      <h1>Weather App</h1>
      <div>
        <Input value={input} handleChange={handleChangeInput} />
      </div>
    </>

  )
}
