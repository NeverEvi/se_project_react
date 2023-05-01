import "./ItemCard.css";
const ItemCard = ({ item, onSelectCard }) => {
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
			<div className="card_name">{item.name}</div>
		</div>
	);
};

export default ItemCard;
