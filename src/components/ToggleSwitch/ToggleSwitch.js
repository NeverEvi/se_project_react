import { useState, useContext, useEffect } from "react";
//import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
	const { CurrentTemperatureUnit, handleToggleSwitch } = useContext(
		CurrentTemperatureUnitContext
	);

	const [isChecked, setIsChecked] = useState(CurrentTemperatureUnit === "C");
	useEffect(
		() => setIsChecked(CurrentTemperatureUnit === "C"),
		[CurrentTemperatureUnit]
	);
	return (
		<div>
			<label>
				F
				<input
					className=""
					type="checkbox"
					name="toggle-switch-checkbox"
					value={CurrentTemperatureUnit}
					onChange={handleToggleSwitch}
					checked={isChecked}
				/>
				C
				<span className="toggle-switch__checkbox toggle-switch__checkbox_state_visible" />
			</label>
		</div>
	);
};
export default ToggleSwitch;
