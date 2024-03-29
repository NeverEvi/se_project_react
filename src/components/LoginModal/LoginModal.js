import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LoginModal.css";

// onLogin refers to handleLogin, which is declared in App.js
const LoginModal = ({
	isOpen,
	onLogin,
	onCloseModal,
	onClickout,
	isLoading,
	onSwitchRegisterLogin,
}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (isOpen === true) {
			setEmail("");
			setPassword("");
		}
	}, [isOpen]);
	function handleSubmit(e) {
		e.preventDefault();
		onLogin({ email, password });
	}
	const handleEmail = (data) => {
		setEmail(data.target.value);
	};
	const handlePassword = (data) => {
		setPassword(data.target.value);
	};

	return (
		<ModalWithForm
			handleSubmit={handleSubmit}
			onClickout={onClickout}
			onClose={onCloseModal}
			buttonText="Log In"
			modalName="LogIn"
			title="Log In"
			extra={
				<Link
					className="form-switch"
					onClick={onSwitchRegisterLogin}
					to="/signup"
				>
					or Register
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
		</ModalWithForm>
	);
};

export default LoginModal;
