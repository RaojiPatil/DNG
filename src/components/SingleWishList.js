import {useCallback} from 'react';
import Cookies from 'js-cookie';
import WishlistSingleDiv from './WishlistSingleDiv';

const SingleWishList = ({ cookie, setGetCookie }) => {
	let allCookies = Cookies.get('cookie-dng')
		? JSON.parse(Cookies.get('cookie-dng'))
		: '';
	if (allCookies) {
		allCookies = allCookies.map((item) => item.name);
	}

	const deleteCookie = () => {
		const cookieData = JSON.parse(Cookies.get('cookie-dng'));
		cookieData.splice(allCookies.indexOf(cookie.name), 1);
		setGetCookie(cookieData);
		Cookies.set('cookie-dng', JSON.stringify(cookieData));
	};

	return (
		<div className="dng-single-wishlist">
			<WishlistSingleDiv
				data={cookie}
				allCookies={allCookies}
				deleteCookie={deleteCookie}
			/>
		</div>
	);
};

export default SingleWishList;
