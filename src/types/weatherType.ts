export type DailyWeather = {
    [ K in Days]: Day
  };

export interface CurrentWeather { 
    cityName?: string;
    temp: number;
    feelsLike: number;
    state?: string;
    id: string;
    dt_txt?: Date;
    day_txt?: string;
    dt?: number;
}

export interface Day {
    dt: number;
    dt_txt: string;
    id: string;
    temp: number;
    temp_max: number;
    temp_min: number;
    feelsLike: number;
    main_description: string;
    description: string;
    temp_average?: number;
  }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Days = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
export type Coordinate = { lat: string | null, lon: string | null };
