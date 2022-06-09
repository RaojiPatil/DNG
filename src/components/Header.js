import React from 'react';

const Header = ({ headerText, pragraphText }) => {
	return (
		<div className="dng-header">
			<div className="dng-header-main">{headerText}</div>
			<div className="dng-header-sub">{pragraphText}</div>
		</div>
	);
};

export default Header;
