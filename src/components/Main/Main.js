import "./Main.css";
import { React, useMemo } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({
	weatherTemp,
	onSelectCard,
	clothingItems,
	currentTemperatureUnit,
}) {
	const weatherType = useMemo(() => {
		if (weatherTemp >= 80) {
			return "hot";
		} else if (weatherTemp >= 55 && weatherTemp <= 80) {
			return "warm";
		} else if (weatherTemp <= 55) {
			return "cold";
		}
	}, [weatherTemp]);
	const temps = {
		F: `${Math.round(weatherTemp)}°F`,
		C: `${Math.round(((weatherTemp - 32) * 5) / 9)}°C`,
	};
	const filteredCards = clothingItems.filter((item) => {
		return item.weather.toLowerCase() === weatherType;
	});
	return (
		<main className="main">
			<WeatherCard
				day={true}
				type="Storm"
				weatherTemp={temps[currentTemperatureUnit]}
			/>
			<section className="card_section" id="card-section">
				<p>Today is {temps[currentTemperatureUnit]} / You may want to wear: </p>
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
