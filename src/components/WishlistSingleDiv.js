import React from 'react';
import SvgCartBlue from './Export_Svg_Search/SvgCartBlue';
import SvgSaveBlue from './Export_Svg_Search/SvgSaveBlue';
import SvgSaveWhite from './Export_Svg_Search/SvgSaveWhite';
import { takeToGoDaddy, takeToWhois } from './Functions/Functions';

const WishlistSingleDiv = ({ data, allCookies, deleteCookie }) => {
	{
		/* {data.availability} */
	}

	const deleteAndSetPopOver = () =>{
		deleteCookie()
	}
	return (
		<>
			{data.availability === 'available' ? (
				<div key={data.name} className="dng-shortlist-single-data">
					<span className="dng-gen-domain ">{data.name}</span>

					<div className="dng-search-iconWrapper">
						<div className="dng-search-iconWrapper">
							<div
								className={
									allCookies.includes(data.name)
										? 'dng-search-result-svg-bookmark active-cookie'
										: 'dng-search-result-svg-bookmark'
								}
								onClick={deleteAndSetPopOver}
							>
								{allCookies.includes(data.name) ? (
									<SvgSaveWhite />
								) : (
									<SvgSaveBlue />
								)}
							</div>
							<div className="dng-search-result-svg-cart" onClick={()=>takeToGoDaddy(data.name)}>
								<SvgCartBlue />
							</div>
						</div>
					</div>
				</div>
			) : (
				<div key={data.name} className="dng-shortlist-single-data">
					<span className="dng-gen-domain data-unavailable">
						{data.name}
					</span>

					<div className="dng-search-iconWrapper">
						<div className="dng-search-iconWrapper">
							<div className="dng-who-is">
								<button onClick={() => takeToWhois(data.name)}>
									WHOIS
								</button>
							</div>
							<div
								className={
									allCookies.includes(data.name)
										? 'dng-search-result-svg-bookmark active-cookie'
										: 'dng-search-result-svg-bookmark'
								}
								onClick={deleteAndSetPopOver}
							>
								{allCookies.includes(data.name) ? (
									<SvgSaveWhite />
								) : (
									<SvgSaveBlue />
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default WishlistSingleDiv;
