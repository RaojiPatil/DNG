import React from 'react';
import SvgCartBlue from './Export_Svg_Search/SvgCartBlue';
import SvgSaveBlue from './Export_Svg_Search/SvgSaveBlue';
import SvgSaveWhite from './Export_Svg_Search/SvgSaveWhite';
import ReactTooltip from 'react-tooltip'
import { takeToGoDaddy, takeToWhois } from './Functions/Functions';

const SingleSearchDiv = ({ data, allCookies, saveCookie, deleteCookie, hideItem }) => {

	return (
		<>
			{data.availability === 'available' ||
			data.availability === 'unknown' ? (
				<div key={data.name} className="dng-search-single-data">
					<span className="dng-gen-domain ">{data.name}</span>

					<div className="dng-search-iconWrapper">
						<div className="dng-search-iconWrapper">
							<div
								className={
									allCookies.includes(data.name)
										? 'dng-search-result-svg-bookmark active-cookie'
										: 'dng-search-result-svg-bookmark'
								}
								onClick={
									allCookies.includes(data.name)
										? () => deleteCookie(data.name)
										: () =>
												saveCookie(
													data.name,
													data.availability
												)
								}
							>
								{allCookies.includes(data.name) ? (
									<spoan data-tip="Remove from shortlist"> 
										<SvgSaveWhite />
										<ReactTooltip  place='bottom' effect='solid'/>
									</spoan>
								) : (
									<span data-tip="Add to shortlist">
										<SvgSaveBlue />
										<ReactTooltip  place='bottom' effect='solid'/>
									</span>
									
								)}
							</div>
							<div className="dng-search-result-svg-cart" onClick={()=>takeToGoDaddy(data.name)}>
								<span data-tip="Add To cart">
									<SvgCartBlue />
									<ReactTooltip  place='bottom' effect='solid'/>
								</span>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="dng-search-single-data">
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
								onClick={
									allCookies.includes(data.name)
										? () => deleteCookie(data.name)
										: () =>
												saveCookie(
													data.name,
													data.availability
												)
								}
							>
								{allCookies.includes(data.name) ? (
									<spoan data-tip="Remove from shortlist"> 
										<SvgSaveWhite />
										<ReactTooltip  place='bottom' effect='solid'/>
									</spoan>
								) : (
									<span data-tip="Add to shortlist">
										<SvgSaveBlue />
										<ReactTooltip  place='bottom' effect='solid'/>
									</span>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SingleSearchDiv;
