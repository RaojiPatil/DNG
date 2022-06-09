import React from 'react';
import 'react-rangeslider/lib/index.css';

const Length = ({ searchData, dngSetMaxLength }) => {
	return (
		<div className="dng-max-length">
			<p>
				<b>Filter by Max Length</b>{' '}
				<span className="dng-length-count">
					{' '}
					{searchData.max_length}{' '}
				</span>
			</p>
			<input
				id="dng-range-control"
				type="range"
				min="2"
				max="63"
				defaultValue={searchData.max_length}
				onChange={(e) => dngSetMaxLength(e.target.value)}
			/>
		</div>
	);
};

export default Length;
