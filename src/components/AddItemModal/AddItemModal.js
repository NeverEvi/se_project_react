import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { useEffect } from "react";
// onAddItem refers to handleAddItemSubmit, which is declared in App.js
const AddItemModal = ({ isOpen, onAddItem, onCloseModal, onClickout }) => {
	const [garmentName, setGarmentName] = useState("");
	const [garmentPhotoURL, setGarmentPhotoURL] = useState("");
	const [garmentWeather, setGarmentWeather] = useState("hot");
	// declare state for each input field
	// use a useEffect hook to reset the input field state to empty strings when
	// the modal is opened

	useEffect(() => {
		if (isOpen === true) {
			setGarmentName("");
			setGarmentPhotoURL("");
			setGarmentWeather("hot");
		}
	}, [isOpen]);
	// create onChange handlers corresponding to each state variable
	function handleSubmit(e) {
		e.preventDefault();
		// prevent default behavior
		onAddItem({ garmentName, garmentPhotoURL, garmentWeather });
		// call onAddItem with appropriate arguments
	}
	const handleGarmentName = (data) => {
		setGarmentName(data.target.value);
	};
	const handleGarmentPhotoURL = (data) => {
		setGarmentPhotoURL(data.target.value);
	};
	const handleGarmentWeather = (data) => {
		setGarmentWeather(data.target.id);
	};

	return (
		//   {/* don't forget to pass appropriate props to ModalWithForm */}
		<ModalWithForm
			title="New Garment"
			onClose={onCloseModal}
			onClickout={onClickout}
			handleSubmit={handleSubmit}
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
					onChange={handleGarmentName}
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
					onChange={handleGarmentPhotoURL}
				/>
			</label>
			<p>Select the weather type:</p>
			<div className="radioGroup">
				<div>
					<input
						type="radio"
						id="hot"
						value="hot"
						defaultChecked
						name="RadioTemp"
						onClick={handleGarmentWeather}
					/>
					<label>Hot</label>
				</div>
				<div>
					<input
						type="radio"
						id="warm"
						value="warm"
						name="RadioTemp"
						onClick={handleGarmentWeather}
					/>
					<label>Warm</label>
				</div>
				<div>
					<input
						type="radio"
						id="cold"
						value="cold"
						name="RadioTemp"
						onClick={handleGarmentWeather}
					/>
					<label>Cold</label>
				</div>
			</div>
		</ModalWithForm>
	);
};

export default AddItemModal;
