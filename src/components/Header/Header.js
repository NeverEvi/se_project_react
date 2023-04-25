import "./Header.css";
import profileLogo from "../../images/Ellipse 18.svg";
import logo from "../../images/wtwr.svg";
import React from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.js";
import { Link } from "react-router-dom";

const Header = ({ onCreateModal, loc }) => {
	const currentDate = new Date().toLocaleString("default", {
		month: "long",
		day: "numeric",
	});
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
					<Link to="/profile">Terrence Tegegne</Link>
				</div>
				<div>
					<img
						className="header__avatar-logo-image"
						src={profileLogo}
						alt="Logo"
					/>
				</div>
			</div>
		</header>
	);
};

export default Header;
