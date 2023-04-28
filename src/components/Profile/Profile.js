import "./Profile.css";
import { React } from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

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
					<ClothesSection cards={cards} onSelectCard={onSelectCard} />
				</section>
			</div>
		</div>
	);
}
export default Profile;
