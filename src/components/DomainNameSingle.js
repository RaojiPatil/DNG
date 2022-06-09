import React from 'react'
import Cookies from 'js-cookie';
import ReactTooltip from 'react-tooltip';
import SvgSaveBlue from './Export_Svg_Search/SvgSaveBlue';
import SvgSaveWhite from './Export_Svg_Search/SvgSaveWhite';
import SvgCartBlue from './Export_Svg_Search/SvgCartBlue';
import { takeToGoDaddy, takeToWhois } from './Functions/Functions';

const DomainNameSingle = ({ data , setGetCookie}) => {

    let allCookies = Cookies.get('cookie-dng')
        ? JSON.parse(Cookies.get('cookie-dng'))
        : '';
    if (allCookies) {
        allCookies = allCookies.map((item) => item.name);
    }

    const saveCookie = (name, availability) => {
		const newObj = { name, availability };
		const getAllCookie = Cookies.get('cookie-dng')
			? JSON.parse(Cookies.get('cookie-dng'))
			: null;

		if (getAllCookie) {
			if (!getAllCookie.some((elem) => elem.name === name)) {
				getAllCookie.push(newObj);
				Cookies.set('cookie-dng', JSON.stringify(getAllCookie));
				setGetCookie(getAllCookie);
			}
		} else {
			const newArr = [];
			newArr.push(newObj);
			Cookies.set('cookie-dng', JSON.stringify(newArr));
			setGetCookie(newArr);
		}
	};

	const deleteCookie = (name) => {
		const prevCookie = Cookies.get('cookie-dng')
			? JSON.parse(Cookies.get('cookie-dng'))
			: null;
		const curentCookie = prevCookie.filter((item) => item.name !== name);
		Cookies.set('cookie-dng', JSON.stringify(curentCookie));
		setGetCookie(curentCookie);
	};

    return (
        <>
			{data.availability === 'available' ||
			data.availability === 'unknown' ? (
				<div key={data.name} className="dng-search-single-data">
					<span className="dng-gen-domain ">{data.name}</span>

					<div >
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
				<div key={data.name} className="dng-search-single-data">
					<span className="dng-gen-domain data-unavailable">
						{data.name}
					</span>

					<div>
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
    )
}

export default DomainNameSingle