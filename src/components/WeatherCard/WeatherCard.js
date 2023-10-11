import "../WeatherCard/WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
//////////////////////////////////////////////////
//import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const WeatherCard = ({ day, type, weatherTemp }) => {
	const imgSrc = weatherOptions.filter((i) => {
		return i.day === day && i.type === type;
	});
	const imgSrcUrl = imgSrc[0]?.url || "";
	const imgSrcType = imgSrc[0].type || "Weather";

	return (
		<section className="weather" id="weather">
			<div className="weather_info">{`${weatherTemp}`}</div>
			<img src={imgSrcUrl} className="weather_image" alt={imgSrcType} />
		</section>
	);
};
export default WeatherCard;
