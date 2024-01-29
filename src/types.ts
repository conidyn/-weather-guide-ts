export interface CurrentWeather { 
    cityName?: string;
    temp: number;
    feelsLike: number;
    state: string;
    id: string;
    dt_txt?: Date;
    day_txt?: string;
    dt?: number;
}

export interface DailyWeather extends CurrentWeather {
    dailyWeather: [
         Days: { 
            average_temperature: string;
            minima_temperature: string;
            maxima_temperature: string;
            description?: string;
         
        }
    ]
}


// const monObj = {
//     cityName: "Liege";
//     temp: "4";
//     feelsLike: "0";
//     state: "cloud"
//     id: "sdvfzfd";
//     dt_txt: "01/01/1970";
//     day_txt: "lundi";
//     dailyWeather: [
//         {
//             "lundi": {
//                 average_temperature: string;
//                 minima_temperature: string;
//                 maxima_temperature: string;
//                 description?: string;
//             }
//         }
//     ]
// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Days = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
export type Coordinate = { lat: string | null, lon: string | null };
