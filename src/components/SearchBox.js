import React, { useState, useEffect, useRef } from 'react';
import { Popover, ArrowContainer } from 'react-tiny-popover'
import Wishlist from './Wishlist';

let timerId;
let Shortlistedcount;
const SearchBox = ({
	dngSetSearchItemName,
	placeholder,
	dngShowFilterDiv,
	count,
	dngShowWishlistDiv,
	dngSetRandomNameGenarator,

	getCookie,
	setGetCookie,
	backToSearchResults,
	prevSearchName,
	clearSearch
}) => {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false)
	// const [inputList, setInputList] = useState("");
	const [Shortlistedcount, setShortlistedcount] = useState("(0)");

	let newCount = 0;
	if (count === 0) {
		newCount = 0;
	} else {
		newCount = count.length;
	}

	// const debounceFunction = function (func, delay) {
	// 	clearTimeout(timerId);
	// 	timerId = setTimeout(func, delay);
	// };

	function debounceFunction(func, delay) {

        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(function() {

            func();

        }, delay);

    };

	const dngSetSearchAndRandomName = (e) => {
		e.persist();
		const event = e;
		debounceFunction(function () {
			dngSetSearchItemName(event);
			// console.log(event.target.value)
			dngSetRandomNameGenarator(event.target.value);
			// dngSetRandomNameGenarator
		},);
	};

	const popModalOpen = () => {
		setTimeout(() => {
			setIsPopoverOpen(true)
		}, 100);
	}
	const popModalClose = () => {
		setTimeout(() => {
			setIsPopoverOpen(false)
		}, 100);
	}

	// Check for click outside of modal and turn off auto close when unselecting wishlist
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef, setIsPopoverOpen);


	const clearSearchField = () =>{
		clearSearch()
		document.getElementById('inputname').value = '';
	}



	return (
		<div className="">
			<div className="">
				<div className="" >
					<div className="dng-filter-wrapper" class="flex align-middle">

                <label class="flex  bg-gray-50 border ml-20 w-8/12 min-w-fit h-16 border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600">
						<input
						class=" bg-gray-50  border-gray-300  w-11/12 h-16 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600"
							type="text"
							placeholder={placeholder}
							name="name"
							id="inputname"
							onChange={dngSetSearchAndRandomName}
							// defaultValue={prevSearchName}
							// value={inputList}
						
						/>
<div className="dng-filter-svg" class='inline-block ml-4 mt-2 p-1 pt-3' onClick={dngShowFilterDiv}>
				<svg width="18" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.834 3.33398H11.834" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.16797 2V4.66667" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.16732 3.33398H1.83398" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.50065 8H1.83398" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.16797 6.66602V9.33268" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.5013 8H7.16797" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.834 12.666H11.834" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.16797 11.334V14.0006" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.16732 12.666H1.83398" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
			
				</div>
				</label>


						<button class='inline-block ml-4 bg-#F2F5FF-500 border h-16 p-1'>Shortlisted {Shortlistedcount}</button>
						

						{/* {prevSearchName.length>=1 ? 
						<div className="dng-clear-search" onClick={clearSearchField}>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
								<path d="M20 4L4 20M20 20L4 4L20 20Z" stroke="#686781" stroke-width="2" stroke-linecap="round" />
							</svg>
						</div> 
						: 
						''} */}
						
						
						
					</div>
				</div>
				
				<div className="dng-btns" >
					<div className="dng-shortlist" onMouseEnter={newCount !== 0 ? () => popModalOpen() : ''}
					// 
					>
						
						<Popover
							isOpen={isPopoverOpen}
							positions={['bottom']}
							padding={10}
							// onClickOutside={() => setIsPopoverOpen(false)}
							content={({ position, childRect, popoverRect }) => (
								<ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
									position={position}
									childRect={childRect}
									popoverRect={popoverRect}
									arrowColor={'white'}
									arrowSize={15}
									// arrowStyle={{ opacity: 0.7 }}
									className='popover-arrow-container'
									arrowClassName='popover-arrow'
								>

									<div
										className="dng-shortlist-popover"
										ref={wrapperRef}
										onMouseLeave={popModalClose}
									>

										<Wishlist getCookie={getCookie}
											setGetCookie={setGetCookie}
											backToSearchResults={backToSearchResults}
											count={count}
										/>
									</div>

								</ArrowContainer>
							)}
						>
							{/* <button
								onClick={newCount !== 0 ? () => setIsPopoverOpen(!isPopoverOpen) : ''}
								className="btn btn-shortlist">
								Shortlisted ({newCount})
							</button> */}

<div className="dng-filter-shortlist">
{/* <svg width="14" height="14" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.33268 3.33398V1.33398H0.666016V12.6673L2.66602 11.6673" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.66602 14.6673V3.33398H11.3327V14.6673L6.99935 12.5763L2.66602 14.6673Z" stroke="white" stroke-width="1.33333" stroke-linejoin="round"/>
</svg> */}
				</div>
						</Popover>
					</div>



				</div>
			</div>
		</div>
	);
};

export default React.memo(SearchBox);

function useOutsideAlerter(ref, setIsPopoverOpen) {
	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				// alert("You clicked outside of me!");
				setIsPopoverOpen(false)
			}
		}

		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
}