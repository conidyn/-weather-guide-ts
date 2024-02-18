import { DailyWeather, Day } from "../types/weatherType"

export interface DailyWeatherProps {
    dailyWeather: DailyWeather | Record<string, never>;
    // key:  string;
    value: Day;
}

export const DailyWeatherCard = ({ value }: DailyWeatherProps) => {

    return (
        <div>
            <ul>
                <li>
                    {`average temperature of the day: ${value.temp_average}°`}
                </li>
                <li>
                    {`temperature max: ${value.temp_max}°`}
                </li>
                <li>
                    {`temperature min: ${value.temp_min}°`}
                </li>
                <li>
                    {`feeling: ${value.feelsLike}`}
                </li>
                <li>
                    {`sky: ${value.description}`}
                </li>
            </ul>

        </div>
    )
}