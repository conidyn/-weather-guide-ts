const API_KEY: string = "227227b0bd1b50ea9ffa6e7be4016965";
const BASE_URL: URL = new URL("https://api.openweathermap.org/data/2.5/weather");

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
export const WeatherApi = {
    getCurrentWeather: async (lat: string, lon: string) => {
        const getCurrentWeatherUrl = BASE_URL;
        getCurrentWeatherUrl.searchParams.append('lat', lat);
        getCurrentWeatherUrl.searchParams.append('lon', lon);
        getCurrentWeatherUrl.searchParams.append('units', "metric");
        getCurrentWeatherUrl.searchParams.append('appid', API_KEY);

        try {
            const res = await fetch(getCurrentWeatherUrl);
            const currentWeather = await res.json();
            console.log(currentWeather);
        } catch (e) {
            console.error(e)
        }
    },
//     getDailyWeather: async (lat: string, lon: string) => {}
}
