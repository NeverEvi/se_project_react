import "./ModalWithForm.css";
const ModalWithForm = ({
	children,
	buttonText = "Add Garment",
	title,
	onClose,
	onClickout,
	name,
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
				<form>
					{children}
					<button type="submit" className="submitButton">
						{buttonText}
					</button>
				</form>
			</div>
		</div>
	);
};

export default ModalWithForm;
