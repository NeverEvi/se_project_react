import "./SideBar.css";
import profileLogo from "../../images/Ellipse 18.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

function SideBar({ onEditProfileModal }) {
	const { user } = useContext(CurrentUserContext);
	return (
		<div className="profile-sidebar">
			<div className="profile-sidebar-info">
				<img
					className="header__avatar-logo-image profile-sidebar-photo"
					src={user?.avatar || profileLogo}
					alt="Logo"
				/>
				{user?.name}
			</div>
			<div className="profile-sidebar-links">
				<button
					type="text"
					onClick={onEditProfileModal}
					className="header__button"
				>
					Change profile data
				</button>

				<p>Log out</p>
			</div>
		</div>
	);
}
export default SideBar;
