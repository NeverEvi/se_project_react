import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../util/constants";
import { useMemo } from "react";

function Main({ weatherTemp, onSelectCard }) {
	const weatherType = useMemo(() => {
		if (weatherTemp >= 86) {
			return "hot";
		} else if (weatherTemp >= 66 && weatherTemp <= 85) {
			return "warm";
		} else if (weatherTemp <= 65) {
			return "cold";
		}
	}, [weatherTemp]);

	const filteredCards = defaultClothingItems.filter((item) => {
		return item.weather.toLowerCase() === weatherType;
	});

	return (
		<main className="main">
			<WeatherCard day={true} type="Storm" weatherTemp={weatherTemp} />
			<section className="card_section" id="card-section">
				Today is {weatherTemp} °F / You may want to wear:
				<div className="card_items">
					{filteredCards.map((x) => (
						<ItemCard item={x} onSelectCard={onSelectCard} />
					))}
				</div>
			</section>
		</main>
	);
}

export default Main;
