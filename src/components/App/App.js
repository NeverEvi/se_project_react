import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import { checkToken, editProfile, signIn, signUp } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { React, useState, useEffect } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
	getForecastWeather,
	parseWeatherData,
	APIkey,
} from "../../utils/weatherApi";
import {
	getItems,
	setItems,
	removeItems,
	addCardLike,
	removeCardLike,
} from "../../utils/api";

function App() {
	const [activeModal, setActiveModal] = useState("");
	const [selectedCard, setSelectedCard] = useState({});
	const [temp, setTemp] = useState(0);
	//const [weatherType, setWeatherType] = useState("Clear");
	const [location, setLocation] = useState("");
	const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
	const [isLoading, setIsLoading] = useState(false);
	const [token, setToken] = useState(null);
	const [user, setUser] = useState({});
	const [clothingItems, setClothingItems] = useState([]);
	const [loggedIn, setLoggedIn] = useState(false);
	/////////////////////////////////////////////////////////
	//                   LIKE HANDLER                      //
	/////////////////////////////////////////////////////////

	const handleCardLike = (id, isLiked, user) => {
		const token = localStorage.getItem("jwt");
		// Check if this card is now liked
		!isLiked
			? // if so, send a request to add the user's id to the card's likes array

			  // the first argument is the card's id
			  addCardLike(id, user, token)
					.then((updatedCard) => {
						setClothingItems((cards) =>
							cards.map((c) => (c._id === id ? updatedCard.data : c))
						);
					})
					.catch((err) => console.log(err))
			: // if not, send a request to remove the user's id from the card's likes array

			  // the first argument is the card's id
			  removeCardLike(id, user, token)
					.then((updatedCard) => {
						setClothingItems((cards) =>
							cards.map((c) => (c._id === id ? updatedCard.item : c))
						);
					})
					.catch((err) => console.log(err));
	};
	/////////////////////////////////////////////////////////
	//                  MODAL HANDLERS                     //
	/////////////////////////////////////////////////////////

	const handleCreateModal = () => {
		setActiveModal("create");
	};
	const handleRegisterModal = () => {
		setActiveModal("register");
	};
	const handleLoginModal = () => {
		setActiveModal("login");
	};
	const handleEditProfileModal = () => {
		setActiveModal("edit-profile");
	};
	const handleSelectedCard = (card) => {
		setActiveModal("preview");
		setSelectedCard(card);
	};
	const handleCloseModal = () => {
		setActiveModal("");
	};
	const handleClickout = (evt) => {
		if (evt.currentTarget !== evt.target) {
			return;
		}
		handleCloseModal();
	};

	/////////////////////////////////////////////////////////

	const handleToggleSwitchChange = () => {
		currentTemperatureUnit === "F"
			? setCurrentTemperatureUnit("C")
			: setCurrentTemperatureUnit("F");
	};
	const isReloading = (token) => {
		checkToken(token)
			.then((decoded) => {
				setUser(decoded); //setUser(decoded.data);
				handleCloseModal();
				setToken(token);
			})
			.catch((error) => {
				console.error("Error checking token:", error);
			});
	};

	/////////////////////////////////////////////////////////
	//             SUBMIT FORM HANDLERS                    //
	/////////////////////////////////////////////////////////

	const handleAddItemSubmit = (data) => {
		const name = data.garmentName;
		const imageUrl = data.garmentPhotoURL;
		const weather = data.garmentWeather;
		setIsLoading(true);
		setItems({ name, imageUrl, weather }, token)
			.then((res) => {
				//res = {data: {}}
				setClothingItems([res.data, ...clothingItems]);
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
		signUp({ name, avatarUrl, password, email })
			.then((res) => {
				handleLoginSubmit({ email, password });
				handleCloseModal();
			})
			.catch((err) => console.error(err))
			.finally(() => setIsLoading(false));
	};

	const handleLoginSubmit = ({ email, password }) => {
		setIsLoading(true);
		signIn({ email, password })
			.then((res) => {
				if (res && res.token) {
					localStorage.setItem("jwt", res.token);
					isReloading(res.token);
				} else {
					new Error(res.message || "Invalid credentials");
				}
				return res;
			})
			.then((res) => {
				setUser(res);
				setLoggedIn(true);
			})
			.catch((err) => console.error(err))
			.finally(() => setIsLoading(false));
	};
	const handleLogoutSubmit = () => {
		localStorage.removeItem("jwt");
		setUser({});
		setLoggedIn(false);
	};
	const handleEditProfileSubmit = ({ name, avatarUrl }) => {
		setIsLoading(true);
		editProfile({ name, avatarUrl })
			.then((res) => {
				setUser(res);
				handleCloseModal();
			})
			.catch((err) => console.error(err))
			.finally(() => setIsLoading(false));
	};
	const handleDeleteItem = (e) => {
		setIsLoading(true);
		removeItems(e.target.id, token)
			.then(() => {
				const newItemList = clothingItems.filter((item) => {
					return item._id != e.target.id;
				});
				setClothingItems(newItemList);
				handleCloseModal();
			})
			.catch((err) => console.error(err))
			.finally(() => setIsLoading(false));
	};

	/////////////////////////////////////////////////////////
	//              useEffect Hooks                        //
	/////////////////////////////////////////////////////////
	useEffect(() => {
		const token = localStorage.getItem("jwt");

		if (token) {
			checkToken(token)
				.then((data) => {
					if (data) {
						setLoggedIn(true);
						setUser(data);
						setToken(token);
					} else {
						localStorage.removeItem("jwt");
						setLoggedIn(false);
					}
				})
				.catch((error) => {
					console.error("Failed to validate token:", error);
					localStorage.removeItem("jwt");
					setLoggedIn(false);
				});
		}
	}, []);

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

	/*useEffect(() => {
		getForecastWeather(APIkey)
			.then((data) => {
				const wType = parseWeatherType(data)
				setWeatherType(wType);
			})
			.catch((data) => {
				console.error(data);
			});
	}, []);*/

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
		if (!activeModal) return;

		const closeByEscape = (e) => {
			if (e.key === "Escape") {
				handleCloseModal();
			}
		};
		document.addEventListener("keydown", closeByEscape);
		return () => document.removeEventListener("keydown", closeByEscape);
	}, [activeModal]);

	/////////////////////////////////////////////////////////
	//                   RETURN: APP                       //
	/////////////////////////////////////////////////////////
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
							<ProtectedRoute exact path="/profile" loggedIn={loggedIn}>
								<Profile
									cards={clothingItems}
									onSelectCard={handleSelectedCard}
									onCreateModal={handleCreateModal}
									onClickout={handleClickout}
									onEditProfileModal={handleEditProfileModal}
									onLogout={handleLogoutSubmit}
									loggedIn={loggedIn}
									onCardLike={handleCardLike}
								/>
							</ProtectedRoute>
							<Route path="/">
								<Main
									weatherTemp={temp}
									weatherType="Clear"
									onSelectCard={handleSelectedCard}
									clothingItems={clothingItems}
									loggedIn={loggedIn}
									onCardLike={handleCardLike}
									//currentTemperatureUnit={currentTemperatureUnit}
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
								onSwitchRegisterLogin={handleLoginModal}
							/>
						)}
						{activeModal === "login" && (
							<LoginModal
								onCloseModal={handleCloseModal}
								onClickout={handleClickout}
								isLoading={isLoading}
								onLogin={handleLoginSubmit}
								onSwitchRegisterLogin={handleRegisterModal}
							/>
						)}
						{activeModal === "edit-profile" && (
							<EditProfileModal
								onCloseModal={handleCloseModal}
								onClickout={handleClickout}
								isLoading={isLoading}
								onSubmit={handleEditProfileSubmit}
							/>
						)}
					</CurrentTemperatureUnitContext.Provider>
				</div>
			</CurrentUserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
