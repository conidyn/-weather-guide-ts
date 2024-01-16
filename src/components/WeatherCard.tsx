import { Weather } from "../App"

export interface WeatherCardProps {
    currentWeather: Weather;
    deleteCity: () => void;
}

export const WeatherCard = ({ currentWeather, deleteCity }: WeatherCardProps) => {

    return (
        <div>
            <h1 className="header-card">{`${currentWeather.cityName}`}</h1>
            <ul>
                <li>{`temperature: ${currentWeather.temp}`}</li>
                <li>{`ressenti: ${currentWeather.feelsLike}`}</li>
                <li>{`ciel: ${currentWeather.state}`}</li>
            </ul>
            <button id={`remove${currentWeather.cityName}`} className='delete-btn' onClick={deleteCity}>x</button>
        </div>
    )
}