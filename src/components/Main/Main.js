import "./Main.css";
import { React, useMemo } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ClothesSection from "../ClothesSection/ClothesSection";

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
		return item.weather === weatherType;
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
				<ClothesSection cards={filteredCards} onSelectCard={onSelectCard} />
			</section>
		</main>
	);
}

export default Main;
