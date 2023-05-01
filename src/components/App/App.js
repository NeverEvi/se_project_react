import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
//import ItemCard from "../ItemCard/ItemCard";
import { React, useState, useEffect } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import {
	getForecastWeather,
	parseWeatherData,
	APIkey,
} from "../../utils/weatherApi";
import { getItems, setItems, removeItems } from "../../utils/api";
function App() {
	const [activeModal, setActiveModal] = useState("");
	const [selectedCard, setSelectedCard] = useState({});
	const [temp, setTemp] = useState(0);
	const [location, setLocation] = useState("");
	const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
	const [isLoading, setIsLoading] = useState(false);

	const [clothingItems, setClothingItems] = useState([]);

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
	const handleToggleSwitchChange = () => {
		currentTemperatureUnit === "F"
			? setCurrentTemperatureUnit("C")
			: setCurrentTemperatureUnit("F");
	};
	const handleAddItemSubmit = (data) => {
		const name = data.garmentName;
		const imageUrl = data.garmentPhotoURL;
		const weather = data.garmentWeather;
		setIsLoading(true);
		setItems({ name, imageUrl, weather })
			.then((res) => {
				setClothingItems([res, ...clothingItems]);
				handleCloseModal();
			})
			.catch((err) => console.error(err))
			.finally(() => setIsLoading(false));
	};
	const handleDeleteItem = (e) => {
		console.log(e.target.id);
		removeItems(e.target.id)
			.then(() => {
				const newItemList = clothingItems.filter((item) => {
					console.log(item.id);
					return item.id != e.target.id;
				});
				console.log(newItemList);
				setClothingItems(newItemList);
				handleCloseModal();
			})
			.catch((err) => console.error(err));
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
		getItems()
			.then((data) => {
				setClothingItems(data);
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
					value={{ currentTemperatureUnit, handleToggleSwitchChange }}
				>
					<Header onCreateModal={handleCreateModal} loc={location} />

					<Route exact path="/">
						<Main
							weatherTemp={temp}
							onSelectCard={handleSelectedCard}
							clothingItems={clothingItems}
							currentTemperatureUnit={currentTemperatureUnit}
						/>
					</Route>
					<Route exact path="/profile">
						<Profile
							cards={clothingItems}
							onSelectCard={handleSelectedCard}
							onCreateModal={handleCreateModal}
							onClickout={handleClickout}
						/>
					</Route>

					<Footer />
					{activeModal === "create" && (
						<AddItemModal
							onCloseModal={handleCloseModal}
							onClickout={handleClickout}
							onAddItem={handleAddItemSubmit}
							isLoading={isLoading}
						/>
					)}
					{activeModal === "preview" && (
						<ItemModal
							selectedCard={selectedCard}
							onClose={handleCloseModal}
							onClickout={handleClickout}
							onDelete={handleDeleteItem}
							isLoading={isLoading}
						/>
					)}
				</CurrentTemperatureUnitContext.Provider>
			</div>
		</BrowserRouter>
	);
}

export default App;
