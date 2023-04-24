import "./Header.css";
import profileLogo from "../../images/Ellipse 18.svg";
import logo from "../../images/wtwr.svg";
import React from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.js";
import { Link, BrowserRouter } from "react-router-dom";

const Header = ({ onCreateModal, loc }) => {
	const currentDate = new Date().toLocaleString("default", {
		month: "long",
		day: "numeric",
	});
	return (
		<header className="header">
			<div className="header__logo">
				<div>
					<img src={logo} alt="Logo" />
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
					<BrowserRouter>
						<Link exact to="/profile">
							Terrence Tegegne
						</Link>
					</BrowserRouter>
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
