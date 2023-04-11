import "./Footer.css";
const Footer = () => {
	return (
		<footer className="footer">
			<div>Developed by Kane Cramer</div>
			<div>{new Date().getFullYear()}</div>
		</footer>
	);
};
export default Footer;
