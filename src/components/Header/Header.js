import "./Header.css";
import profileLogo from "../../images/Ellipse 18.svg";
import logo from "../../images/wtwr.svg";

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
				<div>{`${currentDate}, ${loc}`}</div>
			</div>
			<div className="header__avatar-logo">
				<div>
					<button
						type="text"
						onClick={onCreateModal}
						className="header__button"
					>
						+ Add Clothes
					</button>
				</div>
				<div>Terrence Tegegne</div>
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
