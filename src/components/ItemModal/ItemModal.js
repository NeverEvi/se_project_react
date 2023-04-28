import "./ItemModal.css";
const ItemModal = ({ selectedCard, onClose, onClickout, onDelete }) => {
	return (
		<div className={`modal`} onClick={onClickout}>
			<div className="modal__content-item">
				<button
					type="button"
					onClick={onClose}
					className="modal__closeButton"
				></button>
				<img
					src={selectedCard.imageUrl}
					alt={selectedCard.name}
					className="modal__image"
				/>
				<div className="modal__info">
					<div className="modal__info-name">
						{selectedCard.name}
						<p
							className="modal__delete-item"
							onClick={onDelete}
							id={`${selectedCard.id}`}
						>
							Delete Item
						</p>
					</div>
					<div>Weather type: {selectedCard.weather}</div>
				</div>
			</div>
		</div>
	);
};
export default ItemModal;
// add functionality to delete button
