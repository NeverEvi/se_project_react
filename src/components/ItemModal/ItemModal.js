import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useContext } from "react";

const ItemModal = ({ selectedCard, onClose, onClickout, onDelete }) => {
	const { user } = useContext(CurrentUserContext);
	const isOwn = selectedCard.owner === user?._id;
	const deleteButtonClassName = `modal__delete-item ${
		!isOwn && "modal__delete-item_hidden"
	}`;
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
							className={deleteButtonClassName}
							onClick={onDelete}
							id={`${selectedCard._id}`}
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
