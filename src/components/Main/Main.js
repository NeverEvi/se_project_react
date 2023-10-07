import "./Main.css";
import { React, useMemo } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ClothesSection from "../ClothesSection/ClothesSection";
import ItemCard from "../ItemCard/ItemCard";
//import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
function Main({
	weatherTemp,
	weatherType,
	onSelectCard,
	clothingItems,
	currentTemperatureUnit,
}) {
	const weatherCategory = useMemo(() => {
		if (weatherTemp >= 75) return "hot";
		if (weatherTemp <= 55) return "cold";
		return "warm";
	}, [weatherTemp]);
	const temps = {
		F: `${Math.round(weatherTemp)}°F`,
		C: `${Math.round(((weatherTemp - 32) * 5) / 9)}°C`,
	};
	const filteredCards = clothingItems.filter((item) => {
		return item.weather === weatherCategory;
	});

	return (
		<main className="main">
			<WeatherCard
				day={true}
				type={weatherType}
				weatherTemp={temps[currentTemperatureUnit]}
			/>
			<section className="card_section" id="card-section">
				<p>Today is {temps[currentTemperatureUnit]} / You may want to wear: </p>
				<ClothesSection>
					{filteredCards.map((x, i) => (
						<ItemCard item={x} onSelectCard={onSelectCard} key={i} />
					))}
				</ClothesSection>
			</section>
		</main>
	);
}

export default Main;
