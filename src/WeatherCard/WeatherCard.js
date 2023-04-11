import "./WeatherCard.css";
const weatherOptions = [
	{ url: require("../images/Day/Sun.svg").default, day: true, type: "Sun" },
	{ url: require("../images/Day/Cloud.svg").default, day: true, type: "Cloud" },
	{ url: require("../images/Day/Fog.svg").default, day: true, type: "Fog" },
	{ url: require("../images/Day/Rain.svg").default, day: true, type: "Rain" },
	{ url: require("../images/Day/Snow.svg").default, day: true, type: "Snow" },
	{ url: require("../images/Day/Storm.svg").default, day: true, type: "Storm" },
	/////////////////////////////////////////////////////////////
	{
		url: require("../images/Night/Moon.svg").default,
		day: false,
		type: "Moon",
	},
	{
		url: require("../images/Night/Cloud.svg").default,
		day: false,
		type: "Cloud",
	},
	{ url: require("../images/Night/Fog.svg").default, day: false, type: "Fog" },
	{
		url: require("../images/Night/Rain.svg").default,
		day: false,
		type: "Rain",
	},
	{
		url: require("../images/Night/Snow.svg").default,
		day: false,
		type: "Snow",
	},
	{
		url: require("../images/Night/Storm.svg").default,
		day: false,
		type: "Storm",
	},
];

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
	const imgSrc = weatherOptions.filter((i) => {
		return i.day === day && i.type === type;
	});
	const imgSrcUrl = imgSrc[0].url || "";
	const imgSrcType = imgSrc[0].type || "Weather";

	return (
		<section className="weather" id="weather">
			<div className="weather_info">{weatherTemp} °F</div>
			<img src={imgSrcUrl} className="weather_image" alt={imgSrcType} />
		</section>
	);
};

export default WeatherCard;
