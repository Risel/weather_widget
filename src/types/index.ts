export interface Weather {
  temperature: number;
  description: string;
}

export interface City {
  id: number;
  name: string;
  weather: Weather;
}
