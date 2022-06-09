import React from 'react';
import SingleWishList from './SingleWishList';

const Wishlist = ({ getCookie, setGetCookie, backToSearchResults, count }) => {
	if (count === 0 || count.length < 1) {
		backToSearchResults();
	}

	return (
		<>
			{getCookie.map((cookie) => (
				<SingleWishList
					key={cookie.name}
					cookie={cookie}
					setGetCookie={setGetCookie}
				/>
			))}
		</>
	);
};

export default Wishlist;
