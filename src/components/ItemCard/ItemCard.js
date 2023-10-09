import "./ItemCard.css";
import likeEmpty from "../../images/like-empty.png";
//import like from "../../images/like.png";
//import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React /*, { useContext }*/ from "react";

const ItemCard = ({ item, onSelectCard, loggedIn }) => {
	return (
		<div key={item.imageUrl}>
			<div>
				<img
					src={item.imageUrl}
					className="card_image"
					alt={item.name}
					onClick={() => onSelectCard(item)}
				/>
			</div>
			<div className="card_info">
				<div className="card_name">{item.name}</div>
				{loggedIn ? (
					<img
						src={likeEmpty}
						alt="like"
						//onClick={onCardLike}
					/>
				) : (
					<img src={null} />
				)}
			</div>
		</div>
	);
};

export default ItemCard;
