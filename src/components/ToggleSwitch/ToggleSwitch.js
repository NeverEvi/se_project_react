import { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
	const { currentTemperatureUnit, handleToggleSwitch } = useContext(
		CurrentTemperatureUnitContext
	);
	const isChecked = currentTemperatureUnit === "C";
	console.log(currentTemperatureUnit);
	return (
		<div>
			<input
				className="ToggleSwitch-checkbox"
				id={`ToggleSwitch-new`}
				type="checkbox"
				name="ToggleSwitch-checkbox"
				value={currentTemperatureUnit}
				onChange={handleToggleSwitch}
				checked={isChecked}
			/>

			<label className="ToggleSwitch-label" htmlFor={`ToggleSwitch-new`}>
				<span
					className={`ToggleSwitch-button ToggleSwitch-button-state-visible`}
				/>
			</label>
		</div>
	);
};
export default ToggleSwitch;
