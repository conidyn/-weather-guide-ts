const API_KEY: string = "227227b0bd1b50ea9ffa6e7be4016965";
export const WHEATER_URL: string = "https://api.openweathermap.org/data/2.5/weather";
export const GEO_URL: string  = "http://api.openweathermap.org/geo/1.0/direct";

export const WeatherApi = {
    getCurrentWeather: async (lat: string, lon: string) => {
        const currentWeatherUrl: URL = new URL(WHEATER_URL);
        currentWeatherUrl.searchParams.append('lat', lat);
        currentWeatherUrl.searchParams.append('lon', lon);
        currentWeatherUrl.searchParams.append('units', "metric");
        currentWeatherUrl.searchParams.append('appid', API_KEY);
        
        try {
            const res = await fetch(currentWeatherUrl);
            const currentWeather = await res.json();
            return currentWeather;
        } catch (e) {
            console.error(e)
        }
    },
    getLatLonByCityName: async (city: string) => {
        const geoUrl: URL = new URL(GEO_URL);
        geoUrl.searchParams.append('q', city);
        geoUrl.searchParams.append('appid', API_KEY);

        try {
            const res = await fetch(geoUrl);
            const cityData = await res.json()
            return cityData;
            
        } catch (e) {
           console.error(e);
        } 
    }
//    getDailyWeather: async (lat: string, lon: string) => {}
}
