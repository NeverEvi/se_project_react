//
//https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
//
const latitude = 40.75;
const longitude = -86.36;
export const APIkey = "fda856bbaa683549b71afb07deb6cbe8";
export const getForecastWeather = () => {
	const weatherApi = fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
	).then((res) => {
		if (res.ok) {
			return res.json();
		} else {
			return Promise.reject(`Error: ${res.status}`);
		}
	});
	return weatherApi;
};

export const parseWeatherData = (data) => {
	const main = data.main;
	const temperature = main && main.temp;
	console.log(data.main.temp);
	console.log(temperature);

	return Math.ceil(data.main.temp);
};

export const parseLocationData = (data) => {
	const location = data.name;
	return location;
};
