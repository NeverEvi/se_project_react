import "./Main.css";
import { React, useMemo } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ClothesSection from "../ClothesSection/ClothesSection";
import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherTemp, onSelectCard, clothingItems }) {
	const { currentTemperatureUnit, handleToggleSwitchChangeChange } = useContext(
		CurrentTemperatureUnitContext
	);
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
			<CurrentTemperatureUnitContext.Provider
				value={{ currentTemperatureUnit, handleToggleSwitchChangeChange }}
			>
				<WeatherCard
					day={true}
					type="Storm"
					weatherTemp={temps[currentTemperatureUnit]}
				/>
				<section className="card_section" id="card-section">
					<p>
						Today is {temps[currentTemperatureUnit]} / You may want to wear:{" "}
					</p>
					<ClothesSection>
						{filteredCards.map((x) => (
							<ItemCard item={x} onSelectCard={onSelectCard} key={x.id} />
						))}
					</ClothesSection>
				</section>
			</CurrentTemperatureUnitContext.Provider>
		</main>
	);
}

export default Main;
