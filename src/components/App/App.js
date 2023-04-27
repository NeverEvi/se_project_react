import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { React, useState, useEffect } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import {
	getForecastWeather,
	parseWeatherData,
	APIkey,
} from "../../utils/weatherApi";
import { defaultClothingItems, baseUrl } from "../../utils/constants";
import Api from "../../utils/api";
const api = new Api({
	baseUrl: baseUrl,
	headers: {
		"Content-Type": "application/json",
	},
});
console.log(baseUrl);
function App() {
	const [activeModal, setActiveModal] = useState("");
	const [selectedCard, setSelectedCard] = useState({});
	const [temp, setTemp] = useState(0);
	const [location, setLocation] = useState("");
	const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

	//const [clothingItems, setClothingItems] = useState([]);

	const handleCreateModal = () => {
		setActiveModal("create");
	};
	const handleCloseModal = () => {
		setActiveModal("");
	};

	const handleClickout = (evt) => {
		if (evt.currentTarget !== evt.target) {
			return;
		}
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

	const handleAddItemSubmit = (data) => {
		/*call the corresponding methods from weatherApi.js and 
		update the clothingItems (your name may differ) state 
		with an extended copy of the current array 
		using the spread ... operator:
		
		setClothingItems([item, ...clothingItems]);*/
		console.log(data);
		console.log(data.garmentName);
		console.log(data.garmentPhotoURL);
		console.log(data.garmentWeather);
		let name = data.garmentName;
		let imageUrl = data.garmentPhotoURL;
		let weather = data.garmentWeather;
		api
			.addNewClothingItem(
				(name = { name }),
				(imageUrl = { imageUrl }),
				(weather = { weather })
			)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.error(err));
		handleCloseModal();
	};

	useEffect(() => {
		getForecastWeather(APIkey)
			.then((data) => {
				const location = data && data.name;
				setLocation(location);
				const temperature = parseWeatherData(data);

				setTemp(temperature);
			})
			.catch((data) => {
				console.error(data);
			});
	}, [currentTemperatureUnit]);

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
							currentTemperatureUnit={currentTemperatureUnit}
						/>
					</Route>
					<Route exact path="/profile">
						{defaultClothingItems.length !== 0 && (
							<Profile
								cards={defaultClothingItems}
								onSelectCard={handleSelectedCard}
								onCreateModal={handleCreateModal}
								onClickout={handleClickout}
							/>
						)}
					</Route>

					<Footer />
					{activeModal === "create" && (
						<AddItemModal
							onCloseModal={handleCloseModal}
							onClickout={handleClickout}
							onAddItem={handleAddItemSubmit}
						></AddItemModal>
					)}
					{activeModal === "preview" && (
						<ItemModal
							selectedCard={selectedCard}
							onClose={handleCloseModal}
							onClickout={handleClickout}
						/>
					)}
				</CurrentTemperatureUnitContext.Provider>
			</div>
		</BrowserRouter>
	);
}

export default App;
