//import "./Main.css";
import { React } from "react";
//import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

//import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Profile({ onSelectCard }) {
	return (
		<div>
			<section className="profile-sidebar"></section>
			<div className="profile-clothes">
				<section className="card_section">
					<div className="card_items">
						{defaultClothingItems.map((x) => (
							<ItemCard item={x} onSelectCard={onSelectCard} key={x._id} />
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
export default Profile;
