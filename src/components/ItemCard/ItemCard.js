import "./ItemCard.css";
import likeEmpty from "../../images/like-empty.png";
import like from "../../images/like.png";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useContext } from "react";

const ItemCard = ({ item, onSelectCard, loggedIn, onLikeClick }) => {
	const { user } = useContext(CurrentUserContext);
	const isLiked = item.likes.some((id) => id === user?._id);
	return (
		<div>
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
					<button
						className="card_like-button"
						onClick={() => onLikeClick(item._id, isLiked, user)}
					>
						<img
							src={isLiked ? like : likeEmpty}
							alt="like"
							//{onCardLike}
						/>
					</button>
				) : null}
			</div>
		</div>
	);
};

export default ItemCard;
