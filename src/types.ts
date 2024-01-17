export interface Weather {
    cityName: string;
    temp: number;
    feelsLike: number;
    state: string;
    id: number,
}

export type Coordinate = { lat: string | null, lon: string | null };
