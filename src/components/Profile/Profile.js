import "./Profile.css";
import { React } from "react";
//import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import SideBar from "../SideBar/SideBar";
import { defaultClothingItems } from "../../utils/constants";

//import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Profile({ onSelectCard, onCreateModal }) {
	return (
		<div className="profile">
			<SideBar />

			<div className="profile-clothes">
				<section className="card_section card_items-profile">
					<div className="card__section-header">
						Your items
						<button
							type="text"
							onClick={onCreateModal}
							className="header__button card__section-header-button"
						>
							+ Add new
						</button>
					</div>
					<div className="card_items ">
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
