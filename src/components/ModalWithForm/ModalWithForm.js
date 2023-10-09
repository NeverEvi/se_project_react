import "./ModalWithForm.css";
const ModalWithForm = ({
	children,
	buttonText = "Add Garment",
	title,
	onClose,
	onClickout,
	modalName,
	handleSubmit,
	isLoading,
	extra,
}) => {
	return (
		<div className={`modal `} onClick={onClickout}>
			<div className={`modal__content modal_type_${modalName}`}>
				<button
					className="modal__closeButton-form"
					type="button"
					onClick={onClose}
				/>
				<h3 className="modal__title">{title}</h3>
				<form className="modal__form" onSubmit={handleSubmit}>
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
