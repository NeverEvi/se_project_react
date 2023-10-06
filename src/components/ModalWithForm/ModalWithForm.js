import "./ModalWithForm.css";
import { Link } from "react-router-dom";
const ModalWithForm = ({
	children,
	buttonText = "Add Garment",
	title,
	onClose,
	onClickout,
	name,
	handleSubmit,
	isLoading,
	extra,
}) => {
	return (
		<div className={`modal `} onClick={onClickout}>
			<div className={`modal__content modal_type_${name}`}>
				<button
					className="modal__closeButton-form"
					type="button"
					onClick={onClose}
				/>
				<h3 className="modal__title">{title}</h3>
				<form onSubmit={handleSubmit}>
					{children}

					<button type="submit" className="submitButton">
						{isLoading ? "Saving" : buttonText}
					</button>
					{extra}
				</form>
			</div>
		</div>
	);
};

export default ModalWithForm;
