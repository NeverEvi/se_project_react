import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({
	isOpen,
	onSubmit,
	onCloseModal,
	onClickout,
	isLoading,
}) => {
	const { user } = useContext(CurrentUserContext);
	const [name, setName] = useState("");
	const [avatarUrl, setAvatarUrl] = useState("");
	useEffect(() => {
		setName(`${user.name}`);
		setAvatarUrl(`${user.avatar}`);
	}, [isOpen]);

	function handleSubmit(e) {
		e.preventDefault();
		onSubmit({ name, avatarUrl });
	}

	const handleName = (data) => {
		setName(data.target.value);
	};
	const handleAvatarUrl = (data) => {
		setAvatarUrl(data.target.value);
	};
	return (
		<div>
			<ModalWithForm
				handleSubmit={handleSubmit}
				onClickout={onClickout}
				onClose={onCloseModal}
				buttonText={isLoading ? "Saving..." : "Save changes"}
				modalName="edit-profile"
				title="Change profile data"
			>
				<div className="inputSection">
					<label className="form-input">
						Name*
						<br />
						<input
							className="inputField"
							type="text"
							name="name"
							minLength="5"
							onChange={handleName}
							defaultValue={`${user.name}`}
						/>
					</label>
				</div>
				<div className="inputSection">
					<label className="form-input">
						Avatar URL
						<br />
						<input
							className="inputField"
							type="url"
							name="avatarUrl"
							minLength="5"
							onChange={handleAvatarUrl}
							defaultValue={`${user.avatar}`}
						/>
					</label>
				</div>
			</ModalWithForm>
		</div>
	);
};

export default EditProfileModal;
