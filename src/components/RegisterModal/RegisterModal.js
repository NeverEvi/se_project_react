import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RegisterModal.css";

// onRegister refers to handleRegisterSubmit, which is declared in App.js
const RegisterModal = ({
	isOpen,
	onRegister,
	onCloseModal,
	onClickout,
	isLoading,
	onSwitchRegisterLogin,
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
		onRegister({ email, password, name, avatarUrl });
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
		<ModalWithForm
			handleSubmit={handleSubmit}
			onClickout={onClickout}
			onClose={onCloseModal}
			buttonText="Next"
			modalName="register"
			title="Sign Up"
			extra={
				<Link
					to="/signin"
					className="form-switch"
					onClick={onSwitchRegisterLogin}
				>
					or Log in
				</Link>
			}
		>
			<label className="form-input">
				Email*
				<br />
				<input
					className="inputField"
					type="text"
					name="email"
					minLength="2"
					maxLength="36"
					onChange={handleEmail}
					value={email}
					placeholder="Email"
				/>
			</label>

			<br />
			<div className="inputSection">
				<label className="form-input">
					Password*
					<br />
					<input
						className="inputField"
						type="text"
						name="password"
						minLength="5"
						onChange={handlePassword}
						value={password}
						placeholder="Password"
					/>
				</label>
			</div>
			<div className="inputSection">
				<label className="form-input">
					Name
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
	);
};

export default RegisterModal;
