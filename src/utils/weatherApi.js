//
//https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
//
import { request } from "./api";
const latitude = 40.75;
const longitude = -86.36;
export const APIkey = "fda856bbaa683549b71afb07deb6cbe8";
export const getForecastWeather = () => {
	const weatherApi = request(
		`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
	);
	return weatherApi;
};

export const parseWeatherData = (data) => {
	const main = data.main;
	const temperature = main && main.temp;
	return temperature;
};
export const parseWeatherType = (data) => {
	const weatherType = data.weather[0].main;
	return weatherType;
};
export const parseLocationData = (data) => {
	const location = data.name;
	return location;
};
