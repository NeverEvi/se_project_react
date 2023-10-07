import "./Profile.css";
//import { React } from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useContext } from "react";

function Profile({ cards, onSelectCard, onCreateModal, onEditProfileModal }) {
	const { user } = useContext(CurrentUserContext);

	const filteredCards = cards.filter((item) => {
		return item.owner === user._id;
	});

	return (
		<div className="profile">
			<SideBar onEditProfileModal={onEditProfileModal} />

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
					<ClothesSection>
						{filteredCards.map((x, i) => (
							<ItemCard item={x} onSelectCard={onSelectCard} key={i} />
						))}
					</ClothesSection>
				</section>
			</div>
		</div>
	);
}
export default Profile;
