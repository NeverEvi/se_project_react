import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { React, useState, useEffect } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import {
	getForecastWeather,
	parseWeatherData,
	APIkey,
} from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/constants";
function App() {
	const [activeModal, setActiveModal] = useState("");
	const [selectedCard, setSelectedCard] = useState({});
	const [temp, setTemp] = useState(0);
	const [location, setLocation] = useState("");
	const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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
	const handleToggleSwitch = () => {
		currentTemperatureUnit === "F"
			? setCurrentTemperatureUnit("C")
			: setCurrentTemperatureUnit("F");
	};

	useEffect(() => {
		getForecastWeather(APIkey)
			.then((data) => {
				const location = data && data.name;
				setLocation(location);
				console.log(data.main.temp);
				const temperature = parseWeatherData(data);
				setTemp(temperature);
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
		<BrowserRouter>
			<div className="app">
				<CurrentTemperatureUnitContext.Provider
					value={{ currentTemperatureUnit, handleToggleSwitch }}
				>
					<Header onCreateModal={handleCreateModal} loc={location} />

					<Route exact path="/">
						<Main
							weatherTemp={temp}
							onSelectCard={handleSelectedCard}
							clothingItems={defaultClothingItems}
						/>
					</Route>
					<Route exact path="/profile">
						{defaultClothingItems.length !== 0 && (
							<Profile
								cards={defaultClothingItems}
								onSelectCard={handleSelectedCard}
							/>
						)}
					</Route>

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
				</CurrentTemperatureUnitContext.Provider>
			</div>
		</BrowserRouter>
	);
}

export default App;
