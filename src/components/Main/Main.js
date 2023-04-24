import "./Main.css";
import { React, useMemo } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherTemp, onSelectCard, clothingItems }) {
	const getWeatherType = useMemo(() => {
		if (weatherTemp >= 86) {
			return "hot";
		} else if (weatherTemp >= 66 && weatherTemp <= 85) {
			return "warm";
		} else if (weatherTemp <= 65) {
			return "cold";
		}
	}, [weatherTemp]);

	const filteredCards = clothingItems.filter((item) => {
		return item.weather.toLowerCase() === getWeatherType;
	});
	console.log(weatherTemp);
	return (
		<main className="main">
			<WeatherCard day={true} type="Storm" weatherTemp={weatherTemp} />
			<section className="card_section" id="card-section">
				<p>Today is {weatherTemp} / You may want to wear: </p>
				<div className="card_items">
					{filteredCards.map((x) => (
						<ItemCard item={x} onSelectCard={onSelectCard} key={x._id} />
					))}
				</div>
			</section>
		</main>
	);
}

export default Main;
