import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../ResisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { checkToken, signIn, signUp } from "../../utils/auth";
//import ItemCard from "../ItemCard/ItemCard";
import { React, useState, useEffect } from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
	getForecastWeather,
	parseWeatherData,
	parseWeatherType,
	APIkey,
} from "../../utils/weatherApi";
import { getItems, setItems, removeItems } from "../../utils/api";
//import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
function App() {
	const [activeModal, setActiveModal] = useState("");
	const [selectedCard, setSelectedCard] = useState({});
	const [temp, setTemp] = useState(0);
	const [weatherType, setWeatherType] = useState("FUCK");
	const [location, setLocation] = useState("");
	const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
	const [isLoading, setIsLoading] = useState(false);
	const [token, setToken] = useState(null);
	const [user, setUser] = useState({});
	const [clothingItems, setClothingItems] = useState([]);
	const [loggedIn, setLoggedIn] = useState(false);

	const handleCreateModal = () => {
		setActiveModal("create");
	};
	const handleRegisterModal = () => {
		setActiveModal("register");
	};
	const handleLoginModal = () => {
		setActiveModal("login");
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
		console.log(card);
	};
	const handleToggleSwitchChange = () => {
		currentTemperatureUnit === "F"
			? setCurrentTemperatureUnit("C")
			: setCurrentTemperatureUnit("F");
	};

	const isReloading = (token) => {
		checkToken(token)
			.then((decoded) => {
				setUser(decoded); //setUser(decoded.data);
				setActiveModal("");
				setToken(token);
				console.log("Token: ", token);
				console.log("Data: ", decoded);
				console.log("User: ", user);
			})
			.catch((error) => {
				console.error("Error checking token:", error);
			});
	};

	const handleAddItemSubmit = (data) => {
		const name = data.garmentName;
		const imageUrl = data.garmentPhotoURL;
		const weather = data.garmentWeather;
		setIsLoading(true);
		setItems({ name, imageUrl, weather }, token)
			.then((res) => {
				setClothingItems([res, ...clothingItems]);
				handleCloseModal();
			})
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
	};
	const handleRegisterSubmit = (data) => {
		const name = data.name;
		const avatarUrl = data.avatarURL;
		const password = data.password;
		const email = data.email;
		setIsLoading(true);
		console.log({ name, avatarUrl, password, email });
		signUp({ name, avatarUrl, password, email })
			.then((res) => {
				handleLoginSubmit({ email, password });
				handleCloseModal();
			})
			.catch((err) => console.error(err))
			.finally(() => setIsLoading(false));
	};

	const handleLoginSubmit = ({ email, password }) => {
		console.log("Login initiated...");
		console.log("Login (React) App.js: ", email);
		console.log("Login (React) App.js: ", password);
		signIn({ email, password })
			.then((res) => {
				console.log(res);

				if (res && res.token) {
					localStorage.setItem("jwt", res.token);
					isReloading(res.token);
				} else {
					new Error(res.message || "Invalid credentials");
				}
				console.log(res);
				return res;
			})
			.then((res) => {
				setUser(res);
				setLoggedIn(true);
				console.log(res);
			})
			.catch((err) => console.error(err));
	};

	const handleDeleteItem = (e) => {
		console.log("EVENT: ", e);
		console.log("EVENT TARGET: ", e.target);
		console.log("TARGET id: ", e.target.id);
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
				const wType = parseWeatherType(data);
				setTemp(temperature);
				setWeatherType(wType);
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
			<CurrentUserContext.Provider value={user}>
				<div className="app">
					<CurrentTemperatureUnitContext.Provider
						value={{ currentTemperatureUnit, handleToggleSwitchChange }}
					>
						<Header
							onCreateModal={handleCreateModal}
							onRegisterModal={handleRegisterModal}
							onLoginModal={handleLoginModal}
							loc={location}
							loggedIn={loggedIn}
						/>
						<Switch>
							<Route exact path="/profile">
								{loggedIn ? (
									<Redirect to="/profile" />
								) : (
									<Redirect to="/signup" />
								)}
								<Profile
									cards={clothingItems}
									onSelectCard={handleSelectedCard}
									onCreateModal={handleCreateModal}
									onClickout={handleClickout}
								/>
							</Route>
							<Route path="/">
								{loggedIn ? <Redirect to="/" /> : <Redirect to="/signup" />}
								<Main
									weatherTemp={temp}
									weatherType={weatherType}
									onSelectCard={handleSelectedCard}
									clothingItems={clothingItems}
									currentTemperatureUnit={currentTemperatureUnit}
								/>
							</Route>
						</Switch>
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
						{activeModal === "register" && (
							<RegisterModal
								onCloseModal={handleCloseModal}
								onClickout={handleClickout}
								isLoading={isLoading}
								onRegister={handleRegisterSubmit}
							/>
						)}
						{activeModal === "login" && (
							<LoginModal
								onCloseModal={handleCloseModal}
								onClickout={handleClickout}
								isLoading={isLoading}
								onLogin={handleLoginSubmit}
							/>
						)}
					</CurrentTemperatureUnitContext.Provider>
				</div>
			</CurrentUserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
