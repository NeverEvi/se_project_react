import "./ModalWithForm.css";
const ModalWithForm = ({
	children,
	buttonText = "Add Garment",
	title,
	onClose,
	onClickout,
	name,
	handleSubmit,
	isLoading,
}) => {
	return (
		<div className={`modal modal_type_${name}`} onClick={onClickout}>
			<div className="modal__content">
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
				</form>
			</div>
		</div>
	);
};

export default ModalWithForm;
