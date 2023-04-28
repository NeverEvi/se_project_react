import ItemCard from "../ItemCard/ItemCard";
function ClothesSection({ cards, onSelectCard }) {
	return (
		<section>
			<div className="card_items">
				{cards.map((x) => (
					<ItemCard item={x} onSelectCard={onSelectCard} key={x.id} />
				))}
			</div>
		</section>
	);
}
export default ClothesSection;
