import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({
	isOpen,
	onSubmit,
	onCloseModal,
	onClickout,
	isLoading,
}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [avatarUrl, setAvatarUrl] = useState("");

	useEffect(() => {
		if (isOpen === true) {
			setEmail("");
			setPassword("");
			setName("");
			setAvatarUrl("");
		}
	}, [isOpen]);

	function handleSubmit(e) {
		e.preventDefault();
		onSubmit({ email, password, name, avatarUrl });
	}
	const handleEmail = (data) => {
		setEmail(data.target.value);
	};
	const handlePassword = (data) => {
		setPassword(data.target.value);
	};
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
				buttonText="Next"
				name="edit-profile"
				title="Edit profile"
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
							value={name}
							placeholder="Name"
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
							value={avatarUrl}
							placeholder="Avatar URL"
						/>
					</label>
				</div>
			</ModalWithForm>
		</div>
	);
};

export default EditProfileModal;

/*


const EditProfile = ({ handleCloseModal, onEditProfile, isOpen }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [avatar, setUrl] = useState(currentUser.avatar);
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSignUp({ email, password, name, avatar });
    onEditProfile({ name, avatar });
  };
  return (
    <ModalWithForm
      title="Edit Profile"
      className="modal__title"
      buttonText="Save Changes"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__field">
        <label className="modal__label">
          Name
          <input
            className="modal__input"
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            placeholder={"Enter your name"}
            value={name}
            onChange={handleNameChange}
          >
            //{ {currentUser.name} }
            </input>
            </label>
          </fieldset>
          <fieldset className="form__field">
            <label className="modal__label">
              Avatar URL
              <input
                className="modal__input"
                type="url"
                name="avatar"
                minLength="1"
                maxLength="3000"
                placeholder={"Add your Avatar"}
                value={avatar}
                onChange={handleUrlChange}
              ></input>
            </label>
          </fieldset>
        </ModalWithForm>
      );
    };
    
    export default EditProfile; */
