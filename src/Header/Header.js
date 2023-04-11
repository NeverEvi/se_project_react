import "./Header.css";

const Header = ({ onCreateModal, loc }) => {
	const currentDate = new Date().toLocaleString("default", {
		month: "long",
		day: "numeric",
	});
	return (
		<header className="header">
			<div className="header__logo">
				<div>
					<img src={require("../images/wtwr.svg").default} alt="Logo" />
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
						src={require("../images/Ellipse 18.svg").default}
						alt="Logo"
					/>
				</div>
			</div>
		</header>
	);
};

export default Header;
