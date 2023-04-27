import profileLogo from "../../images/Ellipse 18.svg";
function SideBar() {
	return (
		<div className="profile-sidebar">
			<div className="profile-sidebar-info">
				<img
					className="header__avatar-logo-image profile-sidebar-photo"
					src={profileLogo}
					alt="Logo"
				/>
				Terrence Tegegne
			</div>
		</div>
	);
}
export default SideBar;
