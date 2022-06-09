import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const RandomNames = ({ showSearchData, setGetRandomNames, orginalName }) => {
	const [items, setItems] = useState(showSearchData.slice(0, 30));
	const [hasMore, setHasMore] = useState(true);
	const [selectedNames, setSelectedNames] = useState(
		showSearchData.slice(0, 3)
	);

	const fetchMoreData = () => {
		if (items.length >= 128) {
			setHasMore(false);
			return;
		}
		setItems(
			items.concat(showSearchData.slice(items.length, items.length + 30))
		);
	};

	useEffect(() => {
		setItems(showSearchData.slice(0, 30));
		setHasMore(true);
		setSelectedNames(showSearchData.slice(0, 3));
		setGetRandomNames(selectedNames);
	}, [showSearchData]);

	useEffect(() => {
		setGetRandomNames(selectedNames);
	}, [selectedNames]);

	const setClassesAndStates = (data) => {
		if (selectedNames.length >= 3 && !selectedNames.includes(data)) {
			setSelectedNames(selectedNames.shift());
		}

		const newdata = selectedNames.slice();
		newdata.push(data);
		setSelectedNames(newdata);

		if (selectedNames.includes(data)) {
			setSelectedNames(selectedNames.filter((item) => item !== data));
		}
	};

	return (
		<div>
			{/* <div className="dng-suggestion-title">
				Other interesting names related to "{orginalName}". You can
				select upto 3 suggestions to check the domain name availibility.
			</div> */}
			<div className="dng-related-names">
				<InfiniteScroll
					dataLength={items.length}
					// next={fetchMoreData}
					hasMore={hasMore}
					loader={
						<div className="dbg-load-more">
							{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
							<a
								href="#"
								className="btn-load-more"
								onClick={(e) => {
									e.preventDefault();
									fetchMoreData();
								}}
							>
								{' '}
								View more{' '}
							</a>
						</div>
					}
					endMessage={
						<p style={{ textAlign: 'center' }}>
							<hr />
						</p>
					}
				>
					<div className="dng-random-name-wrapper">
						{items.map((data, index) => (
							// eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
							<span
								className={
									selectedNames.includes(data)
										? 'random-names random-names-active'
										: 'random-names'
								}
								key={index}
								onClick={() => setClassesAndStates(data)}
							>
								{data}
							</span>
						))}
					</div>
				</InfiniteScroll>
			</div>
		</div>
	);
};

export default RandomNames;
