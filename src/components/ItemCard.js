import "../ItemCard/ItemCard.css";
const ItemCard = ({ item, onSelectCard }) => {
	return (
		<div onClick={() => onSelectCard(item)}>
			<div>
				<img
					src={item.link}
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
