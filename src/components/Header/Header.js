import "./Header.css";
import profileLogo from "../../images/Ellipse 18.svg";
import logo from "../../images/wtwr.svg";
import React, { useContext } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.js";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Header = ({
	onCreateModal,
	onRegisterModal,
	onLoginModal,
	loc,
	loggedIn,
	userName,
}) => {
	const currentDate = new Date().toLocaleString("default", {
		month: "long",
		day: "numeric",
	});
	const { user } = useContext(CurrentUserContext);
	return (
		<header className="header">
			<div className="header__logo">
				<div>
					<Link to="/">
						<img src={logo} alt="Logo" />
					</Link>
				</div>
				<div>
					{`${currentDate},`} {loc}
				</div>
			</div>
			<div className="header__avatar-logo">
				<div>
					<ToggleSwitch className="header__temp-toggle-button" />
				</div>
				{loggedIn ? (
					<div className="header__right">
						<div>
							<button
								type="text"
								onClick={onCreateModal}
								className="header__button"
							>
								+ Add Clothes
							</button>
						</div>
						<div>
							<Link to="/profile">{user?.name}</Link>
						</div>
						<div>
							<img
								className="header__avatar-logo-image"
								src={user?.avatar || profileLogo}
								alt="Logo"
							/>
						</div>
					</div>
				) : (
					<div className="header__right">
						<div>
							<Link
								to="/signup"
								type="text"
								onClick={onRegisterModal}
								className="header__button"
							>
								Sign Up
							</Link>
						</div>
						<div>
							<Link
								to="/signin"
								type="text"
								onClick={onLoginModal}
								className="header__button"
							>
								Log In
							</Link>
						</div>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
