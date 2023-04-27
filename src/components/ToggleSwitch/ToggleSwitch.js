import { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
	const { currentTemperatureUnit, handleToggleSwitch } = useContext(
		CurrentTemperatureUnitContext
	);
	const isChecked = currentTemperatureUnit === "C";
	return (
		<div className="ToggleSwitch">
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
				<div className="ToggleSwitch-inactive-units">
					<span>F</span>
					<span>C</span>
				</div>
			</label>
		</div>
	);
};
export default ToggleSwitch;
