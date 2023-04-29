import "./Profile.css";
import { React } from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import ItemCard from "../ItemCard/ItemCard";

function Profile({ cards, onSelectCard, onCreateModal }) {
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
					<ClothesSection>
						{cards.map((x) => (
							<ItemCard item={x} onSelectCard={onSelectCard} key={x.id} />
						))}
					</ClothesSection>
				</section>
			</div>
		</div>
	);
}
export default Profile;
