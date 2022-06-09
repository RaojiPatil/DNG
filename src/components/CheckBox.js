import React from 'react';

const CheckBox = ({ name, labelName, dngSetCheckBox }) => {
	return (
		<div>
			<input
				type="checkbox"
				name={name}
				id={name}
				onClick={(e) => dngSetCheckBox(e)}
			/>
			<label htmlFor={name}> {labelName} </label>
		</div>
	);
};

export default CheckBox;
