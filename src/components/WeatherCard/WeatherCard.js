import "../WeatherCard/WeatherCard.css";
import daySun from "../../images/Day/Sun.svg";
import dayCloud from "../../images/Day/Cloud.svg";
import dayFog from "../../images/Day/Fog.svg";
import dayRain from "../../images/Day/Rain.svg";
import daySnow from "../../images/Day/Snow.svg";
import dayStorm from "../../images/Day/Storm.svg";
//////////////////////////////////////////////////
import nightMoon from "../../images/Night/Moon.svg";
import nightCloud from "../../images/Night/Cloud.svg";
import nightFog from "../../images/Night/Fog.svg";
import nightRain from "../../images/Night/Rain.svg";
import nightSnow from "../../images/Night/Snow.svg";
import nightStorm from "../../images/Night/Storm.svg";

//////////////////////////////////////////////////
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const weatherOptions = [
	{ url: daySun, day: true, type: "Sun" },
	{
		url: dayCloud,
		day: true,
		type: "Cloud",
	},
	{ url: dayFog, day: true, type: "Fog" },
	{
		url: dayRain,
		day: true,
		type: "Rain",
	},
	{
		url: daySnow,
		day: true,
		type: "Snow",
	},
	{
		url: dayStorm,
		day: true,
		type: "Storm",
	},
	/////////////////////////////////////////////////////////////
	{
		url: nightMoon,
		day: false,
		type: "Moon",
	},
	{
		url: nightCloud,
		day: false,
		type: "Cloud",
	},
	{
		url: nightFog,
		day: false,
		type: "Fog",
	},
	{
		url: nightRain,
		day: false,
		type: "Rain",
	},
	{
		url: nightSnow,
		day: false,
		type: "Snow",
	},
	{
		url: nightStorm,
		day: false,
		type: "Storm",
	},
];
const WeatherCard = ({ day, type, weatherTemp }) => {
	const imgSrc = weatherOptions.filter((i) => {
		return i.day === day && i.type === type;
	});
	const imgSrcUrl = imgSrc[0].url || "";
	const imgSrcType = imgSrc[0].type || "Weather";

	return (
		<section className="weather" id="weather">
			<div className="weather_info">{`${weatherTemp}`}</div>
			<img src={imgSrcUrl} className="weather_image" alt={imgSrcType} />
		</section>
	);
};

export default WeatherCard;
