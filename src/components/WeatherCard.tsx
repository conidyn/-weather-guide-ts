import { CurrentWeather } from "../types/weatherType"

export interface WeatherCardProps {
    currentWeather: CurrentWeather;
    deleteCity: () => void;
    // dailyWeather: DailyWeather | Record<string, never>;
}

export const WeatherCard = ({ currentWeather, deleteCity }: WeatherCardProps) => {

    return (
        <div>
            <h1 className="header-card">{`${currentWeather.cityName}`}</h1>
            <ul>
                <li>{`temperature: ${currentWeather.temp}`}</li>
                <li>{`feeling: ${currentWeather.feelsLike}`}</li>
                <li>{`sky: ${currentWeather.state}`}</li>
            </ul>
            <button id={`remove${currentWeather.cityName}`} className='delete-btn' onClick={deleteCity}>x</button>
        </div>

    )
}