import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { useState } from "react";
import { useEffect } from "react";
import {
	getForecastWeather,
	parseWeatherData,
	parseLocationData,
} from "../../utils/weatherApi";

function App() {
	//const weatherTemp = "175 F";
	const [activeModal, setActiveModal] = useState("");
	const [selectedCard, setSelectedCard] = useState({});
	const [temp, setTemp] = useState(0);
	const [location, setLocation] = useState("");

	const handleCreateModal = () => {
		setActiveModal("create");
	};
	const handleCloseModal = () => {
		setActiveModal("");
	};

	const handleClickOut = (evt) => {
		if (evt.currentTarget !== evt.target) return;
		setActiveModal("");
	};
	const handleSelectedCard = (card) => {
		setActiveModal("preview");
		setSelectedCard(card);
	};
	useEffect(() => {
		getForecastWeather()
			.then((data) => {
				const temperature = parseWeatherData(data);
				setTemp(temperature);
				const location = parseLocationData(data);
				setLocation(location);
			})
			.catch((data) => {
				console.error(data);
			});
	}, []);

	useEffect(() => {
		const closeByEscape = (evt) => {
			if (evt.key === "Escape") {
				handleCloseModal();
			}
		};
		document.addEventListener("keydown", closeByEscape);
		return () => document.removeEventListener("keydown", closeByEscape);
	}, []);
	return (
		<div className="app">
			<Header onCreateModal={handleCreateModal} loc={location} />
			<Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
			<Footer />
			{activeModal === "create" && (
				<ModalWithForm
					title="New Garment"
					onClose={handleCloseModal}
					onClickout={handleClickOut}
				>
					<label>
						Name
						<br />
						<input
							className="inputField"
							type="text"
							name="name"
							minLength="2"
							maxLength="36"
						/>
					</label>
					<br />
					<label>
						Image
						<br />
						<input
							className="inputField"
							type="url"
							name="link"
							minLength="5"
							maxLength="36"
						/>
					</label>
					<p>Select the weather type:</p>
					<div className="radioGroup">
						<div>
							<input type="radio" id="hot" value="hot" defaultChecked />
							<label>Hot</label>
						</div>
						<div>
							<input type="radio" id="warm" value="warm" />
							<label>Warm</label>
						</div>
						<div>
							<input type="radio" id="cold" value="cold" />
							<label>Cold</label>
						</div>
					</div>
				</ModalWithForm>
			)}
			{activeModal === "preview" && (
				<ItemModal
					selectedCard={selectedCard}
					onClose={handleCloseModal}
					onClickout={handleClickOut}
				/>
			)}
		</div>
	);
}

export default App;
